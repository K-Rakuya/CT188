class SliderTrack{
    constructor(trackSelector, products_list){
        this.track = document.querySelector(trackSelector);
        this.products_list = products_list;
        this.width_of_slider = this.track.offsetWidth;
        this.width_of_card = this.products_list[0].offsetWidth;
        this.currentIndex =  0;
        this.maxIndex = this.products_list.length - 1;
    }
}