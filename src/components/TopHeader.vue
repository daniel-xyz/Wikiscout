<template>
  <header>
    <div id="back-navigation" v-if="showBack" @click="back">
      <div class="back-icon"></div>
      <span>{{ backText }}</span>
    </div>

    <img id="logo" v-if="!showBack" src='data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%22203%22%20height%3D%2243%22%20viewBox%3D%220%200%20203%2043%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Ctitle%3ELogo%3C%2Ftitle%3E%3Cdefs%3E%3Cfilter%20x%3D%22-50%25%22%20y%3D%22-50%25%22%20width%3D%22200%25%22%20height%3D%22200%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22a%22%3E%3CfeOffset%20dy%3D%221%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%221%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200.482352941%200%200%200%200%200.482352941%200%200%200%200%200.482352941%200%200%200%200.5%200%22%20in%3D%22shadowBlurOuter1%22%20result%3D%22shadowMatrixOuter1%22%2F%3E%3CfeMerge%3E%3CfeMergeNode%20in%3D%22shadowMatrixOuter1%22%2F%3E%3CfeMergeNode%20in%3D%22SourceGraphic%22%2F%3E%3C%2FfeMerge%3E%3C%2Ffilter%3E%3Cpath%20id%3D%22b%22%20d%3D%22M14.913%2032.853H0V.097h29.825v32.756z%22%2F%3E%3Ctext%20id%3D%22e%22%20font-family%3D%22Avenir-Heavy%2C%20Avenir%22%20font-size%3D%2228%22%20font-weight%3D%22600%22%3E%3Ctspan%20x%3D%2244.452%22%20y%3D%2228%22%20fill%3D%22%23B8E986%22%3Ewiki%3C%2Ftspan%3E%20%3Ctspan%20x%3D%2296.336%22%20y%3D%2228%22%20fill%3D%22%23FFF%22%3Escout%3C%2Ftspan%3E%3C%2Ftext%3E%3Cfilter%20x%3D%22-50%25%22%20y%3D%22-50%25%22%20width%3D%22200%25%22%20height%3D%22200%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22d%22%3E%3CfeOffset%20dy%3D%221%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowOffsetOuter1%22%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%221%22%20in%3D%22shadowOffsetOuter1%22%20result%3D%22shadowBlurOuter1%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200.482352941%200%200%200%200%200.482352941%200%200%200%200%200.482352941%200%200%200%200.5%200%22%20in%3D%22shadowBlurOuter1%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M-4-4h375.003v50H-4z%22%20fill%3D%22%2310CDFF%22%2F%3E%3Cg%20transform%3D%22translate(10%205.06)%22%20filter%3D%22url(%23a)%22%3E%3Cmask%20id%3D%22c%22%20fill%3D%22%23fff%22%3E%3Cuse%20xlink%3Ahref%3D%22%23b%22%2F%3E%3C%2Fmask%3E%3Cpath%20d%3D%22M29.825%2012.33c0%203.848-1.53%207.345-4.027%209.946.002%200%20.005-.003.007-.005l-.017.018c-.224.232-.457.457-.696.675l-10.18%209.89-10.39-10.085C1.734%2020.124%200%2016.425%200%2012.33%200%207.658%202.26%203.498%205.77.836%205.9.72%206.04.62%206.19.53c.42-.253.917-.4%201.45-.4%201.537%200%202.784%201.216%202.784%202.717%200%20.773-.332%201.47-.864%201.965-.167.156-.354.292-.557.404-2.18%201.696-3.577%204.307-3.577%207.238%200%20.496.04.983.118%201.458.278%201.71%201.036%203.265%202.136%204.53.116.132.236.262.36.39.123.125%206.873%206.667%206.873%206.667s6.72-6.512%206.872-6.67c.124-.126.244-.256.36-.39%201.1-1.263%201.86-2.817%202.136-4.528.078-.475.12-.962.12-1.458%200-2.942-1.41-5.562-3.602-7.257-.124-.096-.25-.19-.38-.28-.15-.106-.293-.222-.412-.36-.45-.528-.702-1.223-.637-1.977C19.48%201.316%2020.5.277%2021.79.118c.6-.073%201.164.042%201.646.29.085.043.165.095.242.15.12.086.24.175.36.264%203.52%202.662%205.787%206.827%205.787%2011.51zm-17.727%203.036c-.083-.07-.162-.146-.24-.223-.736-.745-1.19-1.76-1.19-2.877%200-2.288%201.9-4.143%204.245-4.143s4.246%201.855%204.246%204.143c0%201.118-.456%202.132-1.194%202.877-.057.057-.115.113-.175.167-.123.085-.24.18-.35.284-.706.512-1.58.815-2.527.815-.987%200-1.895-.33-2.616-.882-.064-.057-.13-.11-.2-.162z%22%20fill%3D%22%23FEFEFE%22%20mask%3D%22url(%23c)%22%2F%3E%3C%2Fg%3E%3Cg%20fill%3D%22%23B8E986%22%20transform%3D%22translate(4%201)%22%3E%3Cuse%20filter%3D%22url(%23d)%22%20xlink%3Ahref%3D%22%23e%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23e%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'>
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
