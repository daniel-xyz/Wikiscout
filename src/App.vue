<template>
  <div id="app">
    <top-header></top-header>
    <main>
      <mapbox></mapbox>
      <router-view name="layer"></router-view>
    </main>
  </div>
</template>

<script>
  import TopHeader from './components/TopHeader';
  import Mapbox from './components/Mapbox';

  export default {
    name: 'app',
    components: {
      TopHeader,
      Mapbox,
    },
  };
</script>

<style lang="less">
  @import "./assets/less/wikiscout.less";
</style>
