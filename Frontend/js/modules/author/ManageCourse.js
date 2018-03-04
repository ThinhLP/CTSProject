/* Javascript for masterpage */
"use strict";

function ManageCourse() {
    var instance = ManageMasterpage.call(this);
    var eventBus = new EventBus();
    var EVENT_NAMES = {
        UPDATE_SECTION_TITLE: 'updateSectionTitle',
    };
    
    var expandSectionSelector = '.expand-section';

    var sectionCollapse = new Collapse(expandSectionSelector, 300, true);
    var arrowHandler = function ($target, collapsed) {
        var $arrow = $target.closest(expandSectionSelector).find('i');
        Utils.rotateArrow($arrow, collapsed);
    };
    sectionCollapse.onBeforeToggle(function (e, collapsed) {
        var $target = $(e.target);
        arrowHandler($target, collapsed);
    });

    // Section title processor
    var sectionTitleInput = new InlineInput({
        startEditBtnSelector: '.edit-section-title',
    });

    instance.onUpdateSectionTitle = function (eventHandler) {
        sectionTitleInput.on(sectionTitleInput.EVENT_NAMES.CHANGE, eventHandler);
    };

    return instance;
}
