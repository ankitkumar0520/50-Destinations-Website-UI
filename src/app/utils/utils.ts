
declare var $: any; // Declare jQuery


  export function initializeOwlCarousel(carouselClass:string,Iloop:boolean=true,Iautoplay:boolean=true,
    Imargin:number=5,Inavigation:boolean=true,Iresponsive:number[]=[1,3,4],dots:boolean=true
  ): Boolean {
    if (typeof document !== 'undefined') {
      const carouselElement = $(carouselClass);
      if (carouselElement.length === 0) {
        return false;
      }
      // Initialize Owl Carousel
        carouselElement.owlCarousel({
        loop:Iloop, //loop the carousel
        margin:Imargin,  //margin between item 
        nav:Inavigation,  //add next and prev button
        dots:dots,  //add dots for items
        autoplay: Iautoplay, // Enable auto-move
        autoplayTimeout: 3000, // Time between auto-moves (in milliseconds)
        autoplayHoverPause: true ,// Pause on hover

        responsive:{
            0:{
                items:Iresponsive[0]
            },
            600:{
                items:Iresponsive[1]
            },
            1000:{
                items:Iresponsive[2]
            }
        }
    });
  }
  return true;
}

export function destroyOwlInstance(carouselClass:string):boolean{
  if (typeof document !== 'undefined') {
    // Destroy Owl Carousel instance
    $(carouselClass).trigger('destroy.owl.carousel');
    return true;
  }
  return false;
}



