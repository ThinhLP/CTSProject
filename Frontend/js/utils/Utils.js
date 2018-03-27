"use strict";
var Utils = {
    isMouseClickOutside: function (event, $target) {
        return !$target.is(event.target) &&
            $target.has(event.target).length === 0;
    },
    rotateArrow: function ($arrow, collapsed) {
        var iconChevronDown = 'fa-angle-down';
        var iconChevronUp = 'fa-angle-up';
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
        if (method == "GET") {
            $.ajax({
                url: url,
                type: 'GET',
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
        } else {
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
        }

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
    },
    notify: function (title, message) {
        $('#notify-modal .modal-title').text(title);
        $('#notify-modal .modal-body').text(message);
        $('#notify-modal').modal('show');
    },
    convertDateStringToTimeStamp: function (date) {
        if (!date || date.length == 0) {
            return 0;
        }
        // from format dd/mm/yyyy
        date = date.split("/");
        var newDate = date[1] + "/" + date[0] + "/" + date[2];
        return new Date(newDate).getTime();
    },
    convertTimestampToSimpleDate: function (timestamp) {
        if (!timestamp || timestamp == null) {
            return '';
        }
        var date = new Date(timestamp);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
    },
    convertTimestampToFullDate: function (timestamp) {
        if (!timestamp || timestamp == null) {
            return '';
        }
        var date = new Date(timestamp);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        
        return hour+':'+ min + ':' + sec + ' ' + day + '/' + month + '/' + year;
    },
    updateOrder: function (selector, numberSelector) {
        $(selector).each(function (index) {
            console.log(index);
            $(this).find(numberSelector).html(index + 1);
        });
    },
    isElementHidden: function ($target) {
        return $target.css('display') === 'none';
    },

    isElementShown: function ($target) {
        return $target.css('display') === 'block';
    },
    b64DecodeUnicode: function (str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    },
    convertSeconds: function(duration) {
        var min = Math.floor(duration / 60);
        var sec = duration - min * 60;
        return {
            mins: min,
            secs: sec
        };
    },
    scrollWindow: function (pos, callback) {
        $('html, body').animate({
            scrollTop: pos
        }, 400, function () {
            if (callback) {
                callback();
            }
        });
    },
};
