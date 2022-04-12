<template>
    <l-map :zoom="zoom" :center="center" ref="asgMap" class="asg-map">
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
        <l-marker v-for="(flight, f) in getShownFlights" :key="f" :lat-lng="flight.position">
            <l-icon>
                <div>
                    <v-icon size="32px" color="#34495E"
                        :style="{ transform: 'rotate(' + getFlightRotation(flight) + 'deg)' }">mdi-airplane</v-icon>
                </div>
            </l-icon>
            <l-popup>
                <flight-card :flight="flight" :index="f" :flat="true" />
            </l-popup>
        </l-marker>
    </l-map>

</template>
<script>
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from 'vue2-leaflet';
import { mapGetters } from 'vuex'
import FlightCard from './FlightCard.vue'
export default {
    mounted() {
        /*
        Code to get the bounds of the map by lat/lng
        this.$nextTick(() => {
            console.log(this.$refs.asgMap.mapObject.getBounds())
        })
        */
    },
    components: {
        FlightCard,
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LPopup,
    },
    computed: {
        ...mapGetters([
            'getShownFlights'
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
.asg-map {
    height: 100vh;
}
</style>
