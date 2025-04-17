import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ShareQRModelComponent } from '../share-qr-model/share-qr-model.component';
import { AiAudioModelComponent } from '../ai-audio-model/ai-audio-model.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DestinationService } from '../../../services/destination.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { shareQRCode, downloadQRCode } from '../../../utils/utils';

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
    this.shareUrl = isPlatformBrowser(this.platformId)
      ? window.location.origin
      : '';
  }

  isMenuOpen = false;

  showModal = false;

  showAudioModal = false;

  activeSection: string = 'points-of-interest';
  navbarHeight = 70;


  scrollTo(id: string) {
    if (!this.isBrowser()) return;

    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - this.navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      this.activeSection = id;
    }
  }

  shareQR(): void {
    const url = `${this.shareUrl}/destination/${this.destination.name.toLowerCase()}`;
    shareQRCode(
      url,
      `Explore ${this.destination.name}`,
      `Check out ${this.destination.name} in Sikkim!`
    );
  }

  downloadQR(): void {
    downloadQRCode(this.destination.name);
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

}
