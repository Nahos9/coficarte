<!-- eslint-disable camelcase -->

<script setup>
definePage({
	meta: {
		action: 'read' || 'historical',
		subject: 'credit-card',
	},
})
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { useCookie } from '@/@core/composable/useCookie'
import { $api } from '@/utils/api';
import { ref } from 'vue';
import axios from 'axios';


const searchQuery = ref('')
const connectedUser = useCookie('userData').value
const loadings = ref([])
const itemsPerPage = ref(8)
const page = ref(1)
const selectedItemId = ref(0)
const isActionDialogVisible = ref(false)
const actionTitle = ref("")
const actionText = ref("")
const actionButtonText = ref("")
const actionFunction = ref()
const actionComment = ref("")
const commentRetour = ref("")
const commentPresence = ref(false)
const returnPresence = ref(false)
const possessorIdFilter = ref(null)
const motif = ref("")
const possessorID= ref(null)
const headers = [
	{
		title: 'Numéro de carte',
		key: 'card_number_fr',
	}, {
		title: 'Prix de vente',
		key: 'price_fr',
	},
	{
		title: 'Reference de la facture',
		key: 'invoice_reference'
	},
	{
		title: 'Possesseur',
		key: 'possessor.name'
	},
	{
		title: 'Statut',
		key: 'status_fr'
	},
	{
		title: 'Expiration',
		key: 'expiration_per_centage'
	},
  {
    title: 'Commentaire retour',
    key: 'comment_retour',
    sortable: false,
    // On n'affiche la colonne que si comment_retour n'est pas null et etat_validation est false
    show: (item) => item.comment_retour !== null && !item.etat_validation
  },
  {
    title:'Etat',
    key:'etat'
  },
	{
		title: 'Actions',
		key: 'actions',
		sortable: false,
	},
]
const {
	data: creditCardListData,
	execute: fetchcreditCard,
} = await useApi(createUrl('/credit-card', {
	query: {
		search: searchQuery,
		page: page,
		possessor_id: possessorIdFilter,
		with_possessor: 'true',
		status: 'owned',
		order_by_desc: 'updated_at-id'
	},
}))

const load = i => {
	loadings.value[i] = true
	setTimeout(() => {
		loadings.value[i] = false
	}, 1000)
}

const updateOptions = options => {
	page.value = options.page
}


const apiDelete = async id => {
	const response = await $api(`credit-card/${id}`, { method: 'DELETE' })
	await fetchcreditCard()
	actionComment.value = ""
	snackbarMessage.value = ""
	snackbarMessage.value = response.messages.creditCard
	isSnackbarScrollReverseVisible.value = true
}

const {
	data: possessorListData,
	execute: fetchPossessor,
} = await useApi(createUrl('/user', {
	query: {
		paginate: 'false',
		multi_profile: { 'marketing_manager': "rc-mm-ah", "agency_head": "mm-rc-ah", "responsible_for_customer": "mm-rc-ah" }[connectedUser.role]
	},
}))
const possessorList = computed(() => possessorListData.value.data)

const creditCardList = computed(() => creditCardListData.value.data)

const totalcreditCard = computed(() => creditCardListData.value.total)
const lastPage = computed(() => creditCardListData.value.last_page)
// Math.min(Math.ceil(totalcreditCard / itemsPerPage), 5)
const isSnackbarScrollReverseVisible = ref(false)
const snackbarMessage = ref("")
const snackbarCollor = ref("success")
const token = useCookie('userToken').value;


function handleReturn(){
  axios.post("https://coficartega.cofinaonline.com/api/credit-card/return-credit-card", {
    possessor_id:possessorID.value,
    credit_card_id:selectedItemId.value,
    motif:motif.value,
    comment_retour:actionComment.value
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    if(res){
      fetchcreditCard()
    }
  }).catch(error=>console.log(error))
}
function apiValidate(){
  axios.post("https://coficartega.cofinaonline.com/api/credit-card/validate-return-credit-card",{
    credit_card_id:selectedItemId.value,
  },{
    headers:{
      'Authorization': `Bearer ${token}`
    }
  }).then(res=>{
    if(res){
      fetchcreditCard()

    }
  }).catch(error=>console.log(error))
}
</script>

<template>
	<div>
		<!-- 👉 widgets -->
		<!-- 👉 credit-cards -->
  
		<VCard title="Filtres" class="mb-6">
			<VCardText>
				<VRow>
					<VCol cols="12" sm="4">
						<AppAutocomplete v-model="possessorIdFilter" placeholder="Possesseur" item-title="name"
							item-value="id" :items="possessorList" clearable clear-icon="tabler-x" />
					</VCol>
				</VRow>

				<VDivider class="my-4" />

			</VCardText>
			<div class="d-flex flex-wrap gap-4 mx-5">
				<div class="d-flex align-center">
					<!-- 👉 Search  -->
					<AppTextField v-model="searchQuery" placeholder="Rechercher une carte" density="compact"
						style="inline-size: 300px;" class="me-3" />
				</div>

				<VSpacer />
				<div class="d-flex gap-4 flex-wrap align-center">
					<!-- 👉 Export button -->
					<VBtn variant="tonal" color="secondary" prepend-icon="tabler-upload">
						Export
					</VBtn>

					<VBtn v-if="$can('create', 'credit-card')" color="primary" prepend-icon="tabler-plus"
						:to="{ name: 'credit-card-add' }">
						Ajouter
					</VBtn>
					<VBtn v-if="$can('update-price', 'credit-card')" color="primary" prepend-icon="tabler-coin"
						:to="{ name: 'credit-card-update-price' }">
						Modifier Prix
					</VBtn>
					<VBtn :loading="loadings[3]" :disabled="loadings[3]" prepend-icon="tabler-refresh"
						@click="fetchcreditCard(); fetchPossessor(); load(3)">
						Recharger
						<template #loader>
							<span class="custom-loader">
								<VIcon icon="tabler-refresh" />
							</span>
						</template>
					</VBtn>
				</div>
			</div>

			<VDivider class="mt-4" />


			<!-- 👉 Datatable  -->
			<VDataTableServer v-model:items-per-page="itemsPerPage" v-model:page="page" :headers="headers"
				:items="creditCardList" :items-length="totalcreditCard" class="text-no-wrap"
				@update:options="updateOptions">
				<!-- Actions -->
				<template #item.card_number_fr="{ item }">
					<VAvatar variant="tonal" color="error" class="me-4" size="40">
						<VIcon icon="tabler-credit-card" size="28" />
					</VAvatar>
					<div class="text-link text-base font-weight-medium d-inline-block">
						{{ item.card_number_fr }}
					</div>
				</template>

				<template #item.status_fr="{ item }">
					<VChip class="ma-2"
						:color="{ 'En vente': 'success', 'Au siège': 'secondary', 'En agence': 'primary' }[item.status_fr]"
						label>
						<v-icon
							:icon="{ 'En vente': 'tabler-shopping-bag', 'Au siège': 'tabler-tower', 'En agence': 'tabler-building' }[item.status_fr]"
							start></v-icon>
						{{ item.status_fr }}
					</VChip>
				</template>

				<template #item.expiration_per_centage="{ item }">
					<div class="d-flex align-center gap-x-4" style="min-inline-size: 240px;">
						<div class="w-75">
							<VProgressLinear :model-value="item.expiration_per_centage" rounded
								:color="item.expiration_per_centage < 100 ? 'success' : 'error'" :height="8" />
						</div>
						<div class="w-25">
							{{ item.expiration_date_fr }}
						</div>
					</div>
				</template>
        <template #item.etat="{ item }">
					<div class="">
						<VChip class="ma-2"
							:color="{ 'Endommage': 'error', 'Non vendu': 'warning', 'Bon': 'success' }[item.etat]"
							label>
							<v-icon
								:icon="{ 'Endommage': 'tabler-alert-triangle', 'Non vendu': 'tabler-alert-circle', 'Bon': 'tabler-check' }[item.etat]"
								start>
							</v-icon>
							{{ item.etat }}
						</VChip>
						<div class="w-25">
							<!-- {{ item.etat }} -->
						</div>
					</div>
				</template>

				<template #item.actions="{ item }">
					<div class="text-center">
						<div>
							<IconBtn
								v-if="$can('read', 'credit-card') || $can('historical', 'credit-card') || $can('update', 'credit-card')"
								:to="{ name: 'credit-card-id', params: { id: item.id } }">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Details
								</VTooltip>
								<VIcon icon=" tabler-eye" />
							</IconBtn>
              <IconBtn :cardId="item.id"
								v-if="$can('read', 'credit-card') || $can('historical', 'credit-card') || $can('update', 'credit-card')"
								@click="selectedItemId = item.id; actionTitle = 'Retourner la carte';
								actionText = 'Motif du retour de la carte'; 
								actionFunction = handleReturn;
								actionButtonText = 'Retourner';
								returnPresence = true;
								isActionDialogVisible = true;">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Retourner
								</VTooltip>
								<VIcon icon=" tabler-transfer-in" />
							</IconBtn>
							<IconBtn v-if="$can('update', 'credit-card')"
								:to="{ name: 'credit-card-edit-id', params: { id: item.id } }"
								:disabled="item.status == 'validated'">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Modifier
								</VTooltip>
								<VIcon icon="tabler-edit" />
							</IconBtn>
						</div>
            <VDivider />
						<div v-if="$can('delete', 'credit-card')">
							<IconBtn v-if="$can('delete', 'credit-card')" :disabled="item.status == 'validated'" @click=" selectedItemId = item.id; actionTitle = 'Supprimer la carte',
								actionText = 'Voulez vous vraiment supprimer cette coficarte?', actionFunction = apiDelete;
							  actionButtonText = 'Supprimer'; commentPresence = false; isActionDialogVisible = true;">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Supprimer
								</VTooltip>
								<VIcon icon="tabler-trash" color='error' />
							</IconBtn>
              <IconBtn v-if="$can('validate', 'credit-card') && connectedUser.role === 'marketing_manager' && ['Endommage', 'Non vendu'].includes(item.etat) && !item.etat_validation" 
                @click="selectedItemId = item.id; actionTitle = 'Valider le retour',
                actionText = 'Voulez vous vraiment valider ce retour de carte?', actionFunction = apiValidate;
                actionButtonText = 'Valider'; commentPresence = false; isActionDialogVisible = true;">
                <VTooltip activator="parent" transition="scroll-x-transition" location="end">Valider le retour
                </VTooltip>
                <VIcon icon="tabler-check" color='success' />
              </IconBtn>
              <!-- <IconBtn v-if="$can('validate', 'credit-card')" :disabled="item.status == 'validated'" @click=" selectedItemId = item.id; actionTitle = 'Supprimer la carte',
								actionText = 'Voulez vous vraiment valider ce retour de carte?', actionFunction = apiDelete;
							  actionButtonText = 'Valider'; commentPresence = false; isActionDialogVisible = true;">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Valider
								</VTooltip>
								<VIcon icon="tabler-check" color='success' />
							</IconBtn> -->
						</div>
					</div>
				</template>

				<template #bottom>
					<VDivider />

					<div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
						<p class="text-sm text-medium-emphasis mb-0">
							{{ paginationMeta({ page, itemsPerPage }, totalcreditCard) }}
						</p>

						<VPagination v-model="page" :length="lastPage"
							:total-visible="$vuetify.display.xs ? 1 : Math.min(lastPage, 5)">
							<template #prev="slotProps">
								<VBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
									<VIcon start icon="tabler-arrow-left" />
									Précedent
								</VBtn>
							</template>

							<template #next="slotProps">
								<VBtn variant="tonal" color="default" v-bind="slotProps" :icon="false">
									Suivant
									<VIcon end icon="tabler-arrow-right" />
								</VBtn>
							</template>
						</VPagination>
					</div>
				</template>
			</VDataTableServer>
		</VCard>


		<VDialog v-model="isActionDialogVisible" class="v-dialog-sm">
			<!-- Dialog close btn -->
			<DialogCloseBtn @click="isActionDialogVisible = !isActionDialogVisible" />

			<!-- Dialog De suppression -->
			<VCard :title="actionTitle">
				<VCardText>
					{{ actionText }}
          <AppSelect v-if="returnPresence" class="mt-3" :items="['Endommage', 'Non vendu']" v-model="motif" label="Motif" />
          <AppSelect 
            v-if="returnPresence" 
            class="mt-3" 
            :items="possessorList"
            item-title="name"
            item-value="id" 
            label="Nouveau possesseur"
            v-model="possessorID"
            placeholder="Sélectionner un possesseur"
          />
          <AppTextarea v-if="commentPresence ||returnPresence " class="mt-3" v-model="actionComment" label="Commentaire"
						placeholder="Ex: RAS" />
          <!-- <AppSelect v-if="commentPresence" class="mt-3" :items="possessorList" /> -->
          <!-- <AppSelect v-if="commentPresence"  class="mt-3" /> -->
				</VCardText>

				<VCardText class="d-flex justify-end gap-3 flex-wrap">
					<VBtn color="secondary" variant="tonal" @click="isActionDialogVisible = false">
						Annuler
					</VBtn>
					<VBtn @click="actionFunction(selectedItemId); isActionDialogVisible = false">
						{{ actionButtonText }}
					</VBtn>
				</VCardText>
			</VCard>
		</VDialog>
		<VSnackbar v-model="isSnackbarScrollReverseVisible" transition="scale-transition" location="top end"
			:color="snackbarCollor">
			{{ snackbarMessage }}
		</VSnackbar>
	</div>
</template>

<style lang="scss" scoped>
.custom-loader {
	display: flex;
	animation: loader 1s infinite;
}

@keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

.full-width-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
