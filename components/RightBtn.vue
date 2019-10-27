<template>
  <div class="text-center">
    <v-menu bottom left>
    <template v-slot:activator="{ on }">
        <v-btn
        dark
        icon
        v-on="on"
        >
        <v-icon color="#000">mdi-dots-horizontal</v-icon>
        </v-btn>
    </template>

    <v-list>
        <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="linkOpen(item.link)"
        class="justify-center"
        >

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" color="#6f7070">
              <v-icon class="justify-center">{{ item.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.text }}</span>
        </v-tooltip>
        </v-list-item>
    </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
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
    }),
    methods: {
      linkOpen(link){
        window.open(link, "_blank")
      }
    }
  }
</script>