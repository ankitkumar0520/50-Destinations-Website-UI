import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  LANDSCAPE = 'assets/placeholders/landscape.webp';
  PORTRAIT = 'assets/placeholders/portrait.webp';
  SQUARE = 'assets/placeholders/square.webp';

  constructor() {}

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (!target) return;

    // Determine the aspect ratio of the image
    const width = target.naturalWidth || target.width;
    const height = target.naturalHeight || target.height;

    if (width > height) {
      // Landscape
      target.src = this.LANDSCAPE;
    } else if (width < height) {
      // Portrait
      target.src = this.PORTRAIT;
    } else {
      // Square
      target.src = this.SQUARE;
    }
  }

}
