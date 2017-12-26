///<reference path="../../../_references.d.ts"/>

interface ITimeQueueService {
    add(callback: Function, delay: number): void;
    run(): void;
}

interface ITimeQueuedCallback {
    callback: Function;
    delay: number;
}

class TimeQueueService implements ITimeQueueService {
    public static $inject: string[] = ['$timeout'];

    queue :ITimeQueuedCallback[] = [];
    index = 0;
    defaultDelay = 3000;

    constructor(private $timeout: ng.ITimeoutService) {

    }

    add(callback: Function, delay: number): void {
        this.queue.push({
            callback: callback,
            delay: delay || this.defaultDelay
        });
    }

    run(): void {
        this.next();
    }

    private reset(): void {
        this.index = 0;
        this.queue = [];
    }

    private next(): void {
        const currentTimeQueuedCallback: ITimeQueuedCallback = this.queue[this.index];
        var nextTimeQueuedCallback: ITimeQueuedCallback = this.queue[++this.index];
        if(currentTimeQueuedCallback) {
            currentTimeQueuedCallback.callback();
            nextTimeQueuedCallback && this.$timeout(() => {
                this.next();
            }, nextTimeQueuedCallback.delay);
        }
        else {
            this.reset();
        }
    }
}

app.service(ServicesNames.TIME_QUEUE, TimeQueueService);
