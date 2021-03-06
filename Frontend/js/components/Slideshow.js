"use strict";

function Slideshow(configs) {
    var slideShowContainerSlt = configs.slideShowContainer;
    var slideSelector = slideShowContainerSlt + ' ' + configs.slideSelector;
    var nextSlideBtn = slideShowContainerSlt + ' ' + configs.nextSlideBtn;
    var prevSlideBtn = slideShowContainerSlt + ' ' + configs.prevSlideBtn;
    var slideProgressSlt = slideShowContainerSlt + ' ' + configs.slideProgress
    var currentSlideSlt = '.current-slide';
    var totalSlideSlt = '.total-slides';
    var totalSlides = 0;
    var clickToNextSlide = configs.clickToNextSlide == undefined ? true : configs.clickToNextSlide;
    
    var slideIndex = !configs.startSlide ? 1 : configs.startSlide;
    
    var changeSlide = function(n) {
        showSlide(slideIndex += n);
    };
    
    var eventBus = new EventBus();
    var onChangeSlide = function(eventHandler) {
        eventBus.on('onChangeSlide', eventHandler);
    };
    
    var getTotalSlides = function() {
        return totalSlides;
    };
    
    var showSlide = function(index) {
        var $slides = $(slideSelector);
        if (index > $slides.length) {
            slideIndex = 1
        }
        if (index < 1) {
            slideIndex = $slides.length
        }
        
        $slides.hide();
        $slides.eq(slideIndex - 1).show();
        setSlideProgress(slideIndex, totalSlides);
        eventBus.dispatch('onChangeSlide', slideIndex);
        
    };
    
    var setSlideProgress = function(currentSlide) {
        $(slideProgressSlt + ' ' + currentSlideSlt).text(currentSlide);
        $(slideProgressSlt + ' ' + totalSlideSlt).text(totalSlides);
    };
    
    var initSlideshow = function() {
        totalSlides = $(slideSelector).length;
        setSlideProgress(slideIndex, totalSlides);
        showSlide(slideIndex);
        
        addEventHandlers();
    };
    
    var addEventHandlers = function() {
        $(nextSlideBtn).on('click', function() {
            changeSlide(1);
        });
        
        $(prevSlideBtn).on('click', function() {
            changeSlide(-1);
        });
        
        if (clickToNextSlide) {
             $('body').on('click', slideSelector, function() {
                changeSlide(1);
            });
        }
       
    };
        
    return {
        initSlideshow: initSlideshow,
        onChangeSlide: onChangeSlide,
        getTotalSlides: getTotalSlides
    };
}
