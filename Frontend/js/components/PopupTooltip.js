"use strict";
function PopupTooltip(collapseBtnSelector, collapsingTime, toggleAnimation, onClickListener) {
    var instance = Collapse.call(this, collapseBtnSelector, collapsingTime, toggleAnimation, onClickListener);

    var handleWhenUseClickOutside = function(e) {
        var $target = $(instance.getCurrentCollapseTargetSelector());
        if (Utils.isMouseClickOutside(e, $target) && instance.getCurrentStatus() === 'false') {
            instance.collapse();
        }
    };

    $(document).mouseup(function(e) {
        if ($(e.target).is(collapseBtnSelector) || !!$(e.target).parents().is(collapseBtnSelector)) {
            return;
        }

        handleWhenUseClickOutside(e);
    });

    return instance;
}
