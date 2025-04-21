// src/app/core/services/browser.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map, startWith, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Window access
  get window(): Window | null {
    return this.isBrowser ? window : null;
  }

  // Document access
  get document(): Document | null {
    return this.isBrowser ? document : null;
  }

  // Storage access
  get localStorage(): Storage | null {
    return this.isBrowser ? window.localStorage : null;
  }

  get sessionStorage(): Storage | null {
    return this.isBrowser ? window.sessionStorage : null;
  }

  // Screen dimensions
  get screenWidth(): number | null {
    return this.isBrowser ? window.innerWidth : null;
  }

  get screenHeight(): number | null {
    return this.isBrowser ? window.innerHeight : null;
  }

  // Screen orientation
  get isPortrait(): boolean | null {
    if (!this.isBrowser) return null;
    return window.matchMedia('(orientation: portrait)').matches;
  }

  // Network status
  get isOnline(): boolean | null {
    return this.isBrowser ? navigator.onLine : null;
  }

  // User agent
  get userAgent(): string | null {
    return this.isBrowser ? navigator.userAgent : null;
  }

  // Geolocation
  getGeolocation(): Observable<GeolocationPosition> | null {
    if (!this.isBrowser || !('geolocation' in navigator)) return null;

    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  // Watch geolocation
  watchGeolocation(): Observable<GeolocationPosition> | null {
    if (!this.isBrowser || !('geolocation' in navigator)) return null;

    return new Observable((observer) => {
      const watchId = navigator.geolocation.watchPosition(
        (position) => observer.next(position),
        (error) => observer.error(error)
      );

      return () => navigator.geolocation.clearWatch(watchId);
    });
  }

  // Clipboard access
  async copyToClipboard(text: string): Promise<boolean> {
    if (!this.isBrowser || !navigator.clipboard) return false;

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  }

  // Network status observable
  get onlineStatus$(): Observable<boolean> | null {
    if (!this.isBrowser) return null;

    return merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).pipe(startWith(navigator.onLine), shareReplay(1));
  }

  // Scroll position
  getScrollPosition(): { x: number; y: number } | null {
    if (!this.isBrowser) return null;
    return {
      x: window.scrollX || window.pageXOffset,
      y: window.scrollY || window.pageYOffset,
    };
  }

  // Scroll to element
  scrollToElement(
    selector: string,
    behavior: ScrollBehavior = 'smooth'
  ): boolean {
    if (!this.isBrowser) return false;
    const element = document.querySelector(selector);
    if (!element) return false;

    element.scrollIntoView({ behavior });
    return true;
  }

  // Scroll to top
  scrollToTop(behavior: ScrollBehavior = 'smooth'): boolean {
    if (!this.isBrowser) return false;
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  // Create a cookie
  setCookie(
    name: string,
    value: string,
    options: { days?: number; path?: string; secure?: boolean } = {}
  ): boolean {
    if (!this.isBrowser) return false;

    const { days = 30, path = '/', secure = false } = options;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const cookieSecure = secure ? ';secure' : '';
    document.cookie = `${name}=${value};${expires};path=${path}${cookieSecure}`;
    return true;
  }

  // Read a cookie
  getCookie(name: string): string | null {
    if (!this.isBrowser) return null;

    const cookies = `; ${document.cookie}`;
    const parts = cookies.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  // Delete a cookie
  deleteCookie(name: string, path: string = '/'): boolean {
    if (!this.isBrowser) return false;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    return true;
  }

  // Get all cookies
  getCookies(): Record<string, string> | null {
    if (!this.isBrowser) return null;

    return document.cookie.split(';').reduce((cookies, cookie) => {
      const [name, value] = cookie.trim().split('=');
      return { ...cookies, [name]: value };
    }, {});
  }

  // Check if a feature is supported
  isFeatureSupported(feature: string): boolean {
    if (!this.isBrowser) return false;

    switch (feature.toLowerCase()) {
      case 'localstorage':
        return 'localStorage' in window && window.localStorage !== null;
      case 'sessionstorage':
        return 'sessionStorage' in window && window.sessionStorage !== null;
      case 'geolocation':
        return 'geolocation' in navigator;
      case 'serviceworker':
        return 'serviceWorker' in navigator;
      case 'pushmanager':
        return 'PushManager' in window;
      case 'indexeddb':
        return 'indexedDB' in window;
      case 'webworkers':
        return 'Worker' in window;
      default:
        return feature in window || feature in navigator;
    }
  }

  // Get device pixel ratio
  get devicePixelRatio(): number | null {
    return this.isBrowser ? window.devicePixelRatio : null;
  }

  // Request fullscreen
  async requestFullscreen(element?: HTMLElement): Promise<boolean> {
    if (!this.isBrowser) return false;

    try {
      const target = element || document.documentElement;
      await target.requestFullscreen();
      return true;
    } catch (err) {
      console.error('Fullscreen error:', err);
      return false;
    }
  }

  // Exit fullscreen
  async exitFullscreen(): Promise<boolean> {
    if (!this.isBrowser || !document.fullscreenElement) return false;

    try {
      await document.exitFullscreen();
      return true;
    } catch (err) {
      console.error('Exit fullscreen error:', err);
      return false;
    }
  }

  // Get current fullscreen element
  get fullscreenElement(): Element | null {
    return this.isBrowser ? document.fullscreenElement : null;
  }

  // Vibrate device (if supported)
  vibrate(pattern: number | number[]): boolean {
    if (!this.isBrowser || !('vibrate' in navigator)) return false;
    return navigator.vibrate(pattern);
  }
}
