<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import { Chart } from 'chart.js/auto';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    onMounted(() => {
      chartInstance = new Chart(chartCanvas.value, {
        type: 'bar', // Changez le type selon vos besoins : 'line', 'pie', etc.
        data: props.chartData,
        options: props.chartOptions,
      });
    });

    onBeforeUnmount(() => {
      if (chartInstance) chartInstance.destroy();
    });

    return { chartCanvas };
  },
};
</script>
