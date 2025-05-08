import { Component, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SlugifyPipe } from '../pipes/slugify.pipe';
import { slugify } from '../utils/utils';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.css'],
  imports: [QRCodeComponent, ReactiveFormsModule, FormsModule, SlugifyPipe]
})
export class QrGeneratorComponent implements OnInit {
  destination: string = 'Enter Proper Name here';

  constructor() { }

  ngOnInit() {
    // Remove the alert as it's not needed
  }
 
  get url(): string {
    const baseUrl = 'https://sikkimdarshan.com/destination/';
    const slug = slugify(this.destination);
    return `${baseUrl}${slug}`;
  }
}
