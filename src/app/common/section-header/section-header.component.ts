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
  @Input() badgeText: string = 'badgeText';

  @Input() titleLeft: string = 'titleLeft';
  @Input() titleMiddleHighlighted: string = 'titleMiddleHighlighted';
  @Input() titleRight: string = 'titleRight';


  @Input() description: string = 'description';
  @Input() features: { icon: string; text: string }[] = [
    { icon: 'fas fa-arrow-up', text: 'fas fa-arrow-up' },
    { icon: 'fas fa-arrow-up', text: 'fas fa-arrow-up' }
  ];
}
