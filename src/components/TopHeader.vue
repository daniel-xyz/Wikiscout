<template>
  <header>
    <div id="back-navigation" v-if="showBack" @click="back">
      <div class="back-icon"></div>
      <span>{{ backText }}</span>
    </div>
    <img id="logo" v-if="!showBack" src='data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%22122%22%20height%3D%2223%22%20viewBox%3D%220%200%20122%2023%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3Elogo%3C%2Ftitle%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%20font-size%3D%2228%22%20font-family%3D%22Avenir-Heavy%2C%20Avenir%22%20font-weight%3D%22600%22%3E%3Ctext%20fill%3D%22%23B8E986%22%20transform%3D%22translate(0%20-6)%22%3E%3Ctspan%20x%3D%22.452%22%20y%3D%2228%22%3Ewiki%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20fill%3D%22%23FFF%22%20transform%3D%22translate(0%20-6)%22%3E%3Ctspan%20x%3D%2252.336%22%20y%3D%2228%22%3Escout%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%3E%3Ctext%20fill%3D%22%23B8E986%22%20transform%3D%22translate(0%20-6)%22%3E%3Ctspan%20x%3D%22.452%22%20y%3D%2228%22%3Ewiki%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20fill%3D%22%23FFF%22%20transform%3D%22translate(0%20-6)%22%3E%3Ctspan%20x%3D%2252.336%22%20y%3D%2228%22%3Escout%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'>

    <nav id="main-nav">
      <div class="hide-md-and-up menu-toggle-icon" @mouseover="menuExpanded = true" @mouseleave="menuExpanded = false">
        <transition name="fade">
          <ul v-show="menuExpanded">
            <router-link :to="{ path: '/data' }"><li @click="menuExpanded = false">Datenschutz</li></router-link>
            <router-link :to="{ path: '/imprint' }"><li @click="menuExpanded = false">Impressum</li></router-link>
          </ul>
        </transition>
      </div>

      <ul class="hide-sm-and-down">
        <li><router-link :to="{ path: '/data' }">Datenschutz</router-link></li>
        <li><router-link :to="{ path: '/imprint' }">Impressum</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'top-header',
    data () {
      return {
        showBack: false,
        backPath: '',
        backText: '',
        menuExpanded: false,
      };
    },

    methods: {
      back () {
        this.$router.push({ path: this.backPath });
      },
    },

    created () {
      const self = this;

      this.$bus.$on('menuChangeRequest', (options) => {
        self.showBack = options.showBack;
        self.backPath = options.backPath;
        self.backText = options.backText;
      });
    },

    destroyed () {
      this.$bus.$off('menuChangeRequest');
    },
  };
</script>
