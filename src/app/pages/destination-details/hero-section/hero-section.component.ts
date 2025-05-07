import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DestinationService } from '../../../services/destination.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { shareQRCode, downloadQRCode, slugify } from '../../../utils/utils';
import { VoiceModelService } from '../../../services/voice-model.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    QRCodeComponent,
  ],
})
export class HeroSectionComponent implements OnInit {
  private destinationService = inject(DestinationService);
  
  private voiceModeService = inject(VoiceModelService);
  destination:any;

  shareUrl: string;
  isMenuOpen = false;
  activeSection: string = 'points-of-interest';
  navbarHeight = 70;
  isImageLoaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.shareUrl = isPlatformBrowser(this.platformId)
      ? window.location.origin
      : '';
  }
  
  ngOnInit(): void {

    this.destinationService.destination$.subscribe(dest => {
      if (dest) {
        this.destination = dest;
      }
    });

  }

  onImageLoad() {
    this.isImageLoaded = true;
  }

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
    const url = `${this.shareUrl}/destination/${slugify(this.destination.slug)}`;
    shareQRCode(
      url,
      `Explore ${this.destination.name}`,
      `Check out ${this.destination.name} in Sikkim!`
    );
  }

  downloadQR(): void {
    downloadQRCode(this.destination.slug);
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  showModelVoiceModel(){
    this.voiceModeService.showModel();
  }
}
