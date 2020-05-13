<template>
  <v-app style="background: #f7f7f7;">
    <v-navigation-drawer
      dark
      app
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

      <v-list-item href="/">
        <v-list-item-icon>
          <v-icon size="20">fas fa-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="subtitle-2">HOME</v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="menu in menus"
          :key="menu.name"
          :href="menu.link"
        >

          <v-list-item-icon ><v-icon size=20>{{ menu.icon }}</v-icon></v-list-item-icon>
          <v-list-item-title>{{ menu.name }}</v-list-item-title>
        </v-list-item>
        
        <v-list-group
          v-for="group in groups"
          :key="group.name"
          prepend-icon="mdi-exit-run"
          color="white"
          value="true"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ group.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item dense
            v-for="subMenu in group.items"
            :key="subMenu.name"
            @click="subMenu.link"
          >
            <v-list-item-icon><v-icon>{{ subMenu.icon }}</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ subMenu.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <AppBar />
    
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
import AppBar from '~/components/AppBar.vue'
export default {
  components: {
    WordLogo,
    Rbtn,
    UpdateLog,
    AppBar
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
      menus: [
        {
          icon: 'mdi-numeric-9-box-multiple',
          name: '글자 수 세기',
          link: '/wordcount',
        },
      ],
      groups: [
        {
          name: 'Encode / Decode',
          items: [
            {
              icon: 'mdi-link-lock',
              name: 'URL',
              link: '/escape'
            },
            {
              icon: 'mdi-format-bold',
              name: 'Base64',
              link: '/base64'
            },
            {
              icon: 'mdi-unicode',
              name: 'Unicode',
              link: '/unicode'
            },
          ]
        }
      ],
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