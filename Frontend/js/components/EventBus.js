"use strict";

function EventBus() {
    var eventList = [];


    var on = function (eventName, eventHandler) {
        if (!eventList[eventName]) {
            eventList[eventName] = [];
        }
        eventList[eventName].push(eventHandler);
    };

    var dispatch = function () {
        var eventName = arguments[0];
        var results = [];
        if (!eventList[eventName]) {
            return;
        }
        var args = [];
        for (var i = 1, j = 0; i < arguments.length; i++, j++) {
            args[j] = arguments[i]
        }
        var self = this;
        eventList[eventName].forEach(function (item) {
            results.push(item.apply(self, args));
        });
        return results;
    };

    var off = function (eventName, eventHandler) {
        if (!eventList[eventName]) {
            return;
        }

        if (!eventHandler) {
            eventList[eventName] = undefined;
            return;
        }

        var newArr = [];

        eventList[eventName].forEach(function (item) {
            if (item === eventHandler) {

            } else {
                newArr.push(item);
            }
        });
        eventList[eventName] = newArr;
    };

    var instance = {
        on: on,
        off: off,
        dispatch: dispatch
    };

    return instance;
}
