<!-- eslint-disable camelcase -->
<script setup>
definePage({
	meta: {
		action: 'create',
		subject: 'transfer',
	},
})
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue';
import { ref } from 'vue'

const router = useRouter()

const transferData = ref({
	receiver_id: null,
	credit_card_number_list: [],
	comment: null,
})

const getResetTransferError = () => {
	return {
		receiver_id: "",
		credit_card_number_list: "",
		comment: "",
	}
}
const transferError = ref(getResetTransferError())


const refForm = ref()

const onSubmit = () => {
	refForm.value?.validate().then(async ({ valid }) => {
		if (valid) {
			const res = await $api('/transfer', {
				method: 'POST',
				body: {
					receiver_id: transferData.value.receiver_id,
					first_credit_card_number: transferData.value.first_credit_card_number,
					last_credit_card_number: transferData.value.last_credit_card_number,
					comment: transferData.value.comment,
				},
			})

			transferError.value = getResetTransferError()
			if (res.status == 201) {
				snackbarMessage.value = "Transfer initié avec succès"
				snackbarCollor.value = "success"
				isSnackbarScrollReverseVisible.value = true
				router.push("/transfer")
			} else {
				snackbarCollor.value = "error"
				isSnackbarScrollReverseVisible.value = true
				snackbarMessage.value = ""
				for (const key in res.errors) {
					res.errors[key].forEach(message => {
						console.log(key + ": " + message)
						transferError.value[key] += message + "\n"
						snackbarMessage.value += key + ": " + message + ", ";
					})
				}
			}
			nextTick(() => {
				// refForm.value?.reset()
				refForm.value?.resetValidation()
			})
		}
	})
}
const connectedUser = useCookie('userData').value
const {
	data: receiverListData,
} = await useApi(createUrl(`/user`, {
	query: {
		"paginate": 'false',
		"multi_profile": { 'marketing_manager': "ah", "agency_head": "rc-mm-c", "responsible_for_customer": "ah-c" }[connectedUser.role]
	},
}))
const receiverList = computed(() => receiverListData.value.data)

const {
	data: myCreditCardListData,
} = await useApi(createUrl(`/credit-card`, {
	query: {
		"possessor_id": connectedUser.id,
		'relation_filter_not_in_transfer_details>transfer-status': 'waiting',
		'order_by_asc': 'card_number',
		'status': 'owned',
		"paginate": 'false',
	},
}))

const myCreditCardList = computed(() => myCreditCardListData.value.data)

const isSnackbarScrollReverseVisible = ref(false)
const snackbarMessage = ref("")
const snackbarCollor = ref("success")
</script>

<template>
	<div>
		<div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
			<div class="d-flex flex-column justify-center">
				<h4 class="text-h4 font-weight-medium">
					Ajouter des cartes
				</h4>
				<span>Informations sur la première cartes du lot</span>
			</div>
		</div>
		<VForm ref="refForm" @submit.prevent="onSubmit">
			<VRow>
				<VCol md="12">
					<!-- 👉 PV Information -->
					<VCard class="mb-6" title="Information du transfère">
						<VCardText>
							<VRow>
								<VCol cols="12" md="12" lg="12">
									<AppAutocomplete v-model="transferData.receiver_id" :items="receiverList"
										:error-messages="transferError.receiver_id" label="Receveur" item-title="name"
										item-value="id" :rules="[requiredValidator]" />
								</VCol>
								<VCol cols="12" md="12" lg="12">
									<AppAutocomplete v-model="transferData.first_credit_card_number"
										:items="myCreditCardList" :error-messages="transferError.first_credit_card_number"
										label="Début plage des cartes" item-title="card_number_fr" item-value="card_number"
										:rules="[requiredValidator]" />
								</VCol>
								<VCol cols="12" md="12" lg="12">
									<AppAutocomplete v-model="transferData.last_credit_card_number"
										:items="myCreditCardList" :error-messages="transferError.last_credit_card_number"
										label="Fin plage des cartes" item-title="card_number_fr" item-value="card_number"
										:rules="[requiredValidator]" />
								</VCol>
								<VCol cols="12" md="12" lg="12">
									<AppTextarea v-model="transferData.comment" :error-messages="transferError.comment"
										label="Commentaire" />
								</VCol>

							</VRow>
						</VCardText>
					</VCard>
				</VCol>
				<VCol cols="12">
					<div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
						<div class="d-flex flex-column justify-center" />
						<div class="d-flex gap-4 align-center flex-wrap">
							<VBtn type="reset" variant="tonal" color="primary">
								<VIcon start icon="tabler-circle-minus" />
								Effacer
							</VBtn>
							<VBtn type="submit" class="me-3">
								Enregistrer
								<VIcon end icon="tabler-checkbox" />
							</VBtn>
						</div>
					</div>
				</VCol>
			</VRow>
		</VForm>

		<VSnackbar v-model="isSnackbarScrollReverseVisible" transition="scale-transition" location="top end"
			:color="snackbarCollor">
			{{ snackbarMessage }}
		</VSnackbar>
	</div>
</template>

<style lang="scss" scoped>
.drop-zone {
	border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
	border-radius: 6px;
}
</style>

<style lang="scss">
.inventory-card {

	.v-radio-group,
	.v-checkbox {
		.v-selection-control {
			align-items: start !important;

			.v-selection-control__wrapper {
				margin-block-start: -0.375rem !important;
			}
		}

		.v-label.custom-input {
			border: none !important;
		}
	}

	.v-tabs.v-tabs-pill {
		.v-slide-group-item--active.v-tab--selected.text-primary {
			h6 {
				color: #fff !important
			}
		}
	}

}

.ProseMirror {
	p {
		margin-block-end: 0;
	}

	padding: 0.5rem;
	outline: none;

	p.is-editor-empty:first-child::before {
		block-size: 0;
		color: #adb5bd;
		content: attr(data-placeholder);
		float: inline-start;
		pointer-events: none;
	}
}
</style>
