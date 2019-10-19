<template>
  <v-layout
    column
    justify-center
    align-center
  >
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
