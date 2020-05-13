<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row class="justify-center">
      <iframe width="728" height="90" allowtransparency="true" src="https://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1056099%7C%5E%7CAdver_M_1046207&mon_rf=REFERRER_URL" frameborder="0" scrolling="no"></iframe>
    </v-row>
      <Words 
        :listen="listen()"
      />
      <TimeLine />
  </v-layout>
</template>

<script>
import Words from '~/components/Words.vue'
import TimeLine from '~/components/Timeline.vue'

export default {
  components: {
    Words,
    TimeLine,
  },
  methods: {
    listen () {
      return this.$store.getters.getLoadData;
    }
  }
}
</script>
<style scoped>
</style>
