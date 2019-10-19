import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | wordcount.xyz',
    title: '워드 카운트' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'gmyankee' },
      { name: 'keywords', content: '글자수, 워드, 카운트, gmyankee, overmap, 오버맵, history, 기록'},
      { hid: 'description', name: 'description', content: '글자수 세기, 스티커 노트,  스티키 노트, 글자 수 세고 기록해보실? 저장도 가능합니다. 사x인, 인크*트 보다 좋음! 맞춤법은 저작권 위반!' },
      // Open Graph
      { name: 'og:title', content: '워드 카운트'},
      { name: 'og:description', content: '글자수 세기, 스티커 노트,  스티키 노트, 글자 수 세고 기록해보실? 저장도 가능합니다. 사x인, 인크*트 보다 좋음! 맞춤법은 저작권 위반!'},
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://wordcount.xyz' },
      { name: 'og:image', content: 'https://wordcount.xyz/favicon.ico' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: '워드 카운트' },
      { name: 'twitter:description', content: '글자수 세기, 스티커 노트,  스티키 노트, 글자 수 세고 기록해보실? 저장도 가능합니다. 사x인, 인크*트 보다 좋음! 맞춤법은 저작권 위반!' },
      { name: 'twitter:image', content: 'https://wordcount.xyz/favicon.ico' },
      { name: 'twitter:image:alt', content: 'Logo' },
      
      // Google Search Console
      { hid: 'google-site-verification',  name: 'google-site-verification', content: 'BCHdmMc31-gLwNWdk2Vh9k2a2t1lkYW6WqTUoB6_8So'},
      // Naver Web Master
      { hid: 'naver-site-verification',  name: 'naver-site-verification', content: 'c8b124dfb941c3bfb9c1c2124aefa7f50749f2c5'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/fontawesome.js",
    { src: '~plugins/ga.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/sitemap',
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-9888197614457245'
    }]
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  sitemap: {
    hostname: 'https://wordcount.xyz',
    path: '/sitemap.xml',
    gzip: true,
    generate: false,
    cacheTime: 1000 * 60 * 15,  // 15m
    routes: [
      {
        url: '/',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date(),
      }
    ]
  }
}
