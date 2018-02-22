"use strict";

function ContentTab(contentTabSelector, activeClass, confirmDlgInfo) {

    var active = !activeClass ? 'active' : activeClass;
    var targetAttr = 'target';
    var contentTabClass = contentTabSelector.substring(1);

    var inactiveTabClass = contentTabClass + '-inactive-tab';
    var inactiveTabSelector = '.' + inactiveTabClass;

    var changeTabConfirmDialog = null;


    var eventBus = new EventBus();
    var EVENT_NAMES = {
        ON_CHANGE_TAB: 'onChangeTab'
    };

    var onChangeTab = function (eventHandler) {
        eventBus.on(EVENT_NAMES.ON_CHANGE_TAB, eventHandler);
    };

    var hideAllContentOfSiblings = function ($currentTab) {
        $currentTab.siblings(contentTabSelector).each(function () {
            var targetSelector = $(this).attr(targetAttr);
            $(this).removeClass(active);
            $(this).addClass(inactiveTabClass);
            $(targetSelector).hide();
        });
    };

    var target = null;

    var switchTab = function () {
        if (target === null)
            return;
        var $trigger = $(target);
        if (!$trigger.hasClass(contentTabClass)) {
            $trigger = $trigger.closest(contentTabSelector);
        }
        var targetContentSelector = $trigger.attr(targetAttr);
        hideAllContentOfSiblings($trigger);
        $trigger.addClass(active);
        $trigger.removeClass(inactiveTabClass);
        $(targetContentSelector).show();

        eventBus.dispatch(EVENT_NAMES.ON_CHANGE_TAB, target);
    };

    var onclickTab = function (pos) {
        var $tabTarget = $(contentTabSelector).eq(pos);
        //        $tabTarget.on('click', function() {
        //            target = e.target;
        //            if (!changeTabConfirmDialog || changeTabConfirmDialog == null) {
        //                switchTab();
        //            }
        //        });
        $tabTarget.trigger('click');
    };

    var init = function () {
        $('body').on('click', contentTabSelector, function (e) {
            target = e.target;
            if (changeTabConfirmDialog === null || changeTabConfirmDialog === undefined) {
                switchTab();
            }
        });
        $(contentTabSelector).each(function () {
            if ($(this).hasClass('active')) {
                $(this).trigger('click');
            }
        });

        if (confirmDlgInfo !== null && confirmDlgInfo !== undefined) {
            // $(contentTabSelector).each(function (index) {
            //     if (!$(this).hasClass('active')) {
            //         $(this).addClass(inactiveTabClass);
            //     }
            // });
            initInactiveTab();

            changeTabConfirmDialog = new ConfirmDialog({
                openButtonSelector: inactiveTabSelector,
                modalSelector: confirmDlgInfo.modalSelector,
                closeButtonSelector: confirmDlgInfo.closeButtonSelector
            });
            changeTabConfirmDialog.onClickYes(function () {
                switchTab();
            });
        }
    };

    var initInactiveTab = function () {
        $(contentTabSelector).each(function (index) {
            if (!$(this).hasClass('active')) {
                $(this).removeClass(inactiveTabClass);
                $(this).addClass(inactiveTabClass);
            }
        });
    };

    init();

    var instance = {
        onChangeTab: onChangeTab,
        onclickTab: onclickTab,
        initInactiveTab: initInactiveTab
    };

    return instance;
}
