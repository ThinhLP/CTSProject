"use strict"
function PagingButton(configs) {
    if (!configs) {
        configs = {};
    }
    
    var defaultConfigs = {
        pagingButtonGroupsSelector: '.paging-groups',
        buttonSelector: '.page-item',
        groupSelector: '.pagination',
        activeClass: 'active',
        prevPageBtnSelector: '.prev-page-btn',
        nextPageBtnSelector: '.next-page-btn'
    };
    
    if (!configs.activeClass) {
        configs.activeClass = defaultConfigs.activeClass;
    }
    
    var buttonSelector = !configs.buttonSelector ? defaultConfigs.buttonSelector : configs.buttonSelector;
    var groupSelector = !configs.groupSelector ? defaultConfigs.groupSelector : configs.groupSelector;
    var pagingButtonGroupsSelector = !configs.pagingButtonGroupsSelector ? defaultConfigs.pagingButtonGroupsSelector : configs.pagingButtonGroupsSelector;
    var nextPageBtnSelector = !configs.nextPageBtnSelector ? defaultConfigs.nextPageBtnSelector : configs.nextPageBtnSelector;
    var prevPageBtnSelector = !configs.prevPageBtnSelector ? defaultConfigs.prevPageBtnSelector : configs.prevPageBtnSelector;
    
    
    var _onclickHandler = function(pageNo, status) {};
    var onclick = function(eventHandler) {
        _onclickHandler = eventHandler;
    };
    
    var dectiveAllButtons = function($parent) {
        $parent.find(buttonSelector).removeClass(configs.activeClass);
    };
    
    var pagingGroupSelector = pagingButtonGroupsSelector + ' ' + groupSelector;
    
    var showPagingButtonHandler = function(status) {
        $(pagingGroupSelector).hide();
        if (!status) {
            $(pagingGroupSelector + ':first-child').show();
        } else {
            $(pagingGroupSelector + '[status=' + status + ']').show();
        }
    };
    
    var showPagingButtonAndTriggerPage = function(pageNo, status) {
        $(pagingGroupSelector).hide();
        var $currentPagination;
        if (!status) {
            $currentPagination = $(pagingGroupSelector + ':first-child');
        } else {
            $currentPagination = $(pagingGroupSelector + '[status=' + status + ']');
        }
        $currentPagination.show();
        $currentPagination.find(buttonSelector).removeClass(configs.activeClass);
        pageNo = parseInt(pageNo);
        $currentPagination.find(buttonSelector).eq(pageNo - 1).trigger('click');
    };
    
    var _activeChangePageButton = function($button) {
        $button.removeClass('disabled');
    };
    var _deactiveChangePageButton = function($button) {
        $button.removeClass('disabled');
        $button.addClass('disabled');
    };
    
    var init = function() {
        $('body').on('click', groupSelector + ' ' + buttonSelector, function() {
            var $parent = $(this).closest(groupSelector);
            var status = $parent.attr('status');
            var pageNo = $(this).text();

            if (isNaN(pageNo) || $(this).hasClass(configs.activeClass) 
                || (!!status && isNaN(status) && status.toLowerCase() !== 'true' && status.toLowerCase() !== 'false')) {
                return false;
            }
            var $nextPageBtn = $parent.find(nextPageBtnSelector);
            var $prevPageBtn = $parent.find(prevPageBtnSelector);
            var numOfPages = $parent.find(buttonSelector).length;
            
            if (numOfPages == parseInt(pageNo)) {
                _deactiveChangePageButton($nextPageBtn);
                _activeChangePageButton($prevPageBtn);
            } else if (pageNo == 1) {
                _deactiveChangePageButton($prevPageBtn);
                _activeChangePageButton($nextPageBtn);
            } else {
                _activeChangePageButton($prevPageBtn);
                _activeChangePageButton($nextPageBtn);
            }
            
            dectiveAllButtons($parent);
            
            $(this).addClass(configs.activeClass);
            
            _onclickHandler(pageNo, status);
            return false;
        });
        
        $('body').on('click', groupSelector + ' ' + nextPageBtnSelector, function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            console.log(1);
            var $parent = $(this).closest(groupSelector);
            var $activeButton = $parent.find(buttonSelector + '.' + configs.activeClass);
            var pageNo = $activeButton.text();
            if (isNaN(pageNo)) {
                return false;
            }
            console.log('2: ' + pageNo);
            
            var numOfPages = $parent.find(buttonSelector).length;
            var currentPage = parseInt(pageNo);
            if (currentPage >= numOfPages) {
                return false;
            }
            console.log('3: ' + currentPage);
            
            var $targetButton = $parent.find(buttonSelector).eq(currentPage);
            $targetButton.trigger('click');
            return false;
        });
        
        $('body').on('click', groupSelector + ' ' + prevPageBtnSelector, function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var $parent = $(this).closest(groupSelector);
            var $activeButton = $parent.find(buttonSelector + '.' + configs.activeClass);
            var pageNo = $activeButton.text();
            if (isNaN(pageNo)) {
                return false;
            }
            var currentPage = parseInt(pageNo);
            if (currentPage <= 1) {
                return false;
            }
            var $targetButton = $parent.find(buttonSelector).eq(currentPage - 2);
            $targetButton.trigger('click');
            return false;
        });
    };
    
    init();
    
    var instance = {
        onclick: onclick,
        showPagingButtonHandler: showPagingButtonHandler,
        pagingGroupSelector: pagingGroupSelector,
        showPagingButtonAndTriggerPage: showPagingButtonAndTriggerPage,
    };
    
    return instance;
}