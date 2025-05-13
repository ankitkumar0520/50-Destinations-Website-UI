import {
  Component,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  destroyOwlInstance,
  initializeOwlCarousel,
} from '../../../utils/utils';
import { ApiService } from '../../../services/api.service';
import { ImageService } from '../../../services/image.service';



interface Official {
  name: string;
  designation: string;
  fullMessage: string;
  media: [
    {
      mediaurl: string;
    }
  ];
}


@Component({
  selector: 'app-home-minister-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-minister-profile.component.html',
  styleUrl: './home-minister-profile.component.css',
})
export class HomeMinisterProfileComponent implements OnInit, OnDestroy {

  imageService = inject(ImageService);
  selectedMinister: any = null;
  showModal: boolean = false;
  baseUrl ='';

  ministers: Official[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    
    this.getTestimonials();

  }



  ngOnDestroy() {
    destroyOwlInstance('.minister-carousel');
  }

  openModal(minister: any) {
    this.selectedMinister = minister;
    this.showModal = true;
    document.body.style.overflow = 'hidden'; // Disable scroll
  }

  closeModal() {
    this.showModal = false;
    this.selectedMinister = null;
    document.body.style.overflow = 'auto'; // Enable scroll
  }

  // Commented out API method
  getTestimonials() {
    this.apiService.get('LandingPage/GetAllTestimonials').subscribe({
      next: (response: any) => {
        if(response.data.length>0){


        this.ministers = response.data.map((min: any) => ({
          ...min,
          name:min.name,
          designation:min.designation,
          fullMessage:min.description,
          media:min.media
        }));


      
        setTimeout(() => {
          initializeOwlCarousel(
            '.minister-carousel',
            true,
            true,
            0,
            false,
            [1, 2, 3]
          );
        }, 200);
        }
      },
      error: (error: any) => {
        console.error('Error fetching testimonials:', error);
      },
    });
  }

  handleCarouselClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
  
    // Check if the clicked element is a 'Read More' button
    if (target && target.classList.contains('read-more-btn')) {
      // Get the 'data-id' attribute (minister's name)
      const ministerName = target.getAttribute('data-id');
      
      if (ministerName) {
        // Find the minister object from the list of ministers using the name
        const minister = this.ministers.find((min: any) => min.name === ministerName);
    
        if (minister) {
          // Pass the whole minister object to the modal
          this.openModal(minister);
        }
      }
    }
  }  
  

}
