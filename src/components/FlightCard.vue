<template>
    <v-card tile :width="flat ? '350px' : '100%'" :flat="flat">
        <v-card-title class="header">Callsign: {{ flight[1] }}</v-card-title>
        <v-card-text>
            <v-row v-for="key in dataKeys" :key="key" dense no-gutters>
                <v-col cols="6" align="left">
                    {{ keyNames[key] }}:
                </v-col>
                <v-col cols="6" align="right">
                    {{ flight[key] }}
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="!isFlightSelected" color="success" dark @click="addFlightToSelected(index)">
                <div class="d-inline">
                    <v-icon small>mdi-binoculars</v-icon>
                </div>
                <div class="d-inline">
                    WATCH
                </div>
            </v-btn>
            <v-btn v-else color="warning" dark @click="removeFlightFromSelected(flight)">
                <div class="d-inline">
                    <v-icon small>mdi-binoculars</v-icon>
                </div>
                <div class="d-inline">
                    UNWATCH
                </div>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: ['flight', 'index', 'flat'],
    data() {
        return {
            dataKeys: [2, 5, 6, 7, 9],
            keyNames: [
                'ICAO Address',
                'Callsign',
                'Country of Origin',
                'Last Position Time',
                'Last Contact',
                'Longitude',
                'Latitude',
                'Altitude',
                'On Ground',
                'Velocity',
                'True Track',
                'Vertical Rate',
                'Sensors',
                'Geo Altitude',
                'Squawk',
                'SPI',
                'Position Source'
            ],
        }
    },
    computed: {
        ...mapGetters([
            'getSelectedFlightIndexes',
            'getSelectedFlights',
        ]),
        isFlightSelected() {
            return this.getSelectedFlights.includes(this.flight)
        }
    },
    methods: {
        ...mapActions([
            'addFlightToSelected',
            'removeFlightFromSelected',
        ]),
    }
}
</script>
<style scoped>
.header {
    font-family: 'Roboto Mono'
}
</style>
