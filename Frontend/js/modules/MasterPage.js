/* Javascript for masterpage */
"use strict";

function MasterPage() {
    var instance = {};

    var userAvatarTooltip = new PopupTooltip('.right-panel-user-avatar', 0);

    var compactNavItemHoverTooltip = new HoverTooltip('.compact-nav-items i');

    var MIN_DESKTOP_WIDTH = 1200;

    var handleNavItemsResize = function () {
        var windowWidth = $(window).width();
        if (windowWidth <= MIN_DESKTOP_WIDTH) {
            $('.nav-items').addClass('compact-nav-items');
        } else {
            $('.nav-items').removeClass('compact-nav-items');
        }
        console.log(windowWidth);
    };

    var onDocumentReadyEvents = function () {
        handleNavItemsResize();
    };

    var onWindowResizeEvents = function () {
        handleNavItemsResize();
    };

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
