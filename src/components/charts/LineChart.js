import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function () {
      return {
          color: ['red', 'lightblue', 'blue', 'pink', 'purple', 'green'],
          datacollection: {
              labels: [], //dates
              datasets: [],
          },
          options: {
              legend: { display: true },
              title: {
                display: true,
                text: 'PSI Twenty Four Hourly (By Region)'
              },
              responsive: true,
              maintainAspectRatio: false
          }
      }
    },
    methods: {
      //labels store timestamp
      //data will store psi values, grouped in their respective region
      fetchItems: function () {
          axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
          .then(response => {
              var counter = 0
              const location = response.data.region_metadata
              location.forEach(region => { 
                  var object = new Object()
                  object['label'] = region.name
                  object['data'] = []
                  object['fill'] = false
                  object['borderColor'] = this.color[counter]
                  this.datacollection.datasets.push(object)
                  counter++
                  //eg: west: []
                  //this.datacollection.datasets[0].data[region.name] = []
              })

              /* const item = response.data.items //all the recordings
              var arr = [] //time: {region: psi}
              item.forEach(info => {
                var obj = new Object()
                obj[info.timestamp] = new Object()
                const psi_24 = info.readings.psi_twenty_four_hourly
                for (const [key, values] of Object.entries(psi_24)) {
                  obj[info.timestamp][key] = values
                }
                arr.push(obj)
              })
              console.log(arr)
              //sort them acc to time
              Object.keys(arr).sort((a,b) => {
                if (a < b) {
                  return -1
                } else {
                  return 1
                }
              })
              //add information
              for (const [key, values] of Object.entries(arr)) { //key = time
                this.datacollection.labels.push(key)
                const length = this.datacollection.datasets.length
                for (const[regionKey, psi] of Object.entries(values)){
                  for (var i = 0; i < length; i++) {
                  const region = this.datacollection.datasets[i]
                  if (region.label === regionKey) {
                      region.data.push(psi)
                    break
                  }
                }}
              } */

              const item = response.data.items
              item.forEach(info => {
                //add the dates
                this.datacollection.labels.push(info.timestamp)
                const psi_24 = info.readings.psi_twenty_four_hourly
                for (const [key, values] of Object.entries(psi_24)) {
                  //object in dataset
                  const length = this.datacollection.datasets.length
                  for (var i = 0; i < length; i++) {
                    const region = this.datacollection.datasets[i]
                    if (region.label === key) {
                        region.data.push(values)
                      break
                    }
                  }
                  //this.datacollection.datasets[0].data[key].push(values)
                }
              }) 
              
              this.renderChart(this.datacollection, this.options)
          })
      }
    },
    created () {
      this.fetchItems()
    }
  }
