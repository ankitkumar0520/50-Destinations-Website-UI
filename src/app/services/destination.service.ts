import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DestinationService implements OnDestroy {
  private apiService = inject(ApiService);
  private destinationSubject = new BehaviorSubject<any>(null);
  destination$ = this.destinationSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable(); // <-- Expose observable

  private subscriptions: Subscription = new Subscription();

  getDestinationbySlug(slug: string): void {
    this.loadingSubject.next(true); // <-- Start loading

    const apiSub = this.apiService
      .get(`LandingPage/GetDestinationsWithBasicDetailsBySlug?slug=${slug}`)
      .subscribe({
        next: (data: any) => {
          this.destinationSubject.next(data);
          this.loadingSubject.next(false); // <-- Done loading
        },
        error: (error: any) => {
          console.error('Error fetching destination by slug:', error);
          this.loadingSubject.next(false); // <-- Also stop loading on error
        },
      });

    this.subscriptions.add(apiSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.destinationSubject.complete();
    this.loadingSubject.complete(); // <-- Cleanup
  }
}
