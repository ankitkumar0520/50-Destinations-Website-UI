import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-share-qr-model',
  imports: [CommonModule],
  standalone: true, 
  templateUrl: './share-qr-model.component.html',
  styleUrl: './share-qr-model.component.css'
})
export class ShareQRModelComponent {

  @Input() shareLink: string = '';
  @Output() close = new EventEmitter<void>();

  copied = false;

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
