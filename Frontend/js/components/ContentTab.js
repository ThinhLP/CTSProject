"use strict";

function ContentTab(contentTabSelector, activeClass, hasConfirmDialog) {

    var active = !activeClass ? 'active' : activeClass;
    var targetAttr = 'target';
    var contentTabClass = contentTabSelector.substring(1);

    var inactiveTabClass = contentTabClass + '-inactive-tab';
    var inactiveTabSelector = '.' + inactiveTabClass;

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
    
    var onSwitchTab = function (targetSelector) {
        if (targetSelector === null)
            return;
        var $trigger = $(targetSelector);
        if (!$trigger.hasClass(contentTabClass)) {
            $trigger = $trigger.closest(contentTabSelector);
        }
        var targetContentSelector = $trigger.attr(targetAttr);
        hideAllContentOfSiblings($trigger);
        $trigger.addClass(active);
        $trigger.removeClass(inactiveTabClass);
        $(targetContentSelector).show();

        eventBus.dispatch(EVENT_NAMES.ON_CHANGE_TAB, targetSelector);
    };


    var onclickTab = function (pos) {
        var $tabTarget = $(contentTabSelector).eq(pos);
        $tabTarget.trigger('click');
    };

    var init = function () {
        $('body').on('click', contentTabSelector, function (e) {
            target = e.target;
            if (!hasConfirmDialog) {
                switchTab();
            }
        });
        $(contentTabSelector).each(function () {
            if ($(this).hasClass('active')) {
                $(this).trigger('click');
            }
        });
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
        initInactiveTab: initInactiveTab,
        onSwitchTab: onSwitchTab
    };

    return instance;
}
