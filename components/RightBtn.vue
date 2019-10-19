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
        >
        <v-icon>{{ item.icon }}</v-icon>
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
            link: `https://gmyankee.tistory.com`,
        },
        { 
            icon: 'fas fa-cube',
            link: `https://overmap.me`,
        },
        { 
            icon: 'fas fa-coffee',
            link: `https://ko-fi.com/gmyankee`,
        },
        { 
            icon: 'fab fa-ethereum',
            link: `https://etherdonation.com/d?to=0x219E9F7Eb26f57eC130182d9bFFEc7778FD5545B`,
        },
        { 
            icon: 'fab fa-facebook',
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