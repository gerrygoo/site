let usedEntries = {};
let entriesValues = {};

export const updateQTable = (dx, dy, rewardNoJump, rewardJump) => {

    if(!rewardJump || !rewardNoJump){
        return;
    }
    const key = `${dx}|${dy}`;
    if (!usedEntries[key]) {
        usedEntries[key] = 0;
    }
    usedEntries[key]++;

    entriesValues[key] = [rewardJump, rewardNoJump];

    let arr = [];
    for (const k in usedEntries) {
        arr.push({ key: k, usage: usedEntries[k] });
    }
    arr.sort((a, b) => b.usage - a.usage);
    arr = arr.splice(0, 10);

    const table = document.getElementById("q-table");
    table.innerHTML = `<tr>
        <th>Estados (dx/dy)</th>
        <th>Accion Saltar</th>
        <th>Accion No Saltar</th>
    </tr>`;
    for (const item of arr) {
        const row = document.createElement("tr");
        row.id = item.key;
        let rewJump = entriesValues[item.key][0];
        let rewNoJump = entriesValues[item.key][0];
        row.innerHTML = `<td>${item.key}</td>
                            <td>${rewJump.toFixed(2)}</td>
                            <td>${rewNoJump.toFixed(2)}</td>`;
        table.appendChild(row);
    }

    // let row = document.getElementById(key);
    // if (!row) {
    //     row = document.createElement("tr");
    //     row.innerHTML = `<td>${dx} | ${dy}</td>
    //                     <td>${rewardJump}</td>
    //                     <td>${rewardNoJump}</td>`;
    //     row.id = key;
    //     document.getElementById("q-table").appendChild(row);
    // }
    // row.innerHTML = `<td>${dx} | ${dy}</td>
    //                 <td>${rewardJump}</td>
    //                 <td>${rewardNoJump}</td>`;
};

let scores = [];
let maxScore = 0;
export const addScore = score => {
    scores.push(score);
    if (scores.length > 10) {
        scores.splice(0, 1);
    }

    const total = scores.reduce((res, score) => res + score);
    maxScore = Math.max(maxScore, score);
    const mean = total / scores.length;

    document.getElementById("max-value").innerHTML = `Maximo: ${maxScore}`;
    document.getElementById("mean-value").innerHTML = `Promedio: ${mean}`;
};

let start_date_millis = 0;
let physics_millis = 0;

export const startTimes = () => {
    start_date_millis = Date.now();
    physics_millis = 0;
};

export const updateTimes = delta_millis => {
    physics_millis += delta_millis;
    const current_date_millis = Date.now();
    document.getElementById("physics-time").innerHTML = `Physics time: ${(
        physics_millis / 1000
    ).toFixed(2)}`;
    document.getElementById("real-time").innerHTML = `Real time: ${(
        (current_date_millis - start_date_millis) /
        1000
    ).toFixed(2)}`;
};

export const updateSlowMotion = value => {
    document.getElementById(
        "slow-motion",
    ).innerHTML = `Velocidad fisica: ${value}`;
};
export const updateLearningRate = value => {
    document.getElementById(
        "learning-rate",
    ).innerHTML = `Learning rate: ${value}`;
};
export const updateDiscount = value => {
    document.getElementById("discount").innerHTML = `Discount: ${value}`;
};

export const updateLastDeath = () => {
    document.getElementById("last-death").innerHTML = `Last Death: ${(
        physics_millis / 1000
    ).toFixed(2)}`;
};

// document.addEventListener('load', () => start_date_millis = new Date().getMilliseconds())
