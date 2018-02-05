function PlanOverviewPage() {
    var instance = MasterPage.call(this);

    var programTitleSelector = '.program-title';

    var programCollapse = new Collapse(programTitleSelector, 300, true);
    var arrowHandler = function ($target, collapsed) {
        var $arrow = $target.closest(programTitleSelector).find('i');
        Utils.rotateArrow($arrow, collapsed);
    };
    programCollapse.onBeforeToggle(function (e, collapsed) {
        var $target = $(e.target);
        arrowHandler($target, collapsed);
    });

    var onDocumentReadyEvents = function () {};

    var onWindowResizeEvents = function () {};

    var addEventHandlers = function () {
        // document ready
        onDocumentReadyEvents();
        // Window resize
        $(window).resize(function () {
            onWindowResizeEvents();
        });
    };

    addEventHandlers();

    return instance;
}
