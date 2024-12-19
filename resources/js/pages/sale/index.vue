<!-- eslint-disable camelcase -->

<script setup>
definePage({
	meta: {
		action: 'read' || 'historical',
		subject: 'sale',
	},
})
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { $api } from '@/utils/api';
import axios from 'axios';

const searchQuery = ref('')
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
const commentPresence = ref(false)
const sellerIdFilter = ref(null)
const headers = [
	{
		title: 'Numéro de carte',
		key: 'credit_card.card_number_fr',
	}, {
		title: 'Prix de vente',
		key: 'sale_price_fr',
	},
	{
		title: 'Vendeur',
		key: 'seller.name',
	},
	{
		title: 'Date de la vente',
		key: 'sale_date_fr',
	},
	{
		title: 'Acheteur',
		key: 'customer_name'
	},
	{
		title: 'Type de l\'acheteur',
		key: 'customer_type_fr'
	},
	{
		title: 'statut',
		key: 'unlock_status_fr'
	},
	{
		title: 'Actions',
		key: 'actions',
		sortable: false,
	},
]
const {
	data: saleListData,
	execute: fetchsale,
} = await useApi(createUrl('/sale', {
	query: {
		search: searchQuery,
		page: page,
		with_credit_card: 'true',
		with_seller: 'true',
		with_account_type: 'true',
		seller_id: sellerIdFilter
	},
}))

const {
	data: sellerListData,
	execute: fetchSellerList,
} = await useApi(createUrl('/user', {
	query: {
		paginate: 'false',
		// 'relation_filter_in_sales-unlock_status' : 'locked', 
		profile: "responsible_for_customer",
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

const apiUnlock = async id => {
	const response = await $api(`sale/unlock/${id}`, { method: 'PUT' })
	await fetchsale()
	await fetchSellerList()
	actionComment.value = ""
	snackbarMessage.value = ""
	snackbarMessage.value = response.messages.sale
	isSnackbarScrollReverseVisible.value = true
}

const apiDonwloadExcel = async () => {
	downloadFileWithToken(`/api/sale/download/excel`, useCookie('userToken').value, "sales.xlsx")
}

const downloadFileWithToken = (endpoint, token, fileName) => {
	axios({
		url: endpoint, // L'URL de l'API pour le fichier
		method: 'GET',
		responseType: 'blob', // Important pour traiter les fichiers binaires
		headers: {
			Authorization: `Bearer ${token}`, // Ajouter le token dans les en-têtes
		},
	})
		.then((response) => {
			const blob = new Blob([response.data], { type: response.headers['content-type'] });
			const link = document.createElement('a');
			const url = window.URL.createObjectURL(blob);

			link.href = url;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url); // Libère l'URL pour éviter les fuites de mémoire
		})
		.catch((error) => {
			console.error('Erreur lors du téléchargement du fichier', error);
		});
}

const saleList = computed(() => saleListData.value.data)
const totalsale = computed(() => saleListData.value.total)
const lastPage = computed(() => saleListData.value.last_page)
// Math.min(Math.ceil(totalsale / itemsPerPage), 5)
const isSnackbarScrollReverseVisible = ref(false)
const snackbarMessage = ref("")
const snackbarCollor = ref("success")
const sellerList = computed(() => sellerListData.value.data)
</script>

<template>
	<div>
		<!-- 👉 widgets -->
		<VCard class="mb-6">
			<VCardText>
				<VRow>
					<VCardText>
						<h2>
							Liste des ventes
						</h2>
					</VCardText>
				</VRow>
			</VCardText>
		</VCard>

		<!-- 👉 sales -->
		<VCard title="Filtres" class="mb-6">
			<VCardText>
				<VRow>
					<VCol cols="12" sm="4">
						<AppAutocomplete v-model="sellerIdFilter" placeholder="Vendeur" item-title="name"
							item-value="id" :items="sellerList" clearable clear-icon="tabler-x" />
					</VCol>
				</VRow>

				<VDivider class="my-4" />

			</VCardText>

			<div class="d-flex flex-wrap gap-4 mx-5">
				<div class="d-flex align-center">
					<!-- 👉 Search  -->
					<AppTextField v-model="searchQuery" placeholder="Rechercher une vente" density="compact"
						style="inline-size: 200px;" class="me-3" />
				</div>

				<VSpacer />
				<div class="d-flex gap-4 flex-wrap align-center">
					<!-- 👉 Export button -->
					<VBtn @click="apiDonwloadExcel" color="secondary" prepend-icon="tabler-upload">
						Exporter
					</VBtn>

					<VBtn v-if="$can('create', 'sale')" color="primary" prepend-icon="tabler-plus"
						:to="{ name: 'sale-add' }">
						Ajouter
					</VBtn>
					<VBtn :loading="loadings[3]" :disabled="loadings[3]" prepend-icon="tabler-refresh"
						@click="fetchsale(); load(3)">
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
				:items="saleList" :items-length="totalsale" class="text-no-wrap" @update:options="updateOptions">
				<!-- Actions -->
				<template #item.unlock_status_fr="{ item }">
					<VAvatar variant="tonal"
						:color="{ 'locked': 'secondary', 'unlocked': 'success' }[item.unlock_status]" class="me-4"
						size="40">
						<VIcon
							:icon="{ 'locked': 'tabler-lock-check', 'unlocked': 'tabler-lock-open' }[item.unlock_status]"
							size="28" />
					</VAvatar>
					<div class="text-link text-base font-weight-medium d-inline-block">
						{{ item.unlock_status_fr }}
					</div>
				</template>

				<template #item.actions="{ item }">
					<div class="text-center">
						<div>
							<IconBtn v-if="$can('read', 'sale') || $can('historical', 'sale') || $can('update', 'sale')"
								:to="{ name: 'sale-id', params: { id: item.id } }">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Details
								</VTooltip>
								<VIcon icon=" tabler-eye" />
							</IconBtn>
							<IconBtn v-if="$can('update', 'sale')"
								:to="{ name: 'sale-edit-id', params: { id: item.id } }"
								:disabled="item.unlock_status == 'locked'">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Modifier
								</VTooltip>
								<VIcon icon="tabler-edit" />
							</IconBtn>
						</div>
						<div v-if="$can('unblock', 'sale')">
							<VDivider />
							<IconBtn v-if="$can('unblock', 'sale')" :disabled="item.unlock_status == 'unlocked'" @click=" selectedItemId = item.id; actionTitle = 'Debloquer la vente',
								actionText = 'Voulez vous vraiment debloquer cette vente?', actionFunction = apiUnlock;
							actionButtonText = 'Debloquer'; commentPresence = false; isActionDialogVisible = true;">
								<VTooltip activator="parent" transition="scroll-x-transition" location="end">Debloquer
								</VTooltip>
								<VIcon icon="tabler-lock-open" color='primary' />
							</IconBtn>
						</div>
					</div>
				</template>

				<template #bottom>
					<VDivider />

					<div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
						<p class="text-sm text-medium-emphasis mb-0">
							{{ paginationMeta({ page, itemsPerPage }, totalsale) }}
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

					<AppTextarea v-if="commentPresence" class="mt-3" v-model="actionComment" label="Commentaire"
						placeholder="Ex: RAS" />
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
