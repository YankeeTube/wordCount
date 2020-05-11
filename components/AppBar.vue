<template>
    <v-app-bar
      dense
      app
      color="#f7f7f7"
      class="mx-2"
      text-color="secondary"
      elevate-on-scroll
      scroll-threshold
    >
        <v-toolbar-title class="subtitle-2" color="secondary">
            <nuxt-link :to="to">{{ breadCrumb }} <v-icon class="mx-1" color="secondary">fas fa-caret-down</v-icon></nuxt-link>
        </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>

        <v-list>
            <v-list-item
                v-for="item in apps"
                :key="item.text"
                @click="item.link"
            >
            <v-list-item-icon>
                <v-icon size=20 class="mx-auto">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
</template>

<style scoped>
    a {  text-decoration: none;}
</style>

<script>
export default {
    props: {
        breadCrumb: {
            type: String,
            default: 'HOME',
        },
        to: {
            type: String,
            default: '/',
        }
    },
    data: () => ({
        apps: [
            { 
                icon: 'fab fa-blogger',
                title: '개발자 노트',
                link: `https://gmyankee.tistory.com/category/공지사항/wordcount`,
            },
            { 
                icon: 'fas fa-cube',
                title: '오버맵',
                link: `https://overmap.me`,
            },
            { 
                icon: 'fas fa-coffee',
                title: '커피 기부',
                link: `https://ko-fi.com/gmyankee`,
            },
            { 
                icon: 'fab fa-ethereum',
                title: '이더리움 기부',
                link: `https://etherdonation.com/d?to=0x219E9F7Eb26f57eC130182d9bFFEc7778FD5545B`,
            },
            { 
                icon: 'fab fa-facebook',
                title: '페이스북 공유',
                link: `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.hostname)}`
            },
        ]
    })
}
</script>