function Timer(delay, repeatCount){
  this.constructor.apply(this,arguments);
}
Timer.TIMER = 'timer';
Timer.TIMER_COMPLETE = 'timerComplete';
Timer.prototype = new EventTarget();

Timer.prototype.constructor = function(delay, repeatCount){
    delay = Number(delay);
    if (isNaN(delay)) {
      throw new Error('Timer constructor requires delay as Number.');
    }
    repeatCount = Number(repeatCount);
    repeatCount = (isNaN(repeatCount)) ? 0 : repeatCount;

    this._delay = delay;
    this._repeatCount = repeatCount;
    this.reset();
};

Timer.prototype.reset = function () {
    this.stop();
    this._currentCount = 0;
};

Timer.prototype.start = function () {
    var isEndless = (this._repeatCount === 0);
    var isComplete = (this._currentCount >= this._repeatCount);
    if (!this._running && (isEndless || !isComplete)) {
      if (this._intervalId) {
        clearInterval(this._intervalId);
      }
      this._running = true;
      this._intervalId = setInterval(this._onInterval, this._delay, this);
    }
};

Timer.prototype.stop = function () {
    this._running = false;
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
};

Timer.prototype._onInterval = function (that) {
    var isEndless = (that._repeatCount === 0);
    var isComplete = (++that._currentCount >= that._repeatCount);
    that.fire(Timer.TIMER);
    if (!isEndless && isComplete) {
      that.stop();
      that.fire(Timer.TIMER_COMPLETE);
    }
};
Timer.prototype.currentCount = function () {
        return this._currentCount;
};

Timer.prototype.repeatCount = function () {
        return this._repeatCount;
};
