import database from '../../firebase.js'
import {Bar} from 'vue-chartjs'
export default {
    extends: Bar,
    data: function() {
        return {
            barColor: ['blue', 'purple', 'green', 'coral', 'red', 'yellow'],
            datacollection: {
                labels: [], 
                datasets: [{
                    label: "count", //label of the values aka count
                    backgroundColor: [],
                    data: []

                }]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: "Total Number of each dish"
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0
                        }
                    }]
                }
            }

        }
    },
    methods: {
        //3 cereal, 4 dry, 3 mapo, 2 pork, 8 prawn, 11 sambal
        fetchItems: function() {
            database.collection('orders').get().then(querySnapShot => {
                var counter = 0
                querySnapShot.forEach(doc => {
                    const document = doc.data()
                    var innerCount = 0 
                    for (const [key, value] of Object.entries(document).sort((a, b) => {
                        if (a < b) {
                            return -1
                        } else {
                            return 1
                        }
                    })) {
                         if (counter === 0) {
                            this.datacollection.labels.push(key)
                            this.datacollection.datasets[counter].data.push(value)
                            this.datacollection.datasets[counter].backgroundColor.push(this.barColor[innerCount])
                            innerCount++
                        } else {
                            const newValue = this.datacollection.datasets[0].data[innerCount] + value
                            this.datacollection.datasets[0].data.splice(innerCount, 1, newValue);
                            innerCount++
                        }
                    }
                    counter++  
                }
            )
            }).then(() => this.renderChart(this.datacollection, this.options))
        },
    },
    created() {
        this.fetchItems()
    },
}
