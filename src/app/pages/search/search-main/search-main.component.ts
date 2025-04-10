import { Component } from '@angular/core';
import { SearchFiltersComponent } from "../search-filters/search-filters.component";
import { SearchResultComponent } from "../search-result/search-result.component";
@Component({
  selector: 'app-search-main',
  imports: [SearchFiltersComponent, SearchResultComponent],
  templateUrl: './search-main.component.html',
  styleUrl: './search-main.component.css'
})
export class SearchMainComponent {

}
