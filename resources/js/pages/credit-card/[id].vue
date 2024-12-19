<script setup>
import visa from '@images/icons/payments/visa.png'
import logo from '@images/logo.png'
definePage({
	meta: {
		action: 'read',
		subject: 'credit-card',
	},
})
const router = useRouter()
const route = useRoute("credit-card-id")
let nextRoute = "/credit-card";


const { data: creditCard } = await useApi(
	createUrl(`/credit-card/${Number(route.params.id)}`, {
		query: {
			with_possessor: 'true',
			with_lot: 'true',
			with_receptionist: 'true',
		},
	})
)

if (creditCard.value.status == 200) {
	console.log(creditCard.value)
	creditCard.value = creditCard.value.data.creditCard
	if (creditCard.value.status == "sold") {
		nextRoute = "/credit-card/historical";
	}
} else {
	router.push("/credit-card")
}


const tableData = [
	{ "title": "Numéro de la carte", "value": creditCard.value.card_number_fr },
]
</script>

<template>
	<section v-if="creditCard">
		<VRow>
			<VCol cols="12">
				<VCard>
					<!-- SECTION Header -->
					<VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
						<VCol cols="10">
							<VBtn prepend-icon="tabler-arrow-narrow-left" :to="nextRoute">
								Cartes
							</VBtn>
						</VCol>
						<div v-if="$can('update', 'credit-card')">
							<VCol cols=" 2" class="text-right">
								<VBtn append-icon="tabler-edit"
									:to="{ name: 'credit-card-edit-id', params: { id: creditCard.id } }"
									:disabled="creditCard.status == 'sold'">
									Modifier
								</VBtn>
							</VCol>
						</div>
					</VCardText>

					<VCardText
						class="d-flex flex-wrap justify-center center flex-column flex-sm-row print-row text-lg text-white-custom">
						<VCol cols="6">
							<div class="d-flex flex-column gap-y-6">
								<VCard flat color="rgba(201, 60, 47,0.8)">
									<VCardText class="d-flex flex-sm-row flex-column">
										<div class="text-no-wrap">
											<img :src="logop" height="25">
											<img :src="visa" height="25">
											<h4 class="my-2 text-body-1 text-high-emphasis d-flex align-center">
												<div style="color: white;" class="me-4">
													Cofina
												</div>
											</h4>
											<br>
											<div style="color: white;">
												Numéro: <strong>{{ creditCard.card_number_fr }}</strong>
											</div>
											<br>
											<div v-if="creditCard.lot" style="color: white;font-weight: 150px;">
												Lot: <strong>{{ creditCard.lot?.first_card_number_fr }}</strong>
											</div>
											<div v-if="creditCard.lot" style="color: white;font-weight: 150px;">
												Référence de la facture: <strong>{{ creditCard.invoice_reference
													}}</strong>
											</div>
											<div style="color: white;font-weight: 150px;">
												Receptioniste: <strong>{{ creditCard.receptionist.name }}</strong>
											</div>
											<div style="color: white;font-weight: 150px;">
												Possesseur: <strong>{{ creditCard.possessor.name }}</strong>
											</div>
										</div>

										<VSpacer />

										<div class="d-flex flex-column text-sm-end">
											<span style="color: white;"
												class="text-body-2 my-4 order-sm-1 order-0">Livré le {{
													creditCard.delivery_date_fr
												}}</span><span style="color: white;"
												class="text-body-2 my-4 order-sm-1 order-0">Expire le {{
													creditCard.expiration_date_fr
												}}</span>
										</div>
										<br>
									</VCardText>
								</VCard>
							</div>
						</VCol>
					</VCardText>
					<VDivider />
				</VCard>
			</VCol>
		</VRow>
	</section>
</template>

<style lang="scss">
.text-white-custom {
	color: white;
	font-weight: 150px;
}

.invoice-preview-table {
	--v-table-row-height: 44px !important;
}

@media print {
	.v-theme--dark {
		--v-theme-surface: 201, 60, 47;
		--v-theme-on-surface: 94, 86, 105;
	}

	body {
		background: none !important;
	}

	@page {
		margin: 0;
		size: auto;
	}

	.layout-page-content,
	.v-row,
	.v-col-md-9 {
		padding: 0;
		margin: 0;
	}

	.product-buy-now {
		display: none;
	}

	.v-navigation-drawer,
	.layout-vertical-nav,
	.app-customizer-toggler,
	.layout-footer,
	.layout-navbar,
	.layout-navbar-and-nav-container {
		display: none;
	}

	.v-card {
		box-shadow: none !important;

		.print-row {
			flex-direction: row !important;
		}
	}

	.layout-content-wrapper {
		padding-inline-start: 0 !important;
	}

	.v-table__wrapper {
		overflow: hidden !important;
	}
}
</style>
