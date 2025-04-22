import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (!target) return;

    // Determine the aspect ratio of the image
    const width = target.naturalWidth || target.width;
    const height = target.naturalHeight || target.height;

    if (width > height) {
      // Landscape
      target.src = 'assets/placeholders/landscape.webp';
    } else if (width < height) {
      // Portrait
      target.src = 'assets/placeholders/portrait.webp';
    } else {
      // Square
      target.src = 'assets/placeholders/square.webp';
    }
  }
}
