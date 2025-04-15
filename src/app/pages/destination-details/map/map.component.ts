import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';

let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule]
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map: L.Map | undefined;
  private fullscreenControl: L.Control | undefined;
  private originalContainer: HTMLElement | null = null;
  private originalStyles: { [key: string]: string } = {};
  private originalPosition: { top: string, left: string } = { top: '', left: '' };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((leaflet) => {
        L = leaflet;
        this.initMap();
        this.addFullscreenControl();
      });
    }
  }

  private initMap(): void {
    this.map = L.map('map', { zIndex: 0 }).setView([27.3389, 88.6065], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([27.3389, 88.6065])
      .addTo(this.map)
      .bindPopup('Rumtek Monastery')
      .openPopup();

    // Store original container reference
    this.originalContainer = document.getElementById('map');

    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.style.zIndex = '0';
    }
  }

  private addFullscreenControl(): void {
    if (!this.map) return;

    // Create custom control
    const FullscreenControl = L.Control.extend({
      options: {
        position: 'topright'
      },

      onAdd: () => {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        
        const button = L.DomUtil.create('a', 'leaflet-control-fullscreen', container);
        button.innerHTML = '<i class="fas fa-expand"></i>';
        button.title = 'Fullscreen';
        button.href = '#';
        
        L.DomEvent.on(button, 'click', this.toggleFullscreen.bind(this));
        
        return container;
      }
    });

    this.fullscreenControl = new FullscreenControl();
    this.map.addControl(this.fullscreenControl!);
  }

  private toggleFullscreen(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    
    const mapElement = this.originalContainer;
    if (!mapElement || !this.map) return;

    if (document.fullscreenElement) {
      // Exit fullscreen
      this.exitFullscreen();
    } else {
      // Enter fullscreen
      this.enterFullscreen();
    }
  }

  private async enterFullscreen(): Promise<void> {
    const mapElement = this.originalContainer;
    if (!mapElement) return;

    // Store original styles
    this.originalStyles = {
      position: mapElement.style.position,
      top: mapElement.style.top,
      left: mapElement.style.left,
      width: mapElement.style.width,
      height: mapElement.style.height,
      zIndex: mapElement.style.zIndex,
      borderRadius: mapElement.style.borderRadius
    };

    // Prepare for fullscreen
    mapElement.style.transition = 'all 0.3s ease-out';
    mapElement.style.position = 'fixed';
    mapElement.style.top = '0';
    mapElement.style.left = '0';
    mapElement.style.width = '100vw';
    mapElement.style.height = '100vh';
    mapElement.style.zIndex = '1000';
    mapElement.style.borderRadius = '0';

    try {
      await mapElement.requestFullscreen();
      this.updateControlIcon(true);
    } catch (err) {
      console.error('Fullscreen failed:', err);
    }

    // Force Leaflet to redraw after transition
    setTimeout(() => this.map?.invalidateSize(), 300);
  }

  private async exitFullscreen(): Promise<void> {
    const mapElement = this.originalContainer;
    if (!mapElement) return;

    try {
      await document.exitFullscreen();
    } catch (err) {
      console.error('Exit fullscreen failed:', err);
    }

    // Restore original styles
    mapElement.style.transition = 'all 0.3s ease-out';
    Object.assign(mapElement.style, this.originalStyles);
    this.updateControlIcon(false);

    // Force Leaflet to redraw after transition
    setTimeout(() => this.map?.invalidateSize(), 300);
  }

  private updateControlIcon(isFullscreen: boolean): void {
    const control:any = document.querySelector('.leaflet-control-fullscreen');
    if (control) {
      control.innerHTML = isFullscreen ? '<i class="fas fa-compress"></i>' : '<i class="fas fa-expand"></i>';
      control.title = isFullscreen ? 'Minimize' : 'Fullscreen';
    }
  }
}