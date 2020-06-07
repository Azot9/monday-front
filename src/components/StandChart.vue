<script>
import { Line } from "vue-chartjs";

export default {
  name: "StandChart",
  extends: Line,
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: this.datasets.map(item => {
          return Object.assign(item, {
            backgroundColor: this.generateBackgroundColor(),
            borderColor: this.generateBorderColor()
          });
        })
      };
    }
  },
  methods: {
    generateBackgroundColor() {
      return `rgba(${Math.random() * 255}, ${Math.random() *
        255}, ${Math.random() * 255}, 0.2)`;
    },
    generateBorderColor() {
      return `rgba(${Math.random() * 255}, ${Math.random() *
        255}, ${Math.random() * 255})`;
    }
  },
  data: () => ({
    labels: ["11:00", "12:00", "13:00", "14:00", "16:00", "17:00"],
    datasets: [
      {
        label: "Температура до модифікації",
        // backgroundColor: "rgba(255, 99, 132, 0.2)",
        // borderColor: "rgb(255, 99, 132)",
        data: [0, 20, 35, 40, 40, 40, 40]
      },
      {
        label: "Температура після модифікації",
        // backgroundColor: "rgba(99, 255, 132, 0.2)",
        // borderColor: "rgb(99, 255, 132)",
        data: [0, 20, 15, 14, 13, 10, 10]
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }),
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style>
canvas {
  height: 600px !important;
  padding: 64px;
}
</style>