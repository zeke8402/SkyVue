<template>
  <v-app>
    <v-main>
      <div id="header">
        <app-header />
      </div>
      <div id="page">
        <div id="sideBar">
          <app-sidebar />
        </div>
        <div id="content">
          <map-area />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import MapArea from './components/MapArea.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AppHeader,
    AppSidebar,
    MapArea,
  },
  created() {
    this.$store.dispatch('initializeApp')
  },
  computed: {
    ...mapGetters([
      'getAllFlights',
      'getShownFlights',
      'getSelectedFlights',
      'getFilterStatus'
    ]),
  },
  methods: {
    ...mapActions([
      'toggleFilter',
    ]),
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Merienda|Roboto+Mono');

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  font-family: Ubuntu;
  background: linear-gradient(#b3ffab, #67fffc);
}

#header {
  height: 100px;
  display: flex;
  background: linear-gradient(#444444, #333333);
  color: #bbbbbb;

  font-family: "Roboto Mono";
  font-size: 64px;
}

#page {
  display: flex;
  height: 100%;
  /* calculate the height. Header is 30px */
}

#sideBar {
  width: 350px;
}

#content {
  background: blue;
  flex: 1 0 auto;
  /* enable grow, disable shrink */
}

.vue-text {
  font-family: 'Merienda';
  color: green;
}
</style>

