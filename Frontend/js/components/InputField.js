"use strict";
function InputField(inputSelector, tooltipMessage) {
    var instance = {};
    
    var tooltipSelector = '.' + inputSelector.substr(1) + '-tooltip';
    
    var notifyError = function() {
        $(tooltipSelector).show();
        $(inputSelector).addClass('has-error');
    };
    
    var createErrorTooltip = function() {
        if (!tooltipMessage) {
            tooltipMessage = 'Không được để trống';
        }
        
        var tooltipElement = '<div class="alert-tooltip '+ tooltipSelector.substr(1) +'">\
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>\
                    <span>' + tooltipMessage + '</span>\
                </div>';  
        $(inputSelector).after(tooltipElement);
    };
    
    var hideError = function() {
        $(tooltipSelector).hide();
        $(inputSelector).removeClass('has-error');
    };
    
    var addEventHandlers = function() {
        createErrorTooltip();
        
        $(inputSelector).on('keypress', function() {
            hideError();
        });
        
        $(inputSelector).on('focusin', function() {
            hideError();
        });
    };
    
    addEventHandlers();
    
    instance.notify = notifyError;
    instance.hideError = hideError; 
    instance.tooltipSelector = tooltipSelector;
    instance.value = function() {
        return $(inputSelector).val();
    }
    
    return instance;
}