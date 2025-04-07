import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faTimes,
  faCopy,
  faCheckCircle,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-share-qr-model',
  imports: [CommonModule, FontAwesomeModule],
  standalone: true, 
  templateUrl: './share-qr-model.component.html',
  styleUrl: './share-qr-model.component.css'
})
export class ShareQRModelComponent {
  @Input() shareLink: string = '';
  @Output() close = new EventEmitter<void>();

  copied = false;

  // Define icon properties
  times = faTimes;
  copy = faCopy;
  checkCircle = faCheckCircle;
  envelope = faEnvelope;
  facebookF = faFacebookF;
  twitter = faTwitter;
  whatsapp = faWhatsapp;
  instagram = faInstagram;

  copyLink() {
    navigator.clipboard.writeText(this.shareLink).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000); // Reset after 2 sec
    });
  }

  closeModal() {
    this.close.emit();
  }
}