<template>
  <transition name="fade">
    <div id="wiki-entry" class="main-layer content-container">
      <h4>{{ entry.name }}</h4>
      <img :src="entry.image.src" :width="entry.image.width">
      <div v-html="description"></div>
    </div>
  </transition>
</template>

<script>
  import { entries } from '../services/api';

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
              // console.log(thumbnail.source);
              this.entry.image.src = thumbnail.source;
            }

            if (typeof thumbnail.width !== 'undefined') {
              this.entry.image.width = thumbnail.width;
            }
          }

          if (typeof Object.values(response.query.pages)[0] !== 'undefined') {
            this.entry.descriptionRaw = Object.values(response.query.pages)[0].extract;
          }

          return null;
        });
      },
    },

    created () {
      this.fillData();

      this.$bus.$emit('menuChangeRequest', {
        showBack: true,
        backPath: '/',
        backText: 'Zur Karte',
      });
    },

    destroyed () {
      this.$bus.$emit('menuChangeRequest', {
        showBack: false,
      });
    },
  };
</script>
