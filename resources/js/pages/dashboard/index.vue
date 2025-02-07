<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'
import { useCookie } from '@/@core/composable/useCookie'

definePage({
  meta: {
    action: 'read',
    subject: 'dashboard',
  },
})

const token = useCookie('userToken').value
const userToken = useCookie('userData').value
const userRole = userToken.role

const stats = ref([])
const chartCanvas = ref(null)
const chartCanvas1 = ref(null)
const chartCanvas2 = ref(null)
const chartCanvas3 = ref(null)
const chartCanvas4 = ref(null)
const chartCanvas5 = ref(null)

const chartCanvasAgence = ref(null)

let chart = null 
let chart1 = null; // Pour stocker l'instance du graphique 1
let chart2 = null;// Pour stocker l'instance du graphique
let chart3 = null;// Pour stocker l'instance du graphique
let chart4 = null;// Pour stocker l'instance du graphique
let chart5 = null;// Pour stocker l'instance du graphique
let chartAgence = null;// Pour stocker l'instance du graphique
const startDate = ref(null)
const endDate = ref(null)
const filterOptions = ['Jour', 'Semaine', 'Mois', 'Année']
const filter = ref('Mois') // Valeur par défaut

const cartesParAgency = computed(() => stats.value.cartes_par_agence || [])
const cartesVenduesParAgency = computed(() => stats.value.cartes_vendues_par_agence || [])
const statistiqueBessieux = computed(() => stats.value.test || [])
const statistiqueNzeng = computed(() => stats.value.test1 || [])
const statistiqueLouis = computed(() => stats.value.test2 || [])
const stock = computed(()=>stats.value.stock)

const total_stock_initial = computed(()=>stats.value.total_stock_initial)
const vendues = computed(()=>stats.value.sales)

const montant = computed(() =>parseInt(stats.value.montant_vendu_carte));

const cartes_vendues = computed(() => stats.value.nbre_total_vendu)
const cartes_vendues_hp = computed(() => stats.value.nrb_cartes_sale_hpack)
const profit = computed(() => stats.value.benefices)
const taux_marge = computed(() => stats.value.taux_marge)

//Profil chef d'agence
let stockAgence;
let cartesVendueAgence;
let montantVenduAgence;
let ventesAgence;
if(userRole == 'agency_head'){
stockAgence = computed(() => stats.value.stok_agence)
cartesVendueAgence = computed(() => stats.value.cartes_vendu_agence)
montantVenduAgence = computed(() => stats.value.montant_vendu_agence)
ventesAgence = computed(()=> stats.value.ventes_agences || [])
}
function getStats() {
  axios.get('http://localhost:8000/api/stats', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    params: { 
      start_date: startDate.value, 
      end_date: endDate.value,
      // filter: filter.value
    },
  })
    .then(response => {
      stats.value = response.data
      updateChart() // Mettre à jour le graphique une fois les données reçues
    })
    .catch(error => {
      console.error(error)
    })
}



function updateChart() {

// Détruire les graphiques existants s'ils existent
if(userRole == 'marketing_manager'){
  if (chart) {
    chart.destroy()
    chart = null
  }
  
  const ctx = chartCanvas.value.getContext('2d')
  const ctx1 = chartCanvas1.value.getContext('2d')
  const ctx2 = chartCanvas2.value.getContext('2d')
  const ctx3 = chartCanvas3.value.getContext('2d')
  const ctx4 = chartCanvas4.value.getContext('2d')
  // Créer le graphique pour cartes par agence
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cartesParAgency.value.map(stat => stat.agency_name),
      datasets: [
        {
          label: 'Répartition des cartes par agences',
          data: cartesParAgency.value.map(stat => stat.total),
          backgroundColor: ['#9e9d9b'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  })

  // Créer le graphique pour cartes vendues par agence
  if (chart1) {
    chart1.destroy()
    chart1 = null
  }
  chart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: cartesVenduesParAgency.value.map(stat => stat.agence),
      datasets: [
        {
          label: 'Montant des cartes vendues par agences',
          data: cartesVenduesParAgency.value.map(stat => stat.montant),
          backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  })

  // Créer le graphique pour montant vendu par l'agence
  if (chart2) {
    chart2.destroy()
    chart2 = null
  }
  chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: statistiqueBessieux.value.map(stat => {
        let label;
        const [year, month] = stat.month.split('-');
        switch (filter.value) {
          case 'Jour':
            label = new Date(stat.sale_date).toLocaleDateString();
            break;
          case 'Semaine':
            label = `Semaine ${getWeekNumber(new Date(stat.sale_date))}`;
            break;
          case 'Mois':
            label = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
            break;
          case 'Année':
            label = year;
            break;
        }
        return label;
      }),
      datasets: [
        {
          label: "Montant vendu par l'agence Bessieux",
          data: statistiqueBessieux.value.map(stat => stat.mt_vendue),
          backgroundColor: ['#3498db'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  })
   if (chart3) {
    chart3.destroy()
    chart3 = null
  }
  chart3 = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: statistiqueNzeng.value.map(stat => {
        const [year, month] = stat.month.split('-'); // Sépare "2025-01" en ["2025", "01"]
        return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
      }),
      datasets: [
        {
          label: "Montant vendu par l'agence Nzeng-Ayong",
          data: statistiqueNzeng.value.map(stat => stat.mt_vendue),
          backgroundColor: ['#eb3434'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  })
  if (chart4) {
    chart4.destroy()
    chart4 = null

  }
    function getWeekNumber(d) {
      const oneJan = new Date(d.getFullYear(), 0, 1);
      const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
      return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
    }
    function groupByPeriod(statistiqueLouis, filter) {
        const groupedData = {};

        statistiqueLouis.forEach(stat => {
            if (!stat.sale_date || !stat.mt_vendue) return;

            const saleDate = new Date(stat.sale_date);
            let key = "";

            switch (filter) {
                case 'Jour':
                    key = saleDate.toLocaleDateString('fr-FR'); // Format français
                    break;
                case 'Semaine':
                    key = `Semaine ${getWeekNumber(saleDate)}`;
                    break;
                case 'Mois':
                    key = saleDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
                    break;
                case 'Année':
                    key = saleDate.getFullYear().toString();
                    break;
            }

            // Cumule les montants vendus
            const montant = parseFloat(stat.mt_vendue) || 0;
            if (!groupedData[key]) {
                groupedData[key] = 0;
            }
            groupedData[key] += montant;
        });

        return groupedData;
    }
    const groupedStats = groupByPeriod(statistiqueLouis.value, filter.value);
    const labels = Object.keys(groupedStats);
    const values = Object.values(groupedStats);
    // console.log("value",values);

    chart4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: labels, // Labels uniques (Jour, Semaine, Mois, Année)
        datasets: [
            {
                label: "Montant vendu par l'agence Louis",
                data: values, // Montants cumulés
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                borderWidth: 2,
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    },
});
}
 
function getWeekNumber(d) {
      const oneJan = new Date(d.getFullYear(), 0, 1);
      const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
      return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
    }
    function groupByPeriod(statistiqueLouis, filter) {
        const groupedData = {};

        statistiqueLouis.forEach(stat => {
            if (!stat.sale_date || !stat.mt_vendue) return;

            const saleDate = new Date(stat.sale_date);
            let key = "";

            switch (filter) {
                case 'Jour':
                    key = saleDate.toLocaleDateString('fr-FR'); // Format français
                    break;
                case 'Semaine':
                    key = `Semaine ${getWeekNumber(saleDate)}`;
                    break;
                case 'Mois':
                    key = saleDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
                    break;
                case 'Année':
                    key = saleDate.getFullYear().toString();
                    break;
            }

            // Cumule les montants vendus
            const montant = parseFloat(stat.mt_vendue) || 0;
            if (!groupedData[key]) {
                groupedData[key] = 0;
            }
            groupedData[key] += montant;
        });

        return groupedData;
    }
    const groupedStats = groupByPeriod(ventesAgence.value, filter.value);
    const labels = Object.keys(groupedStats);
    const values = Object.values(groupedStats);
    const ctx5 = chartCanvas5.value.getContext('2d')

if (chart5) {
    chart5.destroy()
    chart5 = null

  }

  chart5 = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: labels, // Labels uniques (Jour, Semaine, Mois, Année)
        datasets: [
            {
                label: "Representation des ventes de l'agence",
                data: values, // Montants cumulés
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                borderWidth: 2,
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    },
});

}



onMounted(() => {
  getStats()
})

watch(filter, (newValue) => {
  getStats();
});
</script>

<template>
  <VCard class="pa-4">
    <h3>Tableau de bord</h3>
    <!-- Aj{out d'un sélecteur pour la période -->
  <p class="text-sm text-end">Date du jour, {{ new Date().toLocaleString('default', {day:'2-digit', month: 'long', year: 'numeric' }) }}  </p>
    <VRow>
      <VCol cols="4">
        <AppDateTimePicker v-model="startDate" 
					 label="Date de debut" placeholder="Ex: 2022-01-01" 
					 class="calendar-date-picker" />
      </VCol>
      <VCol cols="4">
        <AppDateTimePicker v-model="endDate" 
					 label="Date de fin" placeholder="Ex: 2022-01-01" 
					 class="calendar-date-picker" />
      </VCol>
      <VCol cols="4" class="dflex ">
      <button @click="getStats"style="padding:4px;background: red; color:white;margin-top: 2rem; border-radius: 12px;" >Rechercher</button>
      </VCol>
    </VRow>
    <VRow cols="12" class="mt-3 text-black" v-if="userRole == 'marketing_manager'">
        <VCol cols="3" class="">
          <div class="border-sm py-3 px-1" style="border-color: red!important;">
             <p>Stock</p>
             <p class="text-end text-lg">
              {{ stock }}
             </p>
          </div>
        </VCol>
        <VCol cols="3">
          <div class=" border-sm py-3 px-1" style="border-color: blue!important;">
             <p>Total de cartes vendues</p>
             <p class="text-end text-lg">
              {{ cartes_vendues }}
             </p>
          </div>
        </VCol>
        <VCol cols="3">
          <div class="border-sm py-3 px-1" style="border-color: gray!important;">
             <p>Montants des cartes vendues</p>
             <p class="text-end text-lg ">
             {{ montant}} FCFA
             </p>
          </div>
        </VCol>
      <VCol cols="3">
        <div class="border-sm py-3 px-1" style="border-color: black!important;">
             <p>Nbre hors pack</p>
             <p class="text-end text-lg">
              {{ cartes_vendues_hp }}
             </p>
          </div>
      </VCol>
      <VCol cols="3">
        <div class="border-sm py-3 px-1" style="border-color: blue!important;">
             <p>Profit</p>
             <p class="text-end text-lg">
              {{ profit }} FCFA
             </p>
          </div>
      </VCol>
      <VCol cols="3">
        <div class="border-sm py-3 px-1" style="border-color: green!important;">
             <p>Taux de marge</p>
             <p class="text-end text-lg">
              {{ taux_marge }} %
             </p>
          </div>
      </VCol>
    </VRow>
    <VRow v-if="userRole == 'agency_head'">
      <VCol cols="4" class="">
          <div class="border-sm py-3 px-1" style="border-color: red!important;">
             <p>Stock</p>
             <p class="text-end text-lg">
              {{ stockAgence }}
             </p>
          </div>
        </VCol>
        <VCol cols="4" class="">
          <div class="border-sm py-3 px-1" style="border-color: red!important;">
             <p>Cartes vendues</p>
             <p class="text-end text-lg">
              {{ cartesVendueAgence }}
             </p>
          </div>
        </VCol>
        <VCol cols="4" class="">
          <div class="border-sm py-3 px-1" style="border-color: red!important;">
             <p>Montant carte vendu</p>
             <p class="text-end text-lg">
              {{ montantVenduAgence }}
             </p>
          </div>
        </VCol>
        <VCol cols="10">
          <VCol cols="4" v-if="userRole == 'agency_head' ">
      <VSelect v-model="filter" :items="filterOptions" label="Filtrer par" @change="getStats" />
    </VCol>
      <canvas ref="chartCanvas5"></canvas>
      </VCol>
    </VRow>
    <VRow cols="12" class="w-100 mb-3" v-if="userRole == 'marketing_manager'">
      <VCol cols="6">
      <canvas ref="chartCanvas"></canvas>
    </VCol>
    <VCol cols="6">
      <canvas ref="chartCanvas1"></canvas>
    </VCol>
    </VRow>
    <VCol cols="4" v-if="userRole == 'marketing_manager' ">
      <VSelect v-model="filter" :items="filterOptions" label="Filtrer par" @change="getStats" />
    </VCol>
    <VRow cols="12"  v-if="userRole == 'marketing_manager'">
      <VCol cols="6">
      <canvas ref="chartCanvas2"></canvas>
      </VCol>
      <VCol cols="6">
      <canvas ref="chartCanvas3"></canvas>
      </VCol>
      <VCol cols="6">
      <canvas ref="chartCanvas4"></canvas>
      </VCol>
    </VRow>
   
  </VCard>
</template>



