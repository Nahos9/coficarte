<!-- eslint-disable camelcase -->
<script setup>
definePage({
	meta: {
		action: 'update',
		subject: 'sale',
	},
})
const router = useRouter()
const route = useRoute("sale-edit-id")
let nextRoute = "/sale";

const getEmptyError = () => {
	return {
		sale_date: "",
		credit_card_id: "",
		number_id: "",
		customer_type: "",
		customer_name: "",
		account_number: "",
		account_type_id: "",
		customer_phone_number: "",
	}
}

const saleError = ref(getEmptyError())

const {
	data: saleData,
} = await useApi(createUrl(`/sale/${route.params.id}`, {
	query: {
		with_credit_card: 'true',
		with_seller: 'true',
		with_account_type: 'true'
	},
}))

var sale = ref(saleData.value.data.sale)

const refForm = ref()

const onSubmit = () => {
	refForm.value?.validate().then(async ({ valid }) => {
		if (valid) {
			const res = await $api(`/sale/${route.params.id}`, {
				method: 'PUT',
				body: {
					sale_date: sale.value.sale_date,
					credit_card_id: sale.value.credit_card_id,
					number_id: sale.value.number_id,
					customer_type: sale.value.customer_type,
					customer_name: sale.value.customer_name,
					account_number: sale.value.account_number,
					account_type_id: sale.value.account_type_id,
					customer_phone_number: sale.value.customer_phone_number,
				},
			})

			saleError.value = getEmptyError()
			if (res.status == 200) {
				router.push(nextRoute)
			} else {
				isSnackbarScrollReverseVisible.value = true
				snackbarCollor.value = "error"
				snackbarMessage.value = ""
				for (const key in res.errors) {
					res.errors[key].forEach(message => {
						snackbarMessage.value += message + "\n";
						saleError.value[key] += message + "\n"
					})
				}
			}
			nextTick(() => {
				// refForm.value?.reset()
				// refForm.value?.resetValidation()
			})
		}
	})
}

const connectedUser = useCookie('userData').value
const {
	data: myCreditCardListData,
} = await useApi(createUrl(`/credit-card`, {
	query: {
		"possessor_id": connectedUser.id,
		"status": 'owned',
		"paginate": 'false',
	},
}))

const myCreditCardList = computed(() => myCreditCardListData.value.data)
myCreditCardList.value.push(JSON.parse(JSON.stringify(sale.value.credit_card)))

const {
	data: AccountTypeListData,
} = await useApi(createUrl(`/account-type`, {
	query: {
		paginate: 'false'
	},
}))

const accountTypeList = computed(() => AccountTypeListData.value.data)

const isSnackbarScrollReverseVisible = ref(false)
const snackbarMessage = ref("")
const snackbarCollor = ref("success")
</script>

<template>
	<VRow>
		<VCol cols="12" md="12">
			<VForm ref="refForm" @submit.prevent="onSubmit">
				<VRow>
					<VCol cols="11">
						<VBtn prepend-icon="tabler-arrow-narrow-left" :to="nextRoute">
							ventes
						</VBtn>
					</VCol>
					<VCol cols="1" class="text-right">
						<VBtn append-icon="tabler-eye" :to="{ name: 'sale-id', params: { id: route.params.id } }">
							Voir
						</VBtn>
					</VCol>
				</VRow>
				<VRow>
					<VCol md="12">
						<!-- 👉 sale Information -->
						<VCard class="mb-6" title="Modification du sale de comité">
							<VCardText>
								<VRow>
									<VCol cols="12" md="12" lg="9">
										<VRow>
											<VCol cols="12" md="12" lg="12">
												<AppAutocomplete v-model="sale.credit_card_id" :items="myCreditCardList"
													:error-messages="saleError.credit_card_id" label="Carte vendu"
													item-title="card_number_fr" item-value="id"
													:rules="[requiredValidator]" />
											</VCol>
											<VCol cols="12" md="12" lg="12">
												<AppTextField v-mask="'####'" v-model="sale.number_id" :error-messages="saleError.number_id
													" label="4 Derniers chiffres du numéro de la carte" placeholder="Ex: 2595" :rules="[requiredValidator]" />
											</VCol>
											<VCol cols="12" md="12" lg="12">
												<AppSelect v-model="sale.customer_type"
													:items="[{ title: 'Entreprise', value: 'business' }, { title: 'Particulier', value: 'particular' }]"
													:error-messages="saleError.customer_type" label="Type de l'acheteur"
													:rules="[requiredValidator]" />
											</VCol>
											<VCol cols="12" md="12" lg="12">
												<AppTextField v-model="sale.customer_name" :error-messages="saleError.customer_name
													" label="Nom du client" placeholder="Ex: John" :rules="[requiredValidator]" />
											</VCol>
											<VCol cols="12" md="12" lg="12">
												<AppTextField v-model="sale.account_number" type="number"
													:error-messages="saleError.account_number
														" label="Numéro de compte du client" placeholder="Ex: 251789654001" />
											</VCol>
											<VCol cols="12" md="12" lg="12">
												<AppTextField v-model="sale.customer_phone_number"
													:error-messages="saleError.customer_phone_number
														" label="Numéro de téléphone du client" placeholder="Ex: +228 90 90 90 90" />
											</VCol>
											<VCol cols="12" md="12" lg="12">
												<AppAutocomplete v-model="sale.account_type_id" :items="accountTypeList"
													:error-messages="saleError.account_type_id" label="Type de compte"
													item-title="name" item-value="id" :rules="[requiredValidator]" />
											</VCol>
										</VRow>
									</VCol>
									<VCol cols="12" md="12" lg="3">
										<div class="d-flex align-center justify-center pa-2">
											<AppDateTimePicker v-model="sale.sale_date"
												:error-messages="saleError.sale_date" label="Date de la vente"
												:rules="[requiredValidator]" :config="{ inline: true }"
												class="calendar-date-picker" />
										</div>
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
		</VCol>
	</VRow>

	<VSnackbar v-model="isSnackbarScrollReverseVisible" transition="scale-transition" location="top end"
		:color="snackbarCollor">
		{{ snackbarMessage }}
	</VSnackbar>
</template>
