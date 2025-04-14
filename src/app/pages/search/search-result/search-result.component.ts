import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import {NgxPaginationModule} from 'ngx-pagination'; //


@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit {
  searchResults: [] = [/* static results as before */];

  filteredResults: [] = [];
  paginatedResults:any=[]
  currentPage = 1;
  itemsPerPage = 8;

  private searchService=inject( SearchService);

  constructor(private router: Router, ) {}

  ngOnInit() {
    
  }


  navigateToDetail(id:any){
      //redierect to main destination page
  }

}
