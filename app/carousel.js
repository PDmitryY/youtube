export default class Carousel {
    constructor () {
        this.slides = document.querySelectorAll(".slide-item");
        this.currentSlide = 0;
        this.nextButton = document.querySelector(".button-next");
        this.prevButton = document.querySelector(".button-prev");
        this.nextButton.addEventListener("click", this.nextSlide.bind(this));
        this.prevButton.addEventListener("click", this.previousSlide.bind(this));
        this.nextPaging = document.querySelector(".paging-next");
        this.prevPaging = document.querySelector(".paging-prev");
        this.nextPaging.addEventListener("click", this.nextSlide.bind(this));
        this.prevPaging.addEventListener("click", this.previousSlide.bind(this));
    }

    nextSlide(){
        this.goToSlide(this.currentSlide+1);
    }

    previousSlide(){
        if(this.currentSlide > 0){
            this.goToSlide(this.currentSlide-1);
        }
    }

    goToSlide(n){
        this.slides[this.currentSlide].className = 'slide-item';
        this.currentSlide = (n+this.slides.length)%this.slides.length;
        this.slides[this.currentSlide].className = 'slide-item active';
    }

};

