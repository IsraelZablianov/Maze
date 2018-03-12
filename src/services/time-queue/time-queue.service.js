import app from "../../app";
import { ServicesNames } from "../../constants/services-names";
var TimeQueueService = (function () {
    function TimeQueueService($timeout) {
        this.$timeout = $timeout;
        this.queue = [];
        this.index = 0;
        this.defaultDelay = 3000;
    }
    TimeQueueService.prototype.add = function (callback, delay) {
        this.queue.push({
            callback: callback,
            delay: delay || this.defaultDelay
        });
    };
    TimeQueueService.prototype.run = function () {
        this.next();
    };
    TimeQueueService.prototype.reset = function () {
        this.index = 0;
        this.queue = [];
    };
    TimeQueueService.prototype.next = function () {
        var _this = this;
        var currentTimeQueuedCallback = this.queue[this.index];
        var nextTimeQueuedCallback = this.queue[++this.index];
        if (currentTimeQueuedCallback) {
            currentTimeQueuedCallback.callback();
            nextTimeQueuedCallback && this.$timeout(function () {
                _this.next();
            }, nextTimeQueuedCallback.delay);
        }
        else {
            this.reset();
        }
    };
    TimeQueueService.$inject = ['$timeout'];
    return TimeQueueService;
}());
export { TimeQueueService };
app.service(ServicesNames.TIME_QUEUE, TimeQueueService);
//# sourceMappingURL=time-queue.service.js.map