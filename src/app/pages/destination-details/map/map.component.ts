import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
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
  destination: any;
  fallback = {
    name: 'Sikkim',
    latitude: 27.3516,
    longitude: 88.3239,
    transportationbyairdescription:
      'The nearest airport to Sikkim is Bagdogra Airport in West Bengal, located around 125 kilometers from Gangtok. It is well connected to major cities like Delhi, Kolkata, and Guwahati. From Bagdogra, you can hire a taxi or take a shared cab to reach Gangtok, which usually takes about 4 to 5 hours. There is also a smaller airport at Pakyong, about 30 kilometers from Gangtok, which occasionally operates flights depending on weather and availability.',
    transportationbytraindescription:
      'The closest major railway station to Sikkim is New Jalpaiguri (NJP), located near Siliguri in West Bengal. NJP is a well-connected railhead that links to most major cities across India. After arriving at NJP, travelers typically continue their journey to Gangtok by road using taxis, shared jeeps, or buses, which takes around 4 to 5 hours.',
    transportationbyroaddescription:
      'Sikkim is well accessible by road from nearby towns and cities in West Bengal like Siliguri, Darjeeling, and Kalimpong. The journey to Gangtok, the capital of Sikkim, is scenic and popular among travelers. Regular private taxis, shared jeeps, and Sikkim Nationalised Transport (SNT) buses operate between Siliguri/NJP and Gangtok, making road travel a convenient and flexible option.',
  };

  mapLayers = [
    {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      icon: 'fa-map',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      name: 'CartoDB',
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      icon: 'fa-map-marked-alt',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      name: 'EsriSatellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      icon: 'fa-satellite',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ];

  ngOnInit(): void {
    this.destinationService.destination$.subscribe((dest) => {
      if (dest) {
        this.destination = dest;
        this.initializeMap();
      }
    });
  }

  openGoogleMaps(): void {
    const lat = parseFloat(
      this.destination?.latitude ?? this.fallback.latitude
    );
    const lng = parseFloat(
      this.destination?.longitude ?? this.fallback.longitude
    );
    if (!isNaN(lat) && !isNaN(lng)) {
      if (isPlatformBrowser(this.platformId)) {
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

    const selectedLayer = this.mapLayers.find(
      (layer) => layer.name === layerName
    );
    if (selectedLayer) {
      this.baseLayer = L.tileLayer(selectedLayer.url, {
        maxZoom: 19,
        attribution: selectedLayer.attribution,
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
      const lat = parseFloat(
        this.destination?.latitude ?? this.fallback.latitude
      );
      const lng = parseFloat(
        this.destination?.longitude ?? this.fallback.longitude
      );
      const isDataValid =
        this.destination &&
        !isNaN(lat) &&
        Number.isFinite(lat) &&
        !isNaN(lng) &&
        Number.isFinite(lng);

      if (isDataValid) {
        import('leaflet')
          .then((leaflet) => {
            L = leaflet.default;
            try {
              this.initMap(lat, lng);
            } catch (mapError) {
              console.error(
                'MapComponent: Error during map initialization:',
                mapError
              );
            }
          })
          .catch((err) => {
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
            destinationData: this.destination,
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
      attributionControl: true,
    }).setView([lat, lng], 13);

    // Initialize with OpenStreetMap layer
    const defaultLayer = this.mapLayers[0];
    this.baseLayer = L.tileLayer(defaultLayer.url, {
      maxZoom: 19,
      attribution: defaultLayer.attribution,
    }).addTo(this.map);

    const marker = L.marker([lat, lng]).addTo(this.map);

    const popupContent = `
      <div>
          <p style="margin: 0; font-size: 14px;">${
            this.destination?.destinationname || this.fallback.name
          }</p>
      </div>
    `;

    const owlIcon = L.icon({
      iconUrl: 'assets/Images/logo/marker-tourism.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
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
