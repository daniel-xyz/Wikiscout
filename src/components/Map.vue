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
  export default {
    name: 'map',
    data () {
      return {
        map: {},
        markers: {},
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

      removeLoadingLayer () {
        const loadingLayer = document.getElementById('map-loading-screen');

        loadingLayer.classList.add('hide-opacity');

        window.setTimeout(() => {
          loadingLayer.classList.add('hide');
        }, 500);
      },

      initEventListeners () {
        this.map.once('load', () => {
          this.removeLoadingLayer();
        });
      },

      flyToCurrentLocation () {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log('Lng: ' + lng + ' Lat: ' + lat);

          this.map.flyTo({
            center: [lng, lat],
            zoom: 14,
          });
        });
      },
    },

    mounted () {
      this.initialize();

      if ('geolocation' in navigator) {
        this.flyToCurrentLocation();

        this.map.addControl(new mapboxgl.GeolocateControl({
          watchPosition: true,
        }));
      }
    },
  };
</script>
