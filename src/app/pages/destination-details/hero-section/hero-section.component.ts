import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DestinationService } from '../../../services/destination.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { shareQRCode, downloadQRCode } from '../../../utils/utils';
import { VoiceModelService } from '../../../services/voice-model.service';
import { ImageService } from '../../../services/image.service';
@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports: [CommonModule, FontAwesomeModule, QRCodeComponent],
})
export class HeroSectionComponent implements OnInit {
  private destinationService = inject(DestinationService);
  imageService = inject(ImageService);

  private voiceModeService = inject(VoiceModelService);
  destination: any;
  baseUrl = '';
  shareUrl: string;
  isMenuOpen = false;
  activeSection: string = 'points-of-interest';
  navbarHeight = 70;
  isImageLoaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadingDetails = true;
    this.destination = [];
    this.shareUrl = isPlatformBrowser(this.platformId)
      ? window.location.origin
      : '';
  }

  loadingDetails = true;
  ngOnInit(): void {
    // Subscribe to destination
    this.destinationService.destination$.subscribe((dest) => {
      if (dest) {
        this.destination = dest;
      }
    });

    // Subscribe to loading state
    this.destinationService.loading$.subscribe((loading) => {
      this.loadingDetails = loading;
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
    const url = `${this.shareUrl}/destination/${this.destination.slug}`;
    shareQRCode(
      url,
      `Explore ${this.destination.destinationname}`,
      `Check out ${this.destination.destinationname} in Sikkim!`
    );
  }

  downloadQR(): void {
    downloadQRCode(this.destination.slug);
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  showModelVoiceModel() {
    this.voiceModeService.showModel();
  }
}
