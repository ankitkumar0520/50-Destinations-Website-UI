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

    // Add Sikkim boundary GeoJSON overlay
    this.addSikkimBoundary();
  }

  private addSikkimBoundary(): void {
    if (!L || !this.map) return;
    fetch('assets/geo/sikkim-boundary.geojson')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch Sikkim boundary GeoJSON: ${res.status}`);
        }
        return res.json();
      })
      .then(geojson => {
        if (!geojson || !geojson.features || !Array.isArray(geojson.features)) {
          throw new Error('Invalid or empty Sikkim boundary GeoJSON data.');
        }
        const sikkimInfo = `
          <div style="min-width:220px;max-width:320px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <img src='assets/Images/logo/marker-tourism.png' alt='Sikkim' style='width:32px;height:32px;border-radius:50%;box-shadow:0 2px 6px #1976d2;'>
              <span style='font-size:1.1em;font-weight:bold;color:#1976d2;'>Sikkim State Boundary</span>
            </div>
            <div style='font-size:0.98em;color:#333;line-height:1.5;'>
              <b>Capital:</b> Gangtok<br>
              <b>Area:</b> 7,096 km²<br>
              <b>Population:</b> ~670,000<br>
              <b>Known for:</b> Himalayas, biodiversity, culture, organic farming, and eco-tourism.<br>
              <b>Fun fact:</b> Sikkim is India's first fully organic state!
            </div>
          </div>
        `;
        const boundaryLayer = L.geoJSON(geojson, {
          style: {
            color: '#1976d2',
            weight: 8, // Thicker for easier hover/click
            dashArray: '8,10',
            lineJoin: 'round',
            fillColor: 'url(#sikkim-gradient)',
            fillOpacity: 0.18,
            className: 'sikkim-boundary-layer',
          },
          onEachFeature: (feature: any, layer: any) => {
            // Animated dashed border
            layer.on('add', () => {
              const path = layer.getElement();
              if (path) {
                path.style.strokeDasharray = '8,10';
                path.style.strokeDashoffset = '0';
                path.style.animation = 'dashmove 2s linear infinite';
              }
            });
            // Glowing effect and popup on hover
            layer.on('mouseover', (e: any) => {
              layer.setStyle({
                weight: 12,
                color: '#42a5f5',
                fillOpacity: 0.28,
                dashArray: null,
                cursor: 'pointer',
              });
              const path = layer.getElement();
              if (path) path.classList.add('sikkim-glow');
              // Show popup at mouse position
              layer.bindPopup(sikkimInfo, {autoPan: false, closeButton: false}).openPopup(e.latlng);
            });
            layer.on('mouseout', () => {
              layer.setStyle({
                weight: 8,
                color: '#1976d2',
                fillOpacity: 0.18,
                dashArray: '8,10',
                cursor: '',
              });
              const path = layer.getElement();
              if (path) path.classList.remove('sikkim-glow');
              if (layer && typeof layer.closePopup === 'function') {
                layer.closePopup();
              }
            });
            // Tooltip with name property
            if (feature.properties && feature.properties.name) {
              layer.bindTooltip(feature.properties.name + ' (Sikkim)', {
                permanent: false,
                direction: 'top',
                offset: [0, -10],
                opacity: 0.85,
                className: 'boundary-tooltip',
              });
            }
          },
        }).addTo(this.map);
        // Always fit map to Sikkim boundary
        if (this.map && boundaryLayer && boundaryLayer.getBounds) {
          this.map.fitBounds(boundaryLayer.getBounds(), {padding: [20, 20], maxZoom: 11});
        }
        // Add SVG gradient pattern to the map's SVG root
        if (this.map && typeof this.map.getPanes === 'function') {
          const panes = this.map.getPanes();
          if (panes && panes.overlayPane) {
            const svg = panes.overlayPane.querySelector('svg');
            if (svg && !svg.querySelector('#sikkim-gradient')) {
              const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
              grad.setAttribute('id', 'sikkim-gradient');
              grad.setAttribute('x1', '0%');
              grad.setAttribute('y1', '0%');
              grad.setAttribute('x2', '100%');
              grad.setAttribute('y2', '100%');
              grad.innerHTML = `
                <stop offset="0%" stop-color="#42a5f5" stop-opacity="0.18"/>
                <stop offset="100%" stop-color="#bbdefb" stop-opacity="0.18"/>
              `;
              if (svg.firstChild) {
                svg.insertBefore(grad, svg.firstChild);
              } else {
                svg.appendChild(grad);
              }
            }
          }
        }
        // Add CSS for shadow, animation, and glow
        const style = document.createElement('style');
        style.innerHTML = `
          @keyframes dashmove {
            to { stroke-dashoffset: 36; }
          }
          .sikkim-boundary-layer {
            filter: drop-shadow(0 2px 8px rgba(33,150,243,0.18));
            transition: filter 0.2s;
          }
          .sikkim-glow {
            filter: drop-shadow(0 0 12px #42a5f5) drop-shadow(0 0 4px #42a5f5);
          }
        `;
        document.head.appendChild(style);
      })
      .catch(err => {
        this.isLoading = false;
        // Show user-friendly error message (optional: you can use a toast/snackbar)
        console.error('Failed to load Sikkim boundary GeoJSON:', err);
       // alert('Could not load Sikkim boundary on the map. Please try again later.');
      });
  }
}
