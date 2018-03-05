/* Javascript for masterpage */
"use strict";

function ManagePlanDetail() {
    var instance = ManageMasterpage.call(this);
    var eventBus = new EventBus();
    var EVENT_NAMES = {
    };
    
    var expandProgramSelector = '.expand-program';

    var programCollapse = new Collapse(expandProgramSelector, 300, true);
    var arrowHandler = function ($target, collapsed) {
        var $arrow = $target.closest(expandProgramSelector).find('i');
        Utils.rotateArrow($arrow, collapsed);
    };
    programCollapse.onBeforeToggle(function (e, collapsed) {
        var $target = $(e.target);
        arrowHandler($target, collapsed);
    });

    return instance;
}
