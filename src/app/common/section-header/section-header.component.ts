import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent {
  @Input() badgeText?: String;

  @Input() titleLeft?: string;
  @Input() titleMiddleHighlighted? : string;
  @Input() titleRight?: string;


  @Input() description?: string;
  @Input() features: { icon: string; text: string }[] = [];
}
