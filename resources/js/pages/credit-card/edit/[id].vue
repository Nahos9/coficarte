<!-- eslint-disable camelcase -->
<script setup>
definePage({
	meta: {
		action: 'update',
		subject: 'credit-card',
	},
})
const router = useRouter()
const route = useRoute("credit-card-edit-id")
let nextRoute = "/credit-card";

const getEmptyError = () => {
	return {
		card_number: "",
		delivery_date: "",
		expiration_date: "",
		invoice_reference: "",
		price: "",
	}
}

const creditCardError = ref(getEmptyError())

const {
	data: creditCardData,
} = await useApi(createUrl(`/credit-card/${route.params.id}`, {
	query: {
	},
}))

var creditCard = ref(creditCardData.value.data.creditCard)

const refForm = ref()

const onSubmit = () => {
	refForm.value?.validate().then(async ({ valid }) => {
		if (valid) {
			const res = await $api(`/credit-card/${route.params.id}`, {
				method: 'PUT',
				body: {
					card_number: creditCard.value.card_number.replace(/\s+/g, ''),
					delivery_date: creditCard.value.delivery_date,
					expiration_date: creditCard.value.expiration_date,
					invoice_reference: creditCard.value.invoice_reference,
					price: creditCard.value.price,
				},
			})

			creditCardError.value = getEmptyError()
			if (res.status == 200) {
				router.push(nextRoute)
			} else {
				isSnackbarScrollReverseVisible.value = true
				snackbarCollor.value = "error"
				snackbarMessage.value = ""
				for (const key in res.errors) {
					res.errors[key].forEach(message => {
						snackbarMessage.value += message + "\n";
						creditCardError.value[key] += message + "\n"
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
							Coficartes
						</VBtn>
					</VCol>
					<VCol cols="1" class="text-right">
						<VBtn append-icon="tabler-eye"
							:to="{ name: 'credit-card-id', params: { id: route.params.id } }">
							Voir
						</VBtn>
					</VCol>
				</VRow>
				<VRow>
					<VCol md="12">
						<!-- 👉 creditCard Information -->
						<VCard class="mb-6" title="Modification du credit-card de comité">
							<VCardText>
								<VRow>
									<VCol cols="12">
										<VRow>
											<VCol cols="12" md="12" lg="12">
												<AppTextField v-mask="'## ## ## ## ##'" v-model="creditCard.card_number"
													:error-messages="creditCardError.card_number
														" label="Numéro de la carte" placeholder="Ex: 00 12 52 25 95" :rules="[requiredValidator]" />
											</VCol>
											<VCol cols="12" md="12" lg="12">
												<AppTextField v-model="creditCard.invoice_reference" :error-messages="creditCardError.invoice_reference
													" label="Référence de la facture" placeholder="Ex: DD5DDG425" :rules="[requiredValidator]" />
											</VCol>
											<VCol cols="12" md="12" lg="12">
												<AppTextField v-model="creditCard.price" type="number" :error-messages="creditCardError.price
													" label="Prix de vente" placeholder="Ex: 5000" :rules="[requiredValidator]" />
											</VCol>
										</VRow>
									</VCol>
									<VCol cols="6">
										<div class="d-flex align-center justify-center pa-2">
											<AppDateTimePicker v-model="creditCard.delivery_date" :error-messages="creditCardError.delivery_date
												" label="Date de livraison" placeholder="Ex: 2022-01-01" :rules="[requiredValidator]"
												:config="{ inline: true }" class="calendar-date-picker" />
										</div>
									</VCol>
									<VCol cols="6">
										<div class="d-flex align-center justify-center pa-2">
											<AppDateTimePicker v-model="creditCard.expiration_date" :error-messages="creditCardError.expiration_date
												" label="Date d'expiration" placeholder="Ex: 2022-01-01" :rules="[requiredValidator]"
												:config="{ inline: true }" class="calendar-date-picker" />
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
