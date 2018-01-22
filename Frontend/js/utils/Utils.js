"use strict";
var Utils = {
    isMouseClickOutside: function (event, $target) {
        return !$target.is(event.target) &&
            $target.has(event.target).length === 0;
    },
    
};