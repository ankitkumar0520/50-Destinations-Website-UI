import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { DestinationService } from '../../../services/destination.service';

let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map: L.Map | undefined;
  private fullscreenControl: L.Control | undefined;
  private originalContainer: HTMLElement | null = null;
  private originalStyles: { [key: string]: string } = {};
  private originalPosition: { top: string; left: string } = {
    top: '',
    left: '',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private destinationService = inject(DestinationService);
  destination = this.destinationService.getDestionation();

  travelInfo = this.destination.travelInfo;

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
    this.map = L.map('map', { zIndex: 0 }).setView(
      [this.travelInfo.latitude, this.travelInfo.longitude],
      13
    );

    // Add Esri World Gray Canvas as base layer
    const esriWorldGrayCanvas = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      }
    ).addTo(this.map);

    // Add Stadia Terrain Labels overlay
    const stadiaStamenTerrainLabels = L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}{r}.{ext}',
      {
        minZoom: 0,
        maxZoom: 16,
        attribution:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png',
      }
    ).addTo(this.map);

    // Add marker
    L.marker([this.travelInfo.latitude, this.travelInfo.longitude])
      .addTo(this.map)
      .bindPopup(this.destination.name)
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
        position: 'topright',
      },

      onAdd: () => {
        const container = L.DomUtil.create(
          'div',
          'leaflet-bar leaflet-control'
        );

        const button = L.DomUtil.create(
          'a',
          'leaflet-control-fullscreen',
          container
        );
        button.innerHTML = '<i class="fas fa-expand"></i>';
        button.title = 'Fullscreen';
        button.href = '#';

        L.DomEvent.on(button, 'click', this.toggleFullscreen.bind(this));

        return container;
      },
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
      borderRadius: mapElement.style.borderRadius,
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
    const control: any = document.querySelector('.leaflet-control-fullscreen');
    if (control) {
      control.innerHTML = isFullscreen
        ? '<i class="fas fa-compress"></i>'
        : '<i class="fas fa-expand"></i>';
      control.title = isFullscreen ? 'Minimize' : 'Fullscreen';
    }
  }
}
