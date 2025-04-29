import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import {  pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { EventService } from '../../../services/event.service';
@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css'],
  imports: [NgxExtendedPdfViewerModule]
})
export class ViewPdfComponent implements OnInit {
  @Input() pdfUrl: string = '';

  eventService: EventService = inject(EventService);

  pdfName: string = '';

  constructor() { 
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  ngOnInit() {
    this.pdfUrl = this.eventService.getPdfUrl() || 'assets/PDF/dummy.pdf';
    this.pdfName = this.pdfUrl.split('/').pop() || 'default.pdf';
  }
  


  
}
