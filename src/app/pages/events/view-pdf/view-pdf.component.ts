import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { EventService } from '../../../services/event.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css'],
  standalone: true,
  imports: [NgxExtendedPdfViewerModule, CommonModule]
})
export class ViewPdfComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer: any;
  
  loading: boolean = false;
  loadingFailed: boolean = false;
  loadingProgress: number = 0;
  retryCount: number = 0;
  maxRetries: number = 3;

  eventService: EventService = inject(EventService);
  pdfName: string = '';
  sanitizer: DomSanitizer = inject(DomSanitizer);
  pdfSrc: any;

  constructor() { 
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  ngOnInit() {
    this.loadPdf();
  }

  loadPdf() {    
    this.pdfSrc= this.sanitizer.bypassSecurityTrustResourceUrl(this.eventService.getPdfUrl() || 'assets/PDF/dummy.pdf');
    this.pdfName = this.pdfSrc.split('/').pop() || 'toursim.pdf';    
  }



  
  onPdfLoadingProgress(event: any) {
    if (event?.loaded && event?.total) {
      // Calculate progress percentage
      const progress = (event.loaded / event.total) * 100;
      this.loadingProgress = Math.round(progress);
      console.log(`Loading progress: ${this.loadingProgress}%`);
    }
  }



  onPdfLoadingFailed(error: any) {
    console.error('PDF loading failed:', error);
    this.loadingFailed = true;
    this.loading = false;
    
    // Auto-retry logic
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`Retrying... Attempt ${this.retryCount} of ${this.maxRetries}`);
      setTimeout(() => {
        this.retryLoading();
      }, 1000 * this.retryCount); // Exponential backoff
    }
  }

  retryLoading() {
    if (this.retryCount >= this.maxRetries) {
      this.retryCount = 0; // Reset retry count for manual retry
    }
    this.loadPdf();
  }
}
