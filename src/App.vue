<template>
  <v-app>
    <v-main>
      <div id="header">
        Sky<span class="vue-text">Vue</span>
      </div>
      <div id="page">
        <div id="sideBar">
          <div v-if="getSelectedFlights.length > 0" class="ma-2">
            <flight-card 
              v-for="(flight, i) in getSelectedFlights" 
              :key="i" 
              :flight="flight" 
              :index="i"
              :flat="false"
            />
          </div>
          <div v-else class="ma-2">
            <i>No flights have been selected yet. Click on a flight to get started!</i>
          </div>
        </div>
        <div id="content">
          <l-map :zoom="zoom" style="height:100vh" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="markerLatLng">
              <l-icon>
                <div>
                  <v-icon size="64px" color="#41B883">mdi-circle-slice-8</v-icon>
                </div>
              </l-icon>
              <l-popup>
                It's Lafayette!
              </l-popup>
            </l-marker>
            <l-marker v-for="(flight, f) in getAllFlights" :key="f" :lat-lng="flight.position">
              <l-icon>
                <div>
                  <v-icon size="32px" color="#34495E" :style="{ transform: 'rotate(' + getFlightRotation(flight) + 'deg)'}">mdi-airplane</v-icon>
                </div>
              </l-icon>
              <l-popup>
                <flight-card 
                  :flight="flight" 
                  :index="f"
                  :flat="true"
                />
              </l-popup>
            </l-marker>
          </l-map>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from 'vue2-leaflet';
import FlightCard from './components/FlightCard.vue';
import { mapGetters } from 'vuex'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    FlightCard,
  },
  created() {
    this.$store.dispatch('initializeApp')
  },
  computed: {
    ...mapGetters([
      'getAllFlights',
      'getSelectedFlights',
    ])
  },
  methods: {
    getFlightRotation(flight) {
      return (Math.round(flight[10]) - 45).toString()
    }
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [30.2241, -92.0198],
      markerLatLng: [30.2241, -92.0198],
      popupOptions: {
        maxWidth: "auto",
      }
    };
  }
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
  height: 80px;
  display: flex;
  align-items: center;
  background: linear-gradient(#444444, #333333);
  color: #bbbbbb;

  font-family: "Roboto Mono";
  font-size: 64px;
}

#headerContent {
  margin-left: 10px;
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

