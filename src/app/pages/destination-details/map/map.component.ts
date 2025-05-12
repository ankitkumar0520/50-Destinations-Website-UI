import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  inject,
  OnInit
} from '@angular/core';
import { DestinationService } from '../../../services/destination.service';
import { SectionHeaderComponent } from '../../../common/section-header/section-header.component';

let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map: L.Map | undefined;
  currentLayer: string = 'OpenStreetMap';
  private baseLayer: L.TileLayer | undefined;
  isLoading: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private destinationService = inject(DestinationService);
  destination :any;


  mapLayers = [
    {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      icon: 'fa-map',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    {
      name: 'CartoDB',
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      icon: 'fa-map-marked-alt',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    {
      name: 'EsriSatellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      icon: 'fa-satellite',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  ];

  ngOnInit(): void {
    this.destinationService.destination$.subscribe(dest => {
      if (dest) {
        this.destination = dest;
     
        this.initializeMap();
      }
    });
  }

  openGoogleMaps(): void {
    const lat = parseFloat(this.destination?.latitude ?? '');
    const lng = parseFloat(this.destination?.longitude ?? '');
    if (!isNaN(lat) && !isNaN(lng)) {
      if(isPlatformBrowser(this.platformId)){
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
      }
    }
  }

  changeLayer(layerName: string): void {
    if (!this.map) return;

    this.isLoading = true;
    
    if (this.baseLayer) {
      this.map.removeLayer(this.baseLayer);
    }

    const selectedLayer = this.mapLayers.find(layer => layer.name === layerName);
    if (selectedLayer) {
      this.baseLayer = L.tileLayer(selectedLayer.url, {
        maxZoom: 19,
        attribution: selectedLayer.attribution
      }).addTo(this.map);
      this.currentLayer = layerName;
    }

    // Simulate loading time for layer change
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  initializeMap() {
    if (isPlatformBrowser(this.platformId)) {
      const lat = parseFloat(this.destination?.latitude ?? '');
      const lng = parseFloat(this.destination?.longitude ?? '');
      const isDataValid = 
        this.destination &&
        !isNaN(lat) && Number.isFinite(lat) &&
        !isNaN(lng) && Number.isFinite(lng);
  
      if (isDataValid) {
        import('leaflet').then((leaflet) => {
          L = leaflet.default;
          try {
            this.initMap(lat, lng);
          } catch (mapError) {
            console.error('MapComponent: Error during map initialization:', mapError);
          }
        }).catch(err => {
          console.error('MapComponent: Error loading Leaflet:', err);
          this.isLoading = false;
        });
      } else {
        console.error(
          'MapComponent: Map initialization skipped due to invalid or missing data.',
          { 
            destinationExists: !!this.destination,
            latitude: lat,
            longitude: lng,
            isLatFinite: Number.isFinite(lat),
            isLngFinite: Number.isFinite(lng),
            destinationData: this.destination 
          }
        );
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
    }
  }

  private initMap(lat: number, lng: number): void {

    if (this.map) {
      this.map.remove(); // Removes the old map instance if it exists
    }

    
    this.map = L.map(this.mapContainer.nativeElement, { 
      zoomControl: false,
      attributionControl: true
    }).setView([lat, lng], 13);

    // Initialize with OpenStreetMap layer
    const defaultLayer = this.mapLayers[0];
    this.baseLayer = L.tileLayer(defaultLayer.url, {
      maxZoom: 19,
      attribution: defaultLayer.attribution
    }).addTo(this.map);

    const marker = L.marker([lat, lng]).addTo(this.map);
  
    const popupContent = `
      <div>
        <p style="margin: 0; font-size: 14px;">${this.destination?.destinationname}</p>
      </div>
    `;

    const owlIcon = L.icon({
      iconUrl: 'assets/Images/logo/marker-tourism.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  
    marker.bindPopup(popupContent).openPopup();
    marker.setIcon(owlIcon);
    marker.on('add', () => {
      // Optional: if you are using leaflet-bounce plugin
      if (marker.setBounceOptions) {
        marker.setBounceOptions({ bounceHeight: 60 }).bounce();
      }
    });

    // Hide loading indicator after map is fully loaded
    this.isLoading = false;
  }
}
