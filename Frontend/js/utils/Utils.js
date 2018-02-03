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

};
