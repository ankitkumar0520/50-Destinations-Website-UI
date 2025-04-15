import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ShareQRModelComponent } from '../share-qr-model/share-qr-model.component';
import { AiAudioModelComponent } from '../ai-audio-model/ai-audio-model.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DestinationService } from '../../../services/destination.service';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports: [
    CommonModule,
    ShareQRModelComponent,
    AiAudioModelComponent,
    FontAwesomeModule,
    QRCodeComponent
  ],
})
export class HeroSectionComponent {

  private destinationService = inject(DestinationService);
  destination = this.destinationService.getDestionation();
  shareUrl: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.shareUrl = isPlatformBrowser(this.platformId)
      ? window.location.origin
      : '';
  }

  isMenuOpen = false;

  showModal = false;

  showAudioModal = false;

  activeSection: string = 'points-of-interest';
  isBrowser: boolean;
  navbarHeight = 70;


  scrollTo(id: string) {
    if (!this.isBrowser) return;

    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - this.navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      this.activeSection = id;
    }
  }

  shareQR(): void {
    const url = `${this.shareUrl}/destination/${this.destination.name.toLowerCase()}`;

    if (navigator.share) {
      navigator
        .share({
          title: `Explore ${this.destination.name}`,
          text: `Check out ${this.destination.name} in Sikkim!`,
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

  downloadQR(): void {
    // First try with ViewChild reference
    const qrCanvas = document.querySelector('qrcode canvas') as HTMLCanvasElement;
    if (qrCanvas) {
      const link = document.createElement('a');
      link.download = `${this.destination.name.toLowerCase()}-qr.png`;
      link.href = qrCanvas.toDataURL('image/png');
      link.click();
    } else {
      console.error('QR Canvas not found');
    }
  }
}
