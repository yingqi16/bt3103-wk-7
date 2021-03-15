<template>
    <div>
        <nav>
            <ul>
                <li><router-link to="/" exact>Home</router-link></li>
                <li><router-link to="/orders" exact>Orders</router-link></li>
                <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
            </ul>
        </nav>

        <div>
            <bar-chart></bar-chart>
            <line-chart></line-chart>
        </div>
    </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import LineChart from './charts/LineChart.vue'
export default {
    //name: 'barChart', cant declare
    components: {
        BarChart,
        LineChart
    }
}
</script>