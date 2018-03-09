/* Javascript for masterpage */
"use strict";

function ManageCourse() {
    var instance = ManageMasterpage.call(this);
    var eventBus = new EventBus();
    var EVENT_NAMES = {
        UPDATE_SECTION_TITLE: 'updateSectionTitle',
        ON_SUCCESS_DND_SECTION: 'onSuccessDragNDropSection',
        ON_SUCCESS_DND_LECTURE: 'onSuccessDragNDropLecture'
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
    sectionCollapse.onClick(function() {
        lectureDragNDrop.refresh();
    });

    // Section title processor
    var sectionTitleInput = new InlineInput({
        startEditBtnSelector: '.edit-section-title',
    });

    instance.onUpdateSectionTitle = function (eventHandler) {
        sectionTitleInput.on(sectionTitleInput.EVENT_NAMES.CHANGE, eventHandler);
    };

    // Section, lecture order processor
    instance.onSuccessDragNDropSection = function (eventHandler) {
        eventBus.on(EVENT_NAMES.ON_SUCCESS_DND_SECTION, eventHandler);
    };
    instance.onSuccessDragNDropLecture = function (eventHandler) {
        eventBus.on(EVENT_NAMES.ON_SUCCESS_DND_LECTURE, eventHandler);
    };

//    var showZeroLesson = function ($target) {
//        var noOfLectures = countNoOfLecturesInSection($target);
//        var $zeroLession = $target.find(zeroLessonSelector);
//        if (noOfLectures === 0) {
//            $zeroLession.show();
//        } else {
//            $zeroLession.hide();
//        }
//    };

    var containmentSelector = '.right-panel';

    var sectionDragNDrop = new DragNDrop({
        containerSelector: '#section-list',
        handleSelector: '.move-section',
        containment: containmentSelector,
    });
    sectionDragNDrop.onSuccess(function (e, ui) {
        eventBus.dispatch(EVENT_NAMES.ON_SUCCESS_DND_SECTION, e, ui);
    });
    
    var lectureDragNDrop = new DragNDrop({
        containerSelector: '.lecture-list-wrapper',
        handleSelector: '.move-lecture',
        connectSelector: '.lecture-list-wrapper',
        containment: containmentSelector,
    });

    lectureDragNDrop.onSuccess(function (e, ui) {
        eventBus.dispatch(EVENT_NAMES.ON_SUCCESS_DND_LECTURE, e, ui);
        e.stopPropagation();
    });

    lectureDragNDrop.onSort(function (e, ui) {
        var itemPosTop = ui.offset.top;
        var itemPosLeft = ui.offset.left;

        $('.curriculum-item').each(function () {
            var sectionOffset = $(this).offset();
            var $sectionHeading = $(this).find('.curriculum-heading');
            var sectionHeaderHeight = $sectionHeading.outerHeight();
            var sectionHeaderWidth = $sectionHeading.outerWidth();
            var $sectionBody = $(this).find('.lecture-list-wrapper');
            if (Utils.isElementHidden($sectionBody)) {
                if (itemPosTop >= sectionOffset.top && itemPosTop <= sectionOffset.top + sectionHeaderHeight &&
                    itemPosLeft >= sectionOffset.left - 10 && itemPosLeft <= sectionOffset.left + sectionHeaderWidth) {
                    $sectionHeading.find('.expand-section').first().trigger('click');
                    lectureDragNDrop.refresh();
                }
            }
        });
    });

    instance.resetSection = function () {
        sectionDragNDrop.reset();
    };

    instance.resetLecture = function () {
        lectureDragNDrop.reset();
    };

    var zeroLessonSelector = '.empty-lecture';
    var countNoOfLecturesInSection = function ($section) {
        return $section.find('.lecture-item').length;
    };

    return instance;
}
