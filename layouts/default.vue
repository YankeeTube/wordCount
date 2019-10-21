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
        <div
          v-for="item in items"
          :key="item.icon"
          >
          <UpdateLog v-if="item.dialog === true" />
          <v-tooltip bottom v-else>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="linkOpen(item.link)" v-on="on">
                <v-icon>{{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ item.text }}</span>
          </v-tooltip>
        </div>
      </template>
      <UpdateLog v-if="isMobile" />
      <Rbtn v-if="isMobile" />
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
import UpdateLog from '~/components/UpdateLog.vue'
export default {
  components: {
    WordLogo,
    Rbtn,
    UpdateLog
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
      items: [
        {
            icon: 'mdi-update',
            text: '업데이트 로그',
            dialog: true,
        },
        { 
            icon: 'fas fa-blog',
            text: '블로그',
            link: `https://gmyankee.tistory.com`,
        },
        { 
            icon: 'fas fa-cube',
            text: '오버맵',
            link: `https://overmap.me`,
        },
        { 
            icon: 'fas fa-coffee',
            text: '커피 기부',
            link: `https://ko-fi.com/gmyankee`,
        },
        { 
            icon: 'fab fa-ethereum',
            text: '이더리움 기부',
            link: `https://etherdonation.com/d?to=0x219E9F7Eb26f57eC130182d9bFFEc7778FD5545B`,
        },
        { 
            icon: 'fab fa-facebook',
            text: '페이스북 공유',
            link: `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.hostname)}`
        },
      ],
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
    linkOpen(link){
      window.open(link, "_blank")
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