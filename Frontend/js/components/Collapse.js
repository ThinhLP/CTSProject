"use strict";
function Collapse(collapseBtnSelector, collapsingTime, toggleAnimation, onClickListener) {

    if (!collapsingTime) {
        collapsingTime = 300;
    }

    var collapseAttr = 'collapsed';
    var targetAttr = 'target';

    var onClickHandler = !!onClickListener ? onClickListener : function(e, collapsed) {};
    var onClick = function (eventHandler) {
        onClickHandler = eventHandler;
    };

    var onBeforeToggleHandler;
    var onBeforeToggle = function(eventHandler) {
        onBeforeToggleHandler = eventHandler;
    };

    // Trigger event after collapsing
    var _collapsedCallback = function(e) {};
    var collapsedCallback = function(eventHandler) {
        _collapsedCallback = eventHandler;
    };

    var collapsingCheckers = [];

    var getCurrentCollapseTargetSelector = function() {
        return $(collapseBtnSelector).attr(targetAttr);
    };

    var getCurrentStatus = function () {
        return $(collapseBtnSelector).attr(collapseAttr);
    };

    var doCollapsing = function(e, collapsed, collapseTargetSelector) {
        if (toggleAnimation) {
            if (e && onBeforeToggleHandler) {
                onBeforeToggleHandler.call(this, e, collapsed);
            }
            $(collapseTargetSelector).slideToggle(collapsingTime, function () {
                    collapsingCheckers[collapseTargetSelector] = false;
                    if (e) {
                        onClickHandler.call(this, e, collapsed);
                    }
            });
            return;
        }

        if (collapsed) {
            $(collapseTargetSelector).hide();
        } else {
            $(collapseTargetSelector).show();
        }

        collapsingCheckers[collapseTargetSelector] = false;
        if (e) {
            onClickHandler.call(this, e, collapsed);
        }
    };

    var collapse = function() {
        doCollapsing(null, true, $(getCurrentCollapseTargetSelector()));
        $(collapseBtnSelector).attr(collapseAttr, 'true');
        _collapsedCallback();
    };

    var expand = function() {
        doCollapsing(null, false, $(getCurrentCollapseTargetSelector()));
        $(collapseBtnSelector).attr(collapseAttr, 'false');
    };

    var _condition = function($trigger) {
        return true;
    };

    var setCondition = function(condition) {
        _condition = condition;
    }

    $(document).on('click', collapseBtnSelector, function (e) {
        var $target = $(e.target);
        if (!$target.attr(collapseAttr)) {
            $target = $target.parents(collapseBtnSelector);
        }
        if (!_condition($target)) {
            return;
        }
        var isCollapsed = $target.attr(collapseAttr);
        var collapseTargetSelector = $target.attr(targetAttr);
        var collapsed = true;

        if (!collapsingCheckers[collapseTargetSelector]) {
            collapsingCheckers[collapseTargetSelector] = true;
        } else {
            return;
        }

        if (isCollapsed === 'true') {
            collapsed = false;
        }
        $target.attr(collapseAttr, collapsed);
        doCollapsing(e, collapsed, collapseTargetSelector);


    });



    return {
        ATTRIBUTES: {
            target: targetAttr,
            collapse: collapseAttr
        },
        onClick: onClick,
        collapse: collapse,
        expand: expand,
        getCurrentStatus: getCurrentStatus,
        getCurrentCollapseTargetSelector: getCurrentCollapseTargetSelector,
        setCondition: setCondition,
        collapsedCallback: collapsedCallback,
        onBeforeToggle: onBeforeToggle
    };
}

Collapse.prototype.constructor = Collapse;