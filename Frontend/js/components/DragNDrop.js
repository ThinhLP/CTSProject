"use strict";

function DragNDrop(configs) {

    var containerSelector = configs.containerSelector;
    var handleSelector = configs.handleSelector;
    var cancelSelectors = configs.cancelSelectors;
    var connectSelector = !configs.connectSelector ? '' : configs.connectSelector;
    var containment = !configs.containment ? 'window' : configs.containment;

    var eventBus = new EventBus();
    var EVENT_NAMES = {
        ON_SUCCESS: 'onSuccess',
        ON_SORT: 'onSort',
        ON_SORT_START: 'onSortStart'
    };

    var onSuccess = function (eventHandler) {
        eventBus.on(EVENT_NAMES.ON_SUCCESS, eventHandler);
    };
    var onSort = function (eventHandler) {
        eventBus.on(EVENT_NAMES.ON_SORT, eventHandler);
    };
    var onSortStart = function(eventHandler) {
        eventBus.on(EVENT_NAMES.ON_SORT_START, eventHandler);
    };

    $(containerSelector).sortable({
        handle: handleSelector,
        cancel: cancelSelectors,
        connectWith: connectSelector,
        containment: containment,
    });

    var _addEventHandlers = function () {
        $(containerSelector).on('sortstop', function (e, ui) {
            eventBus.dispatch(EVENT_NAMES.ON_SUCCESS, e, ui);
        });
        $(containerSelector).on('sort', function (e, ui) {
            eventBus.dispatch(EVENT_NAMES.ON_SORT, e, ui);
        });
        $(containerSelector).on('sortstart', function (e, ui) {
            eventBus.dispatch(EVENT_NAMES.ON_SORT_START, e, ui);
        });
    };


    var reset = function () {
        $(containerSelector).sortable({
            handle: handleSelector,
            cancel: cancelSelectors,
            connectWith: connectSelector,
            containment: containment
        });
        _addEventHandlers();
    };

    var refresh = function () {
        $(containerSelector).sortable("refresh");
    };


    _addEventHandlers();

    var instance = {
        onSuccess: onSuccess,
        onSort: onSort,
        refresh: refresh,
        reset: reset,
        onSortStart: onSortStart
    };

    return instance;

}
