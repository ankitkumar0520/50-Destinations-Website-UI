import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiService } from '../../services/api.service';
import { ImageService } from '../../services/image.service';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../common/loader/loader.component';

interface News {
  id: number;
  title: string;
  date: Date;
  content: string;
  imageUrl?: string;
  pdfUrl?: string;
  updatedon?: Date;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    LoaderComponent
  ],
})
export class EventsComponent implements OnInit {
  imageService: ImageService = inject(ImageService);
  apiService = inject(ApiService);

  // Tab related properties
  activeTab: string = 'events';
  tabs = [
    {
      id: 'events',
      title: 'Events',
      icon: 'fa-calendar-alt',
      color: 'primary',
    },
    { id: 'news', title: 'News', icon: 'fa-newspaper', color: 'emerald' },
  ];

  paginateConfig = {
    totalItem: 0,
    pageNumber: 1,
    itemPerPage: 12
  };


  isLoading = false;
  searchTerm: string = '';
  events: any[] = [];
  newsList: any[] = [];
  today = new Date();
  selectedNews: any = null;
  isNewsModalOpen: boolean = false;
  selectedImage: string | null = null;
  isImageModalOpen: boolean = false;


  ngOnInit(): void {
    this.search();
  }

  getEventsPaginated() {  
    this.isLoading = true;
    this.apiService.get(
      `LandingPage/GetAllEvents?pageNumber=${this.paginateConfig.pageNumber}&pageSize=${this.paginateConfig.itemPerPage}`
    )
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (res: any) => {
        try {
          this.events = res.data || []
          this.paginateConfig.totalItem = res.totalRecords || 0;
          this.paginateConfig.pageNumber = res.pageNumber || 1;
        } catch (error) {
          console.error('Error processing events data:', error);
          this.events = [];
        }
      },
      error: (error: any) => {
        console.error('API Error loading events:', error);
        this.events = [];
      }
    });
  }

  onPageChange(page: number) {
    this.paginateConfig.pageNumber = page;
    if (this.activeTab === 'events') {
      this.getEventsPaginated();
    } else {
      this.getNewsPaginated();
    }
  }

  switchTab(tabId: string): void {
    this.activeTab = tabId;
    this.searchTerm = '';
    if (tabId === 'events') {
      this.getEventsPaginated();
      this.paginateConfig.pageNumber = 1;
    } else {
      this.getNewsPaginated();
      this.paginateConfig.pageNumber = 1;
    }
  }

  getNewsPaginated() {
    this.isLoading = true;
    this.apiService.get(
      `CMS/GetNewsByPaginationAndSearchTerm?pageNumber=${this.paginateConfig.pageNumber}&pageSize=${this.paginateConfig.itemPerPage}&searchTerm=${this.searchTerm}`
    )
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (res: any) => {
        try {
          this.newsList = res.data.data || [];
          this.paginateConfig.totalItem = res.totalRecords || 0;
          this.paginateConfig.pageNumber = res.pageNumber || 1;

        } catch (error) {
          console.error('Error processing news data:', error);
          this.newsList = [];
        }
      },
      error: (error: any) => {
        console.error('API Error loading news:', error);
        this.newsList = [];
      }
    });
  }


  getEventStatus(eventDate: string): 'upcoming' | 'ongoing' | 'ended' {
    const date = new Date(eventDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date > tomorrow) {
      return 'upcoming';
    } else if (
      date <= today &&
      date >= new Date(today.setDate(today.getDate() - 1))
    ) {
      return 'ongoing';
    } else {
      return 'ended';
    }
  }


  toogleNewsModal(news: News | null): void {
    this.selectedNews = news;

    this.isNewsModalOpen = !this.isNewsModalOpen;
    if (this.isNewsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  toogleImagePreview(imageUrl: string |null): void {
    this.selectedImage = imageUrl;
    this.isImageModalOpen =! this. isImageModalOpen;
    if(this.isImageModalOpen){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = 'auto';
    }
  }


  scrollToTop(): void {
    window.scrollTo({
      top: 60,
      behavior: 'smooth',
    });
  }

  search(): void {
    setTimeout(()=>{
    if (this.activeTab === 'events') {
      //filter event to be added
      this.getEventsPaginated();
    } else {
     this.getNewsPaginated();
    }
    },200)
  }

  getNewsImage(news: any): string {
    if (news && news.media && news.media.length > 0) {
      return news.media[0].mediaurl;
    }
    return '';
  }
  


  clearSearch(): void {
    this.searchTerm = '';
    if (this.activeTab === 'events') {
      this.getEventsPaginated();
    } else {
      this.getNewsPaginated();
    }
  }
}
