<template>
  <div class="chart-container">
    <component 
      :is="chartComponent" 
      v-if="loaded" 
      :data="chartData" 
      :options="options" 
    />
  </div>
</template>

<script setup>
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  Title,
  CategoryScale,
  LinearScale,
  BarElement 
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'
import { ref, computed, onMounted } from 'vue'

// Enregistrer les composants nécessaires
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  Title,
  CategoryScale,
  LinearScale,
  BarElement
)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: 'pie',
  },
})

const loaded = ref(false)

const chartComponent = computed(() => {
  return props.type === 'bar' ? Bar : Pie
})

onMounted(() => {
  loaded.value = true
})
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
