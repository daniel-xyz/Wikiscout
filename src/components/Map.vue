<template>
  <div id="map-container">
    <div id="map"></div>
    <div id="map-loading-screen" class="main-layer hide-md-and-up">
      <div id="loading-container">
        <div id="loading-image"></div>
        <div id="loading-text">
          <h4>Karte wird geladen ...</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { markers } from '../services/api';

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

          this.lastMarkerUpdateAt.lng = lng;
          this.lastMarkerUpdateAt.lat = lat;

          console.log(response);

          Object.values(response.query.pages).forEach((marker) => {
            console.log(marker);

            this.markers.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [marker.coordinates[0].lon, marker.coordinates[0].lat],
              },
              properties: {
                name: marker.title ? marker.title : '',
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
            this.addLayer('markers');
          }

          return null;
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

      addLayer (sourceID) {
        this.map.addLayer({
          id: sourceID,
          type: 'symbol',
          source: sourceID,
          layout: {
            'icon-image': 'marker-hobby',
            'icon-offset': [0, -51],
            'icon-allow-overlap': true,
          },
        });
      },

      removeLoadingLayer () {
        const loadingLayer = document.getElementById('map-loading-screen');

        loadingLayer.classList.add('hide-opacity');

        window.setTimeout(() => {
          loadingLayer.classList.add('hide');
        }, 500);
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
        const zoomLevel = this.map.getZoom();

        // console.log('zoom: ' + zoomLevel);

        if (zoomLevel < 16 && this.map.getLayer('markers')) {
          this.map.setLayoutProperty('markers', 'visibility', 'none');
        } else if (this.map.getLayer('markers')) {
          this.map.setLayoutProperty('markers', 'visibility', 'visible');

          const currentLng = this.map.getCenter().lng;
          const currentLat = this.map.getCenter().lat;

          const distance = geolib.getDistance(
            { latitude: this.lastMarkerUpdateAt.lat, longitude: this.lastMarkerUpdateAt.lng },
            { latitude: currentLat, longitude: currentLng },
          );

          console.log('distance: ' + distance);

          if (distance > 200) {
            this.loadMarkersInRadius(currentLng, currentLat, 500);
          }
        }
      },

      initEventListeners () {
        this.map.once('load', () => {
          this.loadMarkersInRadius(this.map.getCenter().lng, this.map.getCenter().lat, 500);
          this.removeLoadingLayer();

          if ('geolocation' in navigator) {
            this.flyToCurrentLocation();

            this.map.addControl(new mapboxgl.GeolocateControl({
              watchPosition: true,
            }));
          }
        });
        this.map.on('moveend', this.onMoveEndListener);
        this.map.on('click', this.onMapClickHandler);
      },

      flyToCurrentLocation () {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log('Lng: ' + lng + ' Lat: ' + lat);


          this.map.flyTo({
            center: [lng, lat],
            zoom: 16,
          });
        });
      },
    },

    mounted () {
      this.initialize();
    },
  };
</script>
