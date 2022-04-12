<template>
    <v-container fill-height fluid>
            <div>Sky<span class="vue-text">Vue</span></div>
            <v-spacer></v-spacer>
            <v-switch class="ma-2" dark inset label="Selected Flights" v-model="switchStatus" />
    </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getFilterStatus'
        ]),
        switchStatus: {
            get() {
                return this.getFilterStatus
            },
            set() {
                this.toggleFilter()
            }
        }
    },
    methods: {
        ...mapActions([
            'toggleFilter'
        ])
    }
}
</script>
<style scoped>
.vue-text {
    font-family: 'Merienda';
    color: green;
}
</style>