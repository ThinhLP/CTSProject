"use strict";

function HoverTooltip(collapseBtnSelector) {
    var instance = {};

    var targetAttr = 'target';

    var init = function () {
        $(document).on('mouseenter', collapseBtnSelector, function () {
            var targetSelector = $(this).attr(targetAttr);
            $(targetSelector).show();
            $(targetSelector).mousemove(function () {
                $(targetSelector).show();
            });
            $(targetSelector).mouseleave(function () {
                $(targetSelector).hide();
            });
        });
        $(document).on('mouseleave', collapseBtnSelector, function (e) {
            var targetSelector = $(this).attr(targetAttr);
            $(targetSelector).hide();
        });
    };

    init();

    return instance;
};
