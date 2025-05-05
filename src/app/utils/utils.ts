declare var $: any; // Declare jQuery

export function initializeOwlCarousel(
  carouselClass: string,
  Iloop: boolean = true,
  Iautoplay: boolean = true,
  Imargin: number = 5,
  Inavigation: boolean = true,
  Iresponsive: number[] = [1, 3, 4],
  dots: boolean = true
): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    // Return false if running in a non-browser environment
    return false;
  }

  if ($(carouselClass).hasClass('owl-loaded')) return false; // Prevent re-initialization

  const carouselElement = $(carouselClass);
  if (carouselElement.length === 0) {
    return false;
  }

  // Initialize Owl Carousel
  carouselElement.owlCarousel({
    loop: Iloop, // Loop the carousel
    margin: Imargin, // Margin between items
    nav: Inavigation, // Add next and prev button
    dots: dots, // Add dots for items
    autoplay: Iautoplay, // Enable auto-move
    autoplayTimeout: 3000, // Time between auto-moves (in milliseconds)
    autoplayHoverPause: true, // Pause on hover
    responsive: {
      0: {
        items: Iresponsive[0],
      },
      600: {
        items: Iresponsive[1],
      },
      1000: {
        items: Iresponsive[2],
      },
    },
  });

  return true;
}

export function destroyOwlInstance(carouselClass: string): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    // Return false if running in a non-browser environment
    return false;
  }

  // Destroy Owl Carousel instance
  $(carouselClass).trigger('destroy.owl.carousel');
  return true;
}

// QR Code Utilities
export function shareQRCode(
  url: string,
  title: string,
  description: string
): void {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: description,
        url: url,
      })
      .catch(console.error);
  } else {
    // Fallback for browsers that don't support Web Share API
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }
}

export function downloadQRCode(
  name: string,
  selector: string = 'qrcode canvas'
): void {
  const qrCanvas = document.querySelector(selector) as HTMLCanvasElement;
  if (qrCanvas) {
    const link = document.createElement('a');
    link.download = `${name.toLowerCase()}-qr.png`;
    link.href = qrCanvas.toDataURL('image/png');
    link.click();
  } else {
    console.error('QR Canvas not found');
  }
}

export function getGradientClasses(district: string): string[] {
  const lowerDistrict = district.toLowerCase();
  const classes: { [key: string]: string[] } = {
    gangtok: ['from-gangtok-500', 'to-gangtok-300'],
    mangan: ['from-mangan-500', 'to-mangan-300'],
    geyzing: ['from-geyzing-500', 'to-geyzing-300'],
    gyalshing: ['from-geyzing-500', 'to-geyzing-300'],
    gayzing: ['from-geyzing-500', 'to-geyzing-300'],
    pakyong: ['from-pakyong-500', 'to-pakyong-300'],
    soreng: ['from-soreng-500', 'to-soreng-300'],
    namchi: ['from-namchi-500', 'to-namchi-300'],
  };
  return classes[lowerDistrict] || [];
}



// utils/image-preloader
type Callback = () => void;
type ErrorCallback = (failedUrls: string[]) => void;

export function preloadImages(
  urls: string[],
  onComplete: Callback = () => {},
  onError: ErrorCallback = () => {}
): void {
  let loaded = 0;
  const total = urls.length;
  const failed: string[] = [];

  if (total === 0) {
    onComplete();
    return;
  }

  urls.forEach((url) => {
    const img = new Image();
    img.onload = () => {
      loaded++;
      if (loaded === total) {
        failed.length ? onError(failed) : onComplete();
      }
    };
    img.onerror = () => {
      failed.push(url);
      loaded++;
      if (loaded === total) {
        onError(failed);
      }
    };
    img.src = url;
  });
}


