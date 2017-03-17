<template>
  <transition name="fade">
    <div id="main-layer">
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'standard-layer',
    data () {
      return {};
    },

    created () {
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
