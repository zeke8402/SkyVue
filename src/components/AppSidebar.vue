<template>
    <div>
        <div v-if="getSelectedFlights.length > 0" class="ma-1">
            <flight-card v-for="(flight, i) in getSelectedFlights" :key="i" :flight="flight" :index="i" :flat="false" />
        </div>
        <div v-else class="ma-2">
            <i>No flights have been selected yet. Click on a flight to get started!</i>
        </div>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
import FlightCard from './FlightCard.vue'
export default {
    components: {
        FlightCard
    },
    computed: {
        ...mapGetters([
            'getSelectedFlights',
        ])
    }

}
</script>
