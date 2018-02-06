<script>
import VueCharts from 'vue-chartjs'

export default {
    extends: VueCharts.Bar,
    props: ['data', 'options'],
    mounted: function() {
        console.log(this.data);
        this.renderChart(this.data, this.options)
    }
}
</script>
