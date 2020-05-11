<template>
  <v-app style="background: #f7f7f7;">
    <v-navigation-drawer
      dark
      app
      absolute
      style="background:#11293f"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar size="40">
            <img src="~/static/logo.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title">SmarTools</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list-item @click="() => '/'">
        <v-list-item-icon>
          <v-icon size="20">fas fa-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="subtitle-2">HOME</v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          @click="item.link"
        >
          <v-list-item-icon>
            <v-icon size=20>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
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

<style scoped>
  .on-hover{
    opacity: 0.6;
  }
</style>

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
            link: `https://gmyankee.tistory.com/category/공지사항/wordcount`,
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