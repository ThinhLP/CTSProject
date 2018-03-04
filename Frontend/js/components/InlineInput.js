"use strict";

function InlineInput(configs) {

    var confirmDialogSelector = configs.confirmDialogSelector;
    var startEditBtnSelector = configs.startEditBtnSelector;
    var defaultEditorSelector = '.edit-heading';
    var tooltipSelector = configs.tooltipSelector;
    var placeholder = configs.placeholder;

    var currentEditorSelector;

    var editConfirmDialog;

    var oldValue = "";

    var eventBus = new EventBus();
    var EVENT_NAMES = {
        CHANGE: 'change',
        ON_VALIDATE: 'validate',
    };

    var onChange = function (eventHandler) {
        eventBus.on(EVENT_NAMES.CHANGE, eventHandler);
    };

    var onValidate = function (eventHandler) {
        eventBus.on(EVENT_NAMES.ON_VALIDATE, eventHandler);
    };

    $.fn.selectText = function () {
        var doc = document;
        var element = this[0];
        if (doc.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    var changeEditableMode = function (isEdit, $target) {
        if (isEdit) {
            $target.attr('contenteditable', 'true');
            $target.css({
                'cursor': 'text'
            });
            $target.focus();
        } else {
            $target.attr('contenteditable', 'false');
            $target.css({
                'cursor': 'pointer'
            });
        }
    };

    var initPopupConfirm = function () {
        editConfirmDialog = new ConfirmDialog({
            modalSelector: confirmDialogSelector,
            closeButtonSelector: '.close-modal-button'
        });

        editConfirmDialog.onClickYes(function (e) {
            var value = $(currentEditorSelector).first().text();
            eventBus.dispatch(EVENT_NAMES.CHANGE, e, value, $(currentEditorSelector).first());
        });

        editConfirmDialog.onClickNo(function (e) {
            $(currentEditorSelector).first().text(oldValue);
        });
    };

    var openEditMode = function ($editor) {
        if ($editor.attr('contenteditable') === 'true') {
            return;
        }
        changeEditableMode(true, $editor);
        $editor.selectText();
    };

    var addEventHandlers = function () {
        $(document).on('click', startEditBtnSelector, function (e) {
            var $target = $(e.target);
            if (!$target.hasClass(startEditBtnSelector)) {
                $target = $target.closest(startEditBtnSelector);
            }
            currentEditorSelector = $target.attr('target');
            if (!currentEditorSelector) {
                currentEditorSelector = startEditBtnSelector;
            }

            openEditMode($(currentEditorSelector).first());
            oldValue = $(currentEditorSelector).first().text().trim();
            addEventFocusOutHandlers(currentEditorSelector);
            //addEventHandlerForPlaceHolder(currentEditorSelector);

        });

    };

    var addEventFocusOutHandlers = function (selector) {
        $(document).on('focusout', selector, function (e) {
            var contenteditable = $(this).attr('contenteditable');
            if (contenteditable == 'false') {
                return;
            }
            var value = $(this).text().trim();
            if (!value || value.length === 0) {
                if (tooltipSelector) {
                    showTooltip();
                }
                $(this).focus();
                return;
            }

            if (oldValue !== value) {
                var result = eventBus.dispatch(EVENT_NAMES.ON_VALIDATE, value, $(currentEditorSelector).first());
                if (result == undefined || result[0] == true) {
                    if (editConfirmDialog) {
                        editConfirmDialog.show();
                    } else {
                        eventBus.dispatch(EVENT_NAMES.CHANGE, e, value, $(this));
                    }
                    changeEditableMode(false, $(this));
                } else {
                    if (tooltipSelector) {
                        showTooltip();
                    }
                    $(this).focus();
                }
            } else {
                changeEditableMode(false, $(this));
            }
        });

        var hideTooltip = function() {
            if ($(tooltipSelector).hasClass('tooltip')) {
                Utils.hideTooltip(tooltipSelector);
            } else {
                $(tooltipSelector).hide();
            }
        };
        var showTooltip = function() {
            if ($(tooltipSelector).hasClass('tooltip')) {
                Utils.showTooltip(tooltipSelector);
            } else {
                $(tooltipSelector).show();
            }
        };

        $(document).on('keypress', selector, function (e) {
            var contenteditable = $(this).attr('contenteditable');
            if (contenteditable == 'false') {
                return;
            }
            if (e.keyCode == 13) {
                e.preventDefault();
                var value = $(this).text().trim();
                if (!value || value.length === 0) {
                    $(this).focusin();
                    return;
                }
                if (oldValue !== value) {
                    var result = eventBus.dispatch(EVENT_NAMES.ON_VALIDATE, value, $(currentEditorSelector).first());
                    if (result == undefined || result[0] == true) {
                        if (editConfirmDialog) {
                            editConfirmDialog.show();
                        } else {
                            eventBus.dispatch(EVENT_NAMES.CHANGE, e, value, $(this));
                        }
                        changeEditableMode(false, $(this));
                    }
                } else {
                    changeEditableMode(false, $(this));
                }
            }
            else if (tooltipSelector) {
                hideTooltip();
            }
        });
    };

    var init = function () {
        if (confirmDialogSelector) {
            initPopupConfirm();
        }
        addEventHandlers();
    };

    init();

    var instance = {
        onChange: onChange,
        onValidate: onValidate,
        on: eventBus.on,
        EVENT_NAMES: EVENT_NAMES
    };

    return instance;
}
