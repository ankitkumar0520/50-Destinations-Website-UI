import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.css']
})
export class VideoSectionComponent {
  isVideoExpanded = false;
  public safeVideoUrl: SafeResourceUrl;
  private eventService = inject(EventService);
  private router = inject(Router);
  
  pdfUrl = {
    acknowledgment: 'assets/PDF/Impact_of_SRTM.pdf',
    tourismImpact: 'assets/PDF/SRTM_Acknowlegement.pdf'
  }

  constructor(private sanitizer: DomSanitizer) {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/Video/srtm-video.mp4');
  }

  isVideoLoaded = false;
  isBuffering = false;
  showBanner = true;
  isThumbnailLoaded = false;
  thumbnailUrl = 'assets/Images/website-images/srtm-banner.png';
  
  onThumbnailLoad() {
    this.isThumbnailLoaded = true;
  }
  
  onPlayClick() {
    this.showBanner = false;
    this.isVideoLoaded = false;
    this.isBuffering = true;
  }

  onBuffering() {
    this.isBuffering = true;
  }

  onPlaying() {
    this.isBuffering = false;
    this.isVideoLoaded = true;
  }

  onCanPlay() {
    this.isBuffering = false;
    this.isVideoLoaded = true;
  }

  showPdf(pdfUrl: string) {
    this.eventService.setPdfUrl(pdfUrl);
    this.router.navigate(['/view-pdf']);
  }
}
