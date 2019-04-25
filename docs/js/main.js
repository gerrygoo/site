import {
    updateQTable,
    addScore,
    updateTimes,
    startTimes,
    updateSlowMotion,
    updateLearningRate,
    updateDiscount,
    updateLastDeath,
} from "./renderHtml.js";
import { Timer } from "./timer.js";

const game_width = 400;
const game_height = 490;

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

let game = new Phaser.Game(game_width, game_height, Phaser.AUTO, "gameDiv");

let learning_rate = 0.3;
let discount = 0.5;
let qa = {};
let qb = {};
let first = true;
let scaling_factor = 10;

let epsilon = 0.1;
let actions = [0, 1];

// #region bitmap
const tableCanvas = document.getElementById("tableCanvas"),
    ctx = tableCanvas.getContext("2d"),
    bitmap_width = 400,
    bitmap_height = 500,
    scaled_bitmap_width = Math.round(bitmap_width / scaling_factor),
    scaled_bitmap_height = Math.round(bitmap_height / scaling_factor);

tableCanvas.setAttribute("width", bitmap_width);
tableCanvas.setAttribute("height", bitmap_height);

const bitmap_imagedata = Uint8ClampedArray.from(
    new Array(bitmap_width * bitmap_height * 4).fill(0),
);
for (let i = 0; i < bitmap_imagedata.length; i++) {
    if ((i + 1) % 4 == 0) bitmap_imagedata[i] = 255;
}

const q_forbitmap = new Array(scaled_bitmap_height).fill();
for (let i = 0; i < scaled_bitmap_height; i++) {
    q_forbitmap[i] = new Array(scaled_bitmap_width).fill();
    for (let j = 0; j < scaled_bitmap_width; j++) {
        q_forbitmap[i][j] = new Array(2).fill(0);
    }
}

function updateBitmap(x, y, action, entry_value) {
    const scaled_y = Math.floor(y / 2);

    const scaled_x = x;

    q_forbitmap[scaled_y][scaled_x][action] = entry_value;
}

function coords_to_line(x, y) {
    return y * bitmap_width * 4 + x * 4;
}

function set_pixel(x, y, r, g, b, a) {
    const pix_idx = coords_to_line(x, y);
    bitmap_imagedata[pix_idx] = r;
    bitmap_imagedata[pix_idx + 1] = g;
    bitmap_imagedata[pix_idx + 2] = b;
    bitmap_imagedata[pix_idx + 3] = a;
}

function set_region(x, y, r, g, b, a) {
    for (let i = 0; i < scaling_factor; i++) {
        for (let j = 0; j < scaling_factor; j++) {
            set_pixel(x + i, y + j, r, g, b, a);
        }
    }
}

function renderBitmap() {
    for (let i = 0; i < scaled_bitmap_height; i++) {
        for (let j = 0; j < scaled_bitmap_width; j++) {
            const fall = q_forbitmap[i][j][0];
            const jump = q_forbitmap[i][j][1];
            if (jump == 0 && fall == 0) {
                continue;
            }
            set_region(
                j * scaling_factor,
                i * scaling_factor,
                fall > jump ? 255 : 0,
                jump > fall ? 255 : 0,
                fall == jump ? 255 : 0,
                255,
            );
        }
    }
    ctx.putImageData(
        new ImageData(bitmap_imagedata, bitmap_width, bitmap_height),
        0,
        0,
    );
}

// #endregion

startTimes();

let mainState = {
    preload: function() {
        if (!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.setMinMax(
                game.width / 2,
                game.height / 2,
                game.width,
                game.height,
            );
        }

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = "#71c5cf";

        game.load.image("bird", "assets/bird.png");
        game.load.image("pipe", "assets/pipe.png");
    },

    create: function() {
        Timer.clear();

        updateLearningRate(learning_rate);
        updateDiscount(discount);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.disableVisibilityChange = true;
        // change speed
        game.forceSingleUpdate = true;
        if (first) {
            game.time.slowMotion = 0.5;
            updateSlowMotion(game.time.slowMotion);
            game.time.desiredFps = 60 * game.time.slowMotion;
            first = false;
        }
        Timer.timeScale = game.time.slowMotion;

        this.pipes = game.add.group();
        this.pipes_timer = Timer.add(90, this.addRowOfPipes, this);

        this.bird = game.add.sprite(100, 250, "bird");
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5);

        let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        game.input.onDown.add(this.jump, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {
            font: "30px Arial",
            fill: "#ffffff",
        });

        game.input.keyboard.addKey(Phaser.KeyCode.P).onDown.add(function() {
            game.paused = !game.paused;
        });

        //q learning stuff

        // change speed at runtime (ruins the timers)
        game.input.keyboard
            .addKey(Phaser.KeyCode.OPEN_BRACKET)
            .onDown.add(function() {
                game.time.slowMotion *= 2;
                updateSlowMotion(game.time.slowMotion);
                game.time.desiredFps = 60 * game.time.slowMotion;
                Timer.timeScale = game.time.slowMotion;
            });

        game.input.keyboard
            .addKey(Phaser.KeyCode.CLOSED_BRACKET)
            .onDown.add(function() {
                game.time.slowMotion /= 2;
                updateSlowMotion(game.time.slowMotion);
                game.time.desiredFps = 60 * game.time.slowMotion;
                Timer.timeScale = game.time.slowMotion;
            });
        this.game_pipes = [];
        this.move_timer = Timer.add(12, this.getMove, this);

        this.addRowOfPipes();
    },

    update: function() {
        if (this.bird.y < 0 || this.bird.y > game.world.height) {
            this.endGame();
            return;
        }

        game.physics.arcade.overlap(
            this.bird,
            this.pipes,
            this.hitPipe,
            null,
            this,
        );
    },

    render: function() {
        if (!game.paused) {
            Timer.update();
            updateTimes(game.time.physicsElapsedMS);
        }
    },

    jump: function() {
        this.bird.body.velocity.y = -350;
    },

    hitPipe: function() {
        this.endGame();
    },

    addOnePipe: function(x, y) {
        let pipe = game.add.sprite(x, y, "pipe");
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);

        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;

        return pipe;
    },

    addRowOfPipes: function() {
        let hole = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < 8; i++) {
            if (i != hole && i != hole + 1) {
                let pipe = this.addOnePipe(400, i * 60 + 10);
                if (i == hole + 2) {
                    this.game_pipes.push(pipe);
                }
            }
        }

        this.score += 1;
        this.labelScore.text = this.score;
    },

    getMove: function() {
        // calculate real distances
        let [xDist, yDist] = this.getDxDy();

        let reward = xDist < 0 ? 1 : 0;
        if (xDist < 0) {
            // get new pipe
            this.game_pipes.shift();
            [xDist, yDist] = this.getDxDy();
        }
        let state = `${xDist}|${yDist}`;

        // update table
        this.updateTable(state, reward);
        let keys = actions.map(a => `${state}|${a}`);
        updateQTable(xDist, yDist, qa[keys[0]], qa[keys[1]]);

        let action = 0,
            value = -100000;
        for (let a of actions) {
            let key = `${state}|${a}`;
            if (qa[key] === undefined) {
                qa[key] = 0;
            }
            if (qb[key] === undefined) {
                qb[key] = 0;
            }

            if (qa[key] + qb[key] > value) {
                value = qa[key] + qb[key];
                action = a;
            }
        }

        //epsilon greedy choosing
        action =
            Math.random() > epsilon
                ? action
                : actions[Math.floor(Math.random() * actions.length)];

        this.lastAction = action;
        this.lastState = state;

        if (action) {
            this.jump();
        }
    },

    updateTable: function(state, reward) {
        if (this.lastAction === undefined || this.lastState === undefined) {
            return;
        }
        let key = `${this.lastState}|${this.lastAction}`;

        let valueA = -100000;
        let valueB = -100000;
        for (let a of actions) {
            let k = `${state}|${a}`;
            if (qa[k] === undefined) {
                qa[k] = 0;
            }
            if (qb[k] === undefined) {
                qb[k] = 0;
            }

            if (qa[k] > valueA) {
                valueA = qa[k];
            }
            if (qb[k] > valueB) {
                valueB = qb[k];
            }
        }

        qa[key] =
            (1 - learning_rate) * qa[key] +
            learning_rate * (reward + discount * valueB);
        qb[key] =
            (1 - learning_rate) * qb[key] +
            learning_rate * (reward + discount * valueA);

        // bitmap
        const [dx, dy] = this.lastState.split("|").map(x => parseInt(x));

        const zero_based_deltax = scaled_bitmap_width - (dx + 1),
            zero_based_deltay = -dy + scaled_bitmap_height;

        updateBitmap(
            zero_based_deltax,
            zero_based_deltay,
            this.lastAction,
            qa[key] + qb[key],
        );
        renderBitmap();
    },

    getDxDy: function() {
        if (this.game_pipes.length == 0) {
            return [Infinity, Infinity];
        }
        return [
            Math.round(
                (this.game_pipes[0].body.right - this.bird.body.left) /
                    scaling_factor,
            ),
            Math.round(
                (this.game_pipes[0].body.top - this.bird.body.center.y) /
                    scaling_factor,
            ),
        ];
    },

    endGame: function() {
        Timer.clear();
        addScore(this.score);
        let [dx, dy] = this.getDxDy();
        let state = `${dx}|${dy}`;
        this.updateTable(state, -100);
        updateLastDeath();
        game.state.start("main");
    },
};

game.state.add("main", mainState);
game.state.start("main");
