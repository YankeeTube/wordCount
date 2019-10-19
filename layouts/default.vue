<template>
  <v-app style="background: #f7f7f7;">
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="#f2f3f4"
      text-color="#6f7070"
      elevation="1"
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-spacer />
      <nuxt-link to="/"><WordLogo /></nuxt-link>
      <v-spacer v-for="n in 6" v-bind:key="n" />
      <template v-if="!isMobile">
        <div class="rt-btn">
          <v-btn icon @click="popSites('https://gmyankee.tistory.com')">
            <v-icon>fas fa-blog</v-icon>
          </v-btn>
          <v-btn icon @click="popSites('https://overmap.me')">
            <v-icon>fas fa-cube</v-icon>
          </v-btn>
          <v-btn icon @click="popSites('https://ko-fi.com/gmyankee')">
            <v-icon>fas fa-coffee</v-icon>
          </v-btn>
          <v-btn icon @click="popSites('https://etherdonation.com/d?to=0x219E9F7Eb26f57eC130182d9bFFEc7778FD5545B')">
            <v-icon>fab fa-ethereum</v-icon>
          </v-btn>
          <v-btn icon @click="popFb">
              <v-icon>fab fa-facebook</v-icon>
          </v-btn>
        </div>
      </template>
      <Rbtn v-else />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
      color="#f2f3f4"
    >
      <span>&copy; 2019 - {{ currentYear }} made by <a href="https://gmyankee.tistory.com" target="_blank">GM yankee</a></span>
    </v-footer>
  </v-app>
</template>

<script>
import WordLogo from '~/components/WordLogo.vue'
import Rbtn from '~/components/RightBtn.vue'
export default {
  components: {
    WordLogo,
    Rbtn
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '워드 카운트',
      currentYear: new Date().getFullYear(),
      isMobile: false,
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    popSites(link){
      window.open(
        link,
        "_blank",
      )
    },
    popFb(){
      window.open(
        `http://www.facebook.com/sharer/sharer.php?u=
      ${encodeURIComponent(window.location.hostname)}`,
      "_blank",
      'width=500,height=600,resizable=yes,scrollbars=yes'
      )
    },
    onResize () {
      this.isMobile = window.innerWidth < 600
    },
  }
}
</script>

<style scoped>
  header a {
    text-decoration: none !important;
    color: #6f7070 !important;
  }

</style>