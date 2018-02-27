"use strict";
var Utils = {
    isMouseClickOutside: function (event, $target) {
        return !$target.is(event.target) &&
            $target.has(event.target).length === 0;
    },
    rotateArrow: function ($arrow, collapsed) {
        var iconChevronDown = 'fa-chevron-down';
        var iconChevronUp = 'fa-chevron-up';
        var rotateActive = 'rotate-active';
        var rotateActiveReverse = 'rotate-reverse';
        if (collapsed && !$arrow.hasClass(rotateActive) && $arrow.hasClass(iconChevronUp)) {
            $arrow.addClass(rotateActiveReverse);
        } else if (collapsed && !$arrow.hasClass(rotateActive) && $arrow.hasClass(iconChevronDown)) {
            $arrow.addClass(rotateActive);
        } else if (collapsed && $arrow.hasClass(rotateActive) && $arrow.hasClass(iconChevronDown)) {
            $arrow.removeClass(rotateActive);
        } else if (!collapsed && $arrow.hasClass(iconChevronDown)) {
            $arrow.addClass(rotateActive);
        } else {
            $arrow.removeClass(rotateActiveReverse);
        }
    },
    callJsonAjax: function (url, method, data, onSuccess, onFail) {
        $.ajax({
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: method,
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (data) {
                if (onSuccess) {
                    onSuccess(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (onFail) {
                    onFail(jqXHR, textStatus, errorThrown);
                }
            }
        });
    },
    showSnackbar: function (message, duration) {
        var $snackbar = $("#snackbar");

        if (!duration) {
            duration = 2500;
        }

        $snackbar.text(message);
        $snackbar.addClass('show');

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () {
            $snackbar.removeClass('show');
        }, duration);
    }

};
