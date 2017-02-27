<template>
  <div id="app">
    <top-header></top-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import TopHeader from './components/TopHeader';

  export default {
    name: 'app',
    components: {
      TopHeader,
    },
  };
</script>

<style lang="less">
  @import "./assets/less/wikiscout.less";
</style>
