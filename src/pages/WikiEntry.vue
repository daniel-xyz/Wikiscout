<template>
  <div id="wiki-entry" class="content-container">
    <h4>{{ entry.name }}</h4>
    <img :src="entry.image.src" :width="entry.image.width">
    <div v-html="description"></div>

    <!--<div v-for="entry in additionalEntries">-->
      <!--<h6>{{ entry.name }}</h6>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { entries, markers } from '../services/api';

  export default {
    name: 'wiki-entry',
    data () {
      return {
        entry: {
          name: '',
          descriptionRaw: '',
          image: {
            src: '',
            width: '',
          },
          coordinates: {
            lng: '',
            lat: '',
          },
        },
        additionalEntries: {
          first: {
            name: '',
            img: '',
            distance: '',
          },
          second: {
            name: '',
            img: '',
            distance: '',
          },
        },
      };
    },

    watch: {
      $route () {
        this.fillData();
      },
    },

    computed: {
      description () {
        return this.entry.descriptionRaw + "<br /><a href='https://de.wikipedia.org/wiki/" + this.entry.name + "'>Mehr auf Wikipedia</a>";
      },
    },

    methods: {
      fillData () {
        const name = this.$route.params.name;

        this.entry.name = name;

        entries.getByTitle(name, (error, response) => {
          if (error) {
            return console.error(error.stack); // eslint-disable-line no-console
          }

          console.log(response);

          if (typeof Object.values(response.query.pages)[0].thumbnail !== 'undefined') {
            const thumbnail = Object.values(response.query.pages)[0].thumbnail;

            if (typeof thumbnail.source !== 'undefined') {
              this.entry.image.src = thumbnail.source;
            } else {
              this.entry.image.src = '';
              this.entry.image.width = '';
            }

            if (typeof thumbnail.width !== 'undefined') {
              this.entry.image.width = thumbnail.width;
            }
          } else {
            this.entry.image.src = '';
            this.entry.image.width = '';
          }

          if (typeof Object.values(response.query.pages)[0] !== 'undefined') {
            this.entry.descriptionRaw = Object.values(response.query.pages)[0].extract;

            if (typeof Object.values(response.query.pages)[0].coordinates[0] !== 'undefined') {
              const coords = Object.values(response.query.pages)[0].coordinates[0];

              this.entry.coordinates.lng = coords.lon;
              this.entry.coordinates.lat = coords.lat;

              this.resetAdditionalNeighbors();
              this.showNeighbors();
            }
          }

          return null;
        });
      },

      showNeighbors () {
        markers.getTwoNeighborsInRadius(this.entry.coordinates.lng, this.entry.coordinates.lat, 500, (error, response) => {
          let iteration = 1;

          // eslint-disable-next-line
          if (typeof Object.values(response.query !== 'undefined')) {
            const query = response.query;

            // eslint-disable-next-line
            if (typeof Object.values(query.pages !== 'undefined')) {
              const pages = query.pages;

              Object.values(pages).forEach((entry) => {
                if (entry.title === this.entry.name) {
                  return null;
                }

                if (iteration === 1) {
                  this.additionalEntries.first.name = entry.title;
                  iteration = 2;
                } else if (iteration === 2) {
                  this.additionalEntries.second.name = entry.title;
                }
              });
            }
          }
        });
      },

      resetAdditionalNeighbors () {
        this.additionalEntries.first.name = '';
        this.additionalEntries.first.img = '';
        this.additionalEntries.first.distance = '';

        this.additionalEntries.second.name = '';
        this.additionalEntries.second.img = '';
        this.additionalEntries.second.distance = '';
      },
    },

    created () {
      this.fillData();
    },
  };
</script>
