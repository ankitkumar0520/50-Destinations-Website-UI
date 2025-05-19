import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, finalize, Subscription } from 'rxjs';
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
      .get(`LandingPage/GetDestinationsWithBasicDetailsBySlug?slug=${slug}`).pipe(
        finalize(() => this.loadingSubject.next(false))  // <-- Done loading
      )
      .subscribe({
        next: (data: any) => {
          this.destinationSubject.next(data);
        },
        error: (error: any) => {
          console.error('Error fetching destination by slug:', error);

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
