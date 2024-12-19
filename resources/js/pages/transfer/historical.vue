<!-- eslint-disable camelcase -->

<script setup>
definePage({
	meta: {
		action: 'historical',
		subject: 'transfer',
	},
})
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@api-utils/paginationMeta'
import { $api } from '@/utils/api';
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue';


const searchQuery = ref('')
const loadings = ref([])
const itemsPerPage = ref(8)
const page = ref(1)
const selectedItemId = ref(0)
const isActionDialogVisible = ref(false)
const actionTitle = ref("")
const actionText = ref("")
const action = ref("")
const actionButtonText = ref("")
const actionFunction = ref()
const actionComment = ref("cancel")
const commentPresence = ref(false)
const connectedUser = useCookie('userData').value
const senderIdFilter = ref(null)
const receiverIdFilter = ref(null)
const statusFilter = ref(null)
const headers = [
	{
		title: 'Initiateur',
		key: 'sender.name'
	},
	{
		title: 'Receptioniste',
		key: 'receiver.name'
	},
	{
		title: 'Commentaire',
		key: 'comment'
	},
	{
		title: 'Date de transfert',
		key: 'created_at_fr'
	},
	{
		title: 'Statut',
		key: 'status_fr'
	},
	{
		title: 'Actions',
		key: 'actions',
		sortable: false,
	},
]
const {
	data: transferListData,
	execute: fetchTransfer,
} = await useApi(createUrl('/transfer', {
	query: {
		search: searchQuery,
		page: page,
		with_sender: 'true',
		with_receiver: 'true',
		multi_status: "r-c-v",
		status: statusFilter,
		sender_id: senderIdFilter,
		receiver_id: receiverIdFilter,
	},
}))

const {
	data: userListData,
	execute: fetchUserList,
} = await useApi(createUrl('/user', {
	query: {
		paginate: 'false',
		multi_profile: { 'marketing_manager': "rc-ah-mm", "agency_head": "rc-mm-ah", "responsible_for_customer": "ah-rc" }[connectedUser.role]
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

const transferList = computed(() => transferListData.value.data)
const totalTransfer = computed(() => transferListData.value.total)
const lastPage = computed(() => transferListData.value.last_page)
// Math.min(Math.ceil(totalTransfer / itemsPerPage), 5)
const isSnackbarScrollReverseVisible = ref(false)
const snackbarMessage = ref("")
const snackbarCollor = ref("success")
const userList = computed(() => userListData.value.data)
</script>

<template>
	<div>
		<!-- 👉 widgets -->
		<VCard class="mb-6">
			<VCardText>
				<VRow>
					<VCardText>
						<h2>
							Liste des transferts
						</h2>
					</VCardText>
				</VRow>
			</VCardText>
		</VCard>

		<!-- 👉 transfers -->
		<VCard title="Filtres" class="mb-6">
			<VCardText>
				<VRow>
					<VCol cols="12" sm="4">
						<AppAutocomplete v-model="senderIdFilter" placeholder="Initiateur" item-title="name"
							item-value="id" :items="userList" clearable clear-icon="tabler-x" />
					</VCol>
					<VCol cols="12" sm="4">
						<AppAutocomplete v-model="receiverIdFilter" placeholder="Receptionniste" item-title="name"
							item-value="id" :items="userList" clearable clear-icon="tabler-x" />
					</VCol>
					<VCol cols="12" sm="4">
						<AppSelect v-model="statusFilter" placeholder="Statut" :items="[{value: 'canceled', title: 'Annulé'},{value: 'rejected', title: 'Rejeté'},{value: 'validated', title: 'Validé'}]" clearable clear-icon="tabler-x" />
					</VCol>
				</VRow>

				<VDivider class="my-4" />

			</VCardText>
			<div class="d-flex flex-wrap gap-4 mx-5">
				<div class="d-flex align-center">
					<!-- 👉 Search  -->
					<AppTextField v-model="searchQuery" placeholder="Rechercher un transfer" density="compact"
						style="inline-size: 200px;" class="me-3" />
				</div>

				<VSpacer />
				<div class="d-flex gap-4 flex-wrap align-center">
					<!-- 👉 Export button -->
					<VBtn variant="tonal" color="secondary" prepend-icon="tabler-upload">
						Export
					</VBtn>

					<VBtn v-if="$can('create', 'transfer')" color="primary" prepend-icon="tabler-plus"
						:to="{ name: 'transfer-add' }">
						Nouveau
					</VBtn>
					<VBtn :loading="loadings[3]" :disabled="loadings[3]" prepend-icon="tabler-refresh"
						@click="fetchTransfer(); load(3)">
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
				:items="transferList" :items-length="totalTransfer" class="text-no-wrap"
				@update:options="updateOptions">
				<template #item.status_fr="{ item }">
					<VChip class="ma-2"
						:color="{ 'canceled': 'secondary', 'rejected': 'error', 'validated': 'success' }[item.status]"
						label>
						<v-icon
							:icon="{ 'canceled': 'tabler-x', 'rejected': 'tabler-x', 'validated': 'tabler-check' }[item.status]"
							start></v-icon>
						{{ item.status_fr }}
					</VChip>
				</template>
				<template #item.actions="{ item }">
					<div class="text-center">
						<div>
							<IconBtn
								v-if="$can('read', 'transfer') || $can('historical', 'transfer') || $can('update', 'transfer')"
								:to="{ name: 'transfer-id', params: { id: item.id } }">
								<VTooltip activator="parent" transition="scroll-x-transition" location="start">Details
								</VTooltip>
								<VIcon icon=" tabler-eye" />
							</IconBtn>
						</div>
					</div>
				</template>

				<template #bottom>
					<VDivider />

					<div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
						<p class="text-sm text-medium-emphasis mb-0">
							{{ paginationMeta({ page, itemsPerPage }, totalTransfer) }}
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
						Retour
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
