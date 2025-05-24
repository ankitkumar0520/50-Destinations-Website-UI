import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, finalize, Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DestinationService implements OnDestroy {
  private apiService = inject(ApiService);
 destinationSubject = new BehaviorSubject<any>(null);
  destination$ = this.destinationSubject.asObservable();
  private router = inject(Router);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable(); // <-- Expose observable

  private subscriptions: Subscription = new Subscription();

  getDestinationBySlug(slug: string): void {
    this.loadingSubject.next(true); // Start loading
  
    const apiSub = this.apiService
      .get(`LandingPage/GetDestinationsWithBasicDetailsBySlug?slug=${slug}`)
      .pipe(finalize(() => this.loadingSubject.next(false))) // End loading
      .subscribe({
        next: (data: any) => {
          // Check if data is null/undefined or doesn't contain valid 'entities' array
          const hasValidData = data && Array.isArray(data.entities) && data.entities.length > 0;
  
          if (hasValidData) {
            this.destinationSubject.next(data);
          } else {
            this.router.navigate(['/not-found']); // Redirect to 404 page
          }
        },
        error: (error: any) => {
          console.error('Error fetching destination by slug:', error);
          this.router.navigate(['/not-found']); // Redirect on API failure
        }
      });
  
    this.subscriptions.add(apiSub);
  }
  

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.destinationSubject.complete();
    this.loadingSubject.complete(); // <-- Cleanup
  }
}
