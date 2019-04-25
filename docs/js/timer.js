export class Timer {
    static timers = [];
    static lastId = 0;
    static timeScale = 1;
    static add(frames, callback, context) {
        Timer.timers.push({
            id: ++Timer.lastId,
            current: 0,
            frames,
            callback,
            context,
        });
        return Timer.lastId;
    }
    static async update() {
        for (let timer of Timer.timers) {
            timer.current += 1 / Timer.timeScale;
            if (timer.current >= timer.frames) {
                timer.current -= timer.frames;
                timer.callback.call(timer.context);
            }
        }
    }
    static remove(id) {
        Timer.timers = Timer.timers.filter(timer => timer.id != id);
    }
    static clear() {
        Timer.timers = [];
    }
}
