"use strict";

function ManageLecture() {
    var instance = ManageMasterpage.call(this);


    var minuteSelector = '.min-time-input';
    var secondSelector = '.sec-time-input';
    var minuteMin = 0;
    var minuteMax = 100;
    var secondMin = 0
    var secondMax = 59;

    var isPressNumber = function (key) {
        return (key >= 48 && key <= 57) || (key >= 96 && key <= 105);
    };

    var minute, second;

    var setMinute = function (num) {
        if (num == 0) {
            return '0';
        } else {
            return num;
        }
    };


    var setSecond = function (num) {
        if (num == 0) {
            return '00';
        } else if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    };

    $(document).on('keypress', '.min-score', function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (!(key == 8 || key == 9 || key == 13 || key == 46 || (key >= 35 && key <= 40) ||
                isPressNumber(key))) {
            return false;
        }

        if (isPressNumber(key)) {
            var valueStr = $(this).val() + '' + String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key);
            if (valueStr.length > 3) {
                return false;
            }
            var value = parseInt(valueStr);
            if (value < 0) {
                $(this).val(0);
                return false;
            }
            if (value > 10) {
                $(this).val(10);
                return false;
            }
        }


    });

    $(document).on('input', minuteSelector, function (e) {
        var min = $(this).val();
        var num = parseInt(min) ? parseInt(min) : 0;
        if (num >= minuteMin && num <= minuteMax) {
            minute = setMinute(num);
        }
        $(this).val(minute);

        //change second accordingly
        var sec = $(this).siblings(secondSelector);
        if (!sec.val()) {
            sec.val('00');
        }
    });

    $(document).on('input', secondSelector, function (e) {
        var sec = $(this).val();
        var num = parseInt(sec) ? parseInt(sec) : 0;
        if (num >= secondMin && num <= secondMax) {
            second = setSecond(num);
        }
        $(this).val(second);

        //change minute
        var min = $(this).siblings(minuteSelector);
        if (!min.val()) {
            min.val('0');
        }
    });

    $(document).on('keydown', minuteSelector, function (e) {
        var key = e.charCode || e.keyCode || 0;

        if (!(key == 8 || key == 9 || key == 13 || key == 46 || (key >= 35 && key <= 40) ||
                isPressNumber(key))) {
            return false;
        }

        if (key == 13) {
            $(this).blur();
            return;
        }
    });

    $(document).on('keydown', secondSelector, function (e) {
        var key = e.charCode || e.keyCode || 0;

        if (!(key == 8 || key == 9 || key == 13 || key == 46 || (key >= 35 && key <= 40) ||
                isPressNumber(key))) {
            return false;
        }

        if (key == 13) {
            $(this).blur();
            return;
        }
    });

    return instance;
}
