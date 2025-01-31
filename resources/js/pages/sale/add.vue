<!-- eslint-disable camelcase -->
<script setup>
definePage({
	meta: {
		action: "create",
		subject: "sale",
	},
});
import AppSelect from "@/@core/components/app-form-elements/AppSelect.vue";
import { ref } from "vue";

const router = useRouter();

const saleData = ref({
	sale_date: null,
	credit_card_id: null,
	number_id: "8456",
	customer_type: null,
	customer_name: null,
	account_number: null,
	account_type_id: null,
	customer_phone_number: null,
  is_dotation: false,
});

const getResetSaleError = () => {
	return {
		sale_date: "",
		credit_card_id: "",
		number_id: "",
		customer_type: "",
		customer_name: "",
		account_number: "",
		account_type_id: "",
		customer_phone_number: "",
    is_dotation: "",
	};
};

const saleError = ref(getResetSaleError());

const refForm = ref();

const onSubmit = () => {
	refForm.value?.validate().then(async ({ valid }) => {
		if (valid) {
			const res = await $api("/sale", {
				method: "POST",
				body: {
					sale_date: saleData.value.sale_date,
					credit_card_id: saleData.value.credit_card_id,
					number_id: saleData.value.number_id,
					customer_type: saleData.value.customer_type,
					customer_name: saleData.value.customer_name,
					account_number: saleData.value.account_number,
					account_type_id: saleData.value.account_type_id,
					customer_phone_number: saleData.value.customer_phone_number,
          is_dotation: saleData.value.is_dotation,
				},
			});

			saleError.value = getResetSaleError();
			if (res.status == 201) {
				snackbarCollor.value = "success";
				isSnackbarScrollReverseVisible.value = true;
				router.push("/sale");
			} else {
				snackbarCollor.value = "error";
				isSnackbarScrollReverseVisible.value = true;
				snackbarMessage.value = "";
				for (const key in res.errors) {
					res.errors[key].forEach((message) => {
						console.log(key + ": " + message);
						saleError.value[key] += message + "\n";
						snackbarMessage.value += key + ": " + message + ", ";
					});
				}
			}
			nextTick(() => {
				// refForm.value?.reset()
				refForm.value?.resetValidation();
			});
		}
	});
};
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

const {
	data: AccountTypeListData,
} = await useApi(createUrl(`/account-type`, {
	query: {
		paginate: 'false'
	},
}))

const accountTypeList = computed(() => AccountTypeListData.value.data)

const isSnackbarScrollReverseVisible = ref(false);
const snackbarMessage = ref("");
const snackbarCollor = ref("success");
</script>

<template>
	<div>
		<div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
			<div class="d-flex flex-column justify-center">
				<h4 class="text-h4 font-weight-medium">Ajouter des cartes</h4>
				<span>Informations sur la première cartes du lot</span>
			</div>
		</div>
		<VForm ref="refForm" @submit.prevent="onSubmit">
			<VRow>
				<VCol md="12">
					<!-- 👉 PV Information -->
					<VCard class="mb-6" title="Information des cartes">
						<VCardText>
							<VRow>
								<VCol cols="12" md="12" lg="9">
									<VRow>
										<VCol cols="12" md="12" lg="12">
											<AppAutocomplete v-model="saleData.credit_card_id" :items="myCreditCardList"
												:error-messages="saleError.credit_card_id" label="Carte vendu"
												item-title="card_number_fr" item-value="id"
												:rules="[requiredValidator]" />
										</VCol>
										<VCol cols="12" md="12" lg="12">
											<AppTextField v-mask="'####'" v-model="saleData.number_id" :error-messages="saleError.number_id
												" label="4 Derniers chiffres du numéro de la carte" placeholder="Ex: 2595" :rules="[requiredValidator]" />
										</VCol>
										<VCol cols="12" md="12" lg="12">
											<AppSelect v-model="saleData.customer_type"
												:items="[{ title: 'Entreprise', value: 'business' }, { title: 'Particulier', value: 'particular' }]"
												:error-messages="saleError.customer_type" label="Type de l'acheteur"
												:rules="[requiredValidator]" />
										</VCol>
										<VCol cols="12" md="12" lg="12">
											<AppTextField v-model="saleData.customer_name" :error-messages="saleError.customer_name
												" label="Nom du client" placeholder="Ex: John" :rules="[requiredValidator]" />
										</VCol>
										<VCol cols="12" md="12" lg="12">
											<AppTextField v-model="saleData.account_number" type="number"
												:error-messages="saleError.account_number
													" label="Numéro de compte du client" placeholder="Ex: 371360000786" />
										</VCol>
										<VCol cols="12" md="12" lg="12">
											<AppTextField v-model="saleData.customer_phone_number"
												:error-messages="saleError.customer_phone_number
													" label="Numéro de téléphone du client" placeholder="Ex: +241 77 56 76 00" />
										</VCol>
                    <VCol cols="12" md="12" lg="12">
                      <VCheckbox v-model="saleData.is_dotation" :error-messages="saleError.is_dotation" label="Dotation" />
                    </VCol>
                    <VCol cols="12" md="12" lg="12">
											<AppAutocomplete v-model="saleData.account_type_id" :items="accountTypeList"
												:error-messages="saleError.account_type_id" label="Type de compte"
												item-title="name" item-value="id" :rules="[requiredValidator]" />
										</VCol>
									</VRow>
								</VCol>
								<VCol cols="12" md="12" lg="3">
									<div class="d-flex align-center justify-center pa-2">
										<AppDateTimePicker v-model="saleData.sale_date"
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
						<div class="d-flex flex-column justify-center">
							<VCol cols="11">
								<VBtn prepend-icon="tabler-arrow-narrow-left" to="/sale">
									ventes
								</VBtn>
							</VCol>
						</div>
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
				color: #fff !important;
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
