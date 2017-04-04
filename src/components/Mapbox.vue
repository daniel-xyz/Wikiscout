<template>
  <div id="map-container">
    <div id="map" class="non-scrollable-layer"></div>

    <transition name="fade">
      <div id="map-loading-screen" class="non-scrollable-layer hide-md-and-up" v-show="!mapLoaded">
        <div id="loading-container">
          <div id="loading-image"></div>
          <div id="loading-text">
            <h4>Karte wird geladen ...</h4>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { markers } from '../services/api';
  import removeElements from '../utils/removeElementsByClass';

  const geolib = require('geolib');

  export default {
    name: 'map',
    data () {
      return {
        map: {},
        markers: [],
        lastMarkerUpdateAt: {
          lng: 0,
          lat: 0,
        },
        mapLoaded: false,
      };
    },

    methods: {
      initialize () {
        if (!isSupported) {
          console.log('Your browser doesn\'t support Mapbox GL.'); // eslint-disable-line no-console
        } else if (mapboxgl) {
          mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsYmlzY2hvZmYiLCJhIjoiY2l1enE4cWY1MDAyazJ4cDZxYjdramk2OCJ9.MUanhYSFZNfJZOjiLRWybw';

          this.map = new mapboxgl.Map({
            attributionControl: false,
            container: 'map',
            style: 'mapbox://styles/danielbischoff/cizo7w7b700a22sqjkaf4i900',
          });

          this.initEventListeners();

          this.map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            country: 'de',
            placeholder: 'Ort, Straße, Hausnummer',
          }));

          this.map.addControl(new mapboxgl.NavigationControl());

          this.map.addControl(new mapboxgl.AttributionControl({
            compact: true,
          }));
        }
      },

      loadMarkersInRadius (lng, lat, radius) {
        markers.getInRadius(lng, lat, radius, (error, response) => {
          if (error) {
            return console.error(error.stack); // eslint-disable-line no-console
          }

          removeElements('marker-' + this.lastMarkerUpdateAt.lng + '-' + this.lastMarkerUpdateAt.lat);

          this.lastMarkerUpdateAt.lng = lng;
          this.lastMarkerUpdateAt.lat = lat;
          this.markers = [];

          console.log(response);

          Object.values(response.query.pages).forEach((marker) => {
            // let thumbnail = '';

            if (typeof marker.coordinates === 'undefined') {
              return;
            }

            if (typeof marker.thumbnail !== 'undefined' && typeof marker.thumbnail.source !== 'undefined') {
//              const img = document.createElement('img');
//              img.src = marker.thumbnail.source;
//
//              this.map.addImage(marker.title, img);
//              thumbnail = marker.title;

              const el = document.createElement('div');
              el.classList.add('marker-thumbnail');
              el.classList.add('marker-' + this.lastMarkerUpdateAt.lng + '-' + this.lastMarkerUpdateAt.lat);
              el.style.backgroundImage = 'url(' + marker.thumbnail.source + ')';

              new mapboxgl.Marker(el, { offset: [-20, -30] })
                .setLngLat([marker.coordinates[0].lon, marker.coordinates[0].lat])
                .addTo(this.map);
            }

            this.markers.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [marker.coordinates[0].lon, marker.coordinates[0].lat],
              },
              properties: {
                name: marker.title ? marker.title : '',
//                thumbnail,
              },
            });
          });

          if (this.map.getSource('markers')) {
            this.map.getSource('markers').setData({
              type: 'FeatureCollection',
              features: this.markers,
            });
          } else {
            this.addSource('markers');
            this.addMarkersLayer('markers');
            // this.addMarkersThumbnailLayer('markers');
          }
        });
      },

      addSource (sourceID) {
        this.map.addSource(sourceID, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: this.markers,
          },
        });
      },

      addMarkersLayer (sourceID) {
        this.map.addLayer({
          id: 'markers',
          type: 'symbol',
          source: sourceID,
          layout: {
            'icon-image': 'marker',
            'icon-allow-overlap': true,
          },
          paint: {
            'icon-opacity': 1,
          },
        });
      },

//      addMarkersThumbnailLayer (sourceID) {
//        this.map.addLayer({
//          id: 'thumbnails',
//          type: 'symbol',
//          source: sourceID,
//          layout: {
//            'icon-image': '{thumbnail}',
//            'icon-offset': [-20, -30],
//            'icon-allow-overlap': true,
//          },
//          paint: {
//            'icon-opacity': 1,
//          },
//        });
//      },

      enableGeolocationIcon () {
        if ('geolocation' in navigator) {
          this.map.addControl(new mapboxgl.GeolocateControl({
            watchPosition: true,
          }));
        }
      },

      onMapClickHandler (e) {
        const features = this.map.queryRenderedFeatures(e.point, { layers: ['markers'] });

        if (!features.length) {
          this.$router.push({ path: '/' });
          return;
        }

        const feature = features[0];

        this.$router.push({
          path: `/entry/${feature.properties.name}`,
        });
      },

      onMoveEndListener () {
        if (!this.map.getLayer('markers')) {
          return;
        }

        const zoomLevel = this.map.getZoom();

        if (zoomLevel < 15) {
          // this.map.setPaintProperty('markers', 'icon-opacity', 0);
        } else {
          // this.map.setPaintProperty('markers', 'icon-opacity', 1);

          const currentLng = this.map.getCenter().lng;
          const currentLat = this.map.getCenter().lat;

          const distance = geolib.getDistance(
            { latitude: this.lastMarkerUpdateAt.lat, longitude: this.lastMarkerUpdateAt.lng },
            { latitude: currentLat, longitude: currentLng },
          );

          if (distance > 200) {
            this.loadMarkersInRadius(currentLng, currentLat, 500);
          }
        }
      },

      initEventListeners () {
        this.map.once('load', () => {
          this.mapLoaded = true;
          this.loadMarkersInRadius(this.map.getCenter().lng, this.map.getCenter().lat, 500);
          this.enableGeolocationIcon();
        });
        this.map.on('moveend', this.onMoveEndListener);
        this.map.on('click', this.onMapClickHandler);
      },

      flyToCurrentLocation () {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          this.map.flyTo({
            center: [lng, lat],
            zoom: 16.1,
          });
        });
      },
    },

    mounted () {
      this.initialize();
    },
  };
</script>
