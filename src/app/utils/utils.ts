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
    gangtok: ['from-gangtok-500', 'to-gangtok-400'],
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

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/--+/g, '-'); // Replace multiple dashes with a single dash
}
