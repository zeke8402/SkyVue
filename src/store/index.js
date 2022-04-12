import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flightData: [],
    selectedFlights: [], // index of selected flights
    filterSelectedFlights: false,
  },
  getters: {
    getAllFlights(state) {
      return state.flightData
    },
    getShownFlights(state, getters) {
      return (state.filterSelectedFlights) ? getters.getSelectedFlights : state.flightData
    },
    getSelectedFlightIndexes(state) {
      return state.selectedFlights
    },
    getSelectedFlights(state) {
      return state.flightData.filter((flight, index) => {
        return state.selectedFlights.includes(index)
      })
    },
    getTotalFlights(state) {
      return state.flightData.length
    },
    getFilterStatus(state) {
      return state.filterSelectedFlights
    }
  },
  mutations: {
    setFlightData(state, data) {
      state.flightData = data
    },
    insertSelectedFlight(state, index) {
      state.selectedFlights.push(index)
    },
    removeSelectedFlight(state, index) {
      state.selectedFlights.splice(index, 1)
    },
    toggleSelectedFlightFilter(state) {
      state.filterSelectedFlights = !state.filterSelectedFlights
    },
  },
  actions: {
    initializeApp(context) {
      axios.get('https://opensky-network.org/api/states/all?lamin=24.9493&lomin=-125.0011&lamax=49.5904&lomax=-66.9326').then((response) => {
        let newFlights = []
        for(const flight of response.data.states) {
          let position = {
            lat: flight[6],
            lng: flight[5],
          }
          newFlights.push({
            ...flight,
            position: position
          })
        }

        context.commit('setFlightData', newFlights)
      })
    },
    addFlightToSelected(context, index) {
      context.commit('insertSelectedFlight', index)
    },
    removeFlightFromSelected(context, flight) {
      let flightIndex = context.state.selectedFlights.indexOf(flight)
      context.commit('removeSelectedFlight', flightIndex)
    },
    toggleFilter(context) {
      context.commit('toggleSelectedFlightFilter')
    }
  },
  modules: {
  }
})
