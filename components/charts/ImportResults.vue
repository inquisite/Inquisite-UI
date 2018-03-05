<script>
import VueCharts from 'vue-chartjs'

export default {
    extends: VueCharts.Bar,
    props: ['data', 'options'],
    mounted: function() {
        this.renderChart(this.data, this.options)
    }
}
</script>
