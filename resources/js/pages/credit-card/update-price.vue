<!-- eslint-disable camelcase -->
<script setup>
definePage({
	meta: {
		action: "update-price",
		subject: "credit-card",
	},
});
import { ref } from "vue";

const router = useRouter();

const creditCardData = ref({
	price: 5000,
});

const getResetCreditCardError = () => {
	return {
		price: "",
	};
};

const creditCardError = ref(getResetCreditCardError());

const refForm = ref();

const onSubmit = () => {
	refForm.value?.validate().then(async ({ valid }) => {
		if (valid) {
			const res = await $api("/credit-card/update-price", {
				method: "PUT",
				body: {
					price: creditCardData.value.price,
				},
			});

			creditCardError.value = getResetCreditCardError();
			if (res.status == 200) {
				snackbarCollor.value = "success";
				isSnackbarScrollReverseVisible.value = true;
				router.push("/credit-card");
			} else {
				snackbarCollor.value = "error";
				isSnackbarScrollReverseVisible.value = true;
				snackbarMessage.value = "";
				for (const key in res.errors) {
					res.errors[key].forEach((message) => {
						console.log(key + ": " + message);
						creditCardError.value[key] += message + "\n";
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

const isSnackbarScrollReverseVisible = ref(false);
const snackbarMessage = ref("");
const snackbarCollor = ref("success");
</script>

<template>
	<div>
		<div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
			<div class="d-flex flex-column justify-center">
				<h4 class="text-h4 font-weight-medium">Modifier les prix de vente de toutes les cartes</h4>
				<span>Nouveau prix</span>
			</div>
		</div>
		<VForm ref="refForm" @submit.prevent="onSubmit">
			<VRow>
				<VCol md="12">
					<!-- 👉 PV Information -->
					<VCard class="mb-6" title="Information des cartes">
						<VCardText>
							<VRow>
								<VCol cols="12">
									<VRow>
										<VCol cols="12" md="12" lg="12">
											<AppTextField v-model="creditCardData.price"
												:error-messages="creditCardError.price" label="Prix de vente"
												type="number" placeholder="Ex: 5000" :rules="[requiredValidator]" />
										</VCol>
									</VRow>
								</VCol>
							</VRow>
						</VCardText>
					</VCard>
				</VCol>
				<VCol cols="12">
					<div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
						<div class="d-flex flex-column justify-center">
							<VCol cols="11">
								<VBtn prepend-icon="tabler-arrow-narrow-left" to="/credit-card">
									Coficartes
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
