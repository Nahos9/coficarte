<script setup>
import visa from '@images/icons/payments/visa.png'
import logo from '@images/logo.png'
definePage({
	meta: {
		action: 'read',
		subject: 'sale',
	},
})
const router = useRouter()
const route = useRoute("sale-id")
let nextRoute = "/sale";


const { data: sale } = await useApi(
	createUrl(`/sale/${Number(route.params.id)}`, {
		query: {
			'with_seller': 'true',
			'with_credit_card<lot': 'true',
			'with_credit_card<receptionist': 'true',
			'with_account_type': 'true',
		},
	})
)


const { data: saleList } = await useApi(
	createUrl(`/sale`, {
		query: {
			'paginate': 'false',
		},
	})
)

if (sale.value.status == 200) {
	sale.value = sale.value.data.sale
} else {
	router.push("/sale")
}
</script>

<template>
	<section v-if="sale">
		<VRow>
			<VCol cols="12">
				<VCard>
					<!-- SECTION Header -->
					<VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
						<VCol cols="10">
							<VBtn prepend-icon="tabler-arrow-narrow-left" :to="nextRoute">
								Ventes
							</VBtn>
						</VCol>
					</VCardText>
					<VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
						<VCol cols="12">
							<h2>Intervenants</h2>
						</VCol>
						<VCol>
							<VCard v-if="sale">
								<VCardText class="text-center pt-12">
									<!-- 👉 Avatar -->
									<!-- <VAvatar rounded :size="100" :color="!sale.avatar ? 'primary' : undefined"
										:variant="!sale.avatar ? 'tonal' : undefined">
										<VImg v-if="sale.avatar" :src="sale.avatar" />
										<span v-else class="text-5xl font-weight-medium">
											{{ avatarText(sale.fullName) }}
										</span>
									</VAvatar> -->


									<h5 class="text-h5 mt-4">
										Acheteur
									</h5>
									<!-- 👉 User fullName -->
									<h5 class="text-h5 mt-4">
										{{ sale.customer_name }}
									</h5>

									<!-- 👉 Role chip -->
									<VChip label color="secondary" size="small" class="text-capitalize mt-4">
										{{ sale.account_type.name }}
									</VChip>
								</VCardText>

								<VCardText>
									<div class="d-flex justify-space-around gap-x-6 gap-y-2 flex-wrap mb-6">
										<!-- 👉 Done task -->
										<div class="d-flex align-center me-8">
											<VAvatar :size="40" rounded color="primary" variant="tonal" class="me-4">
												<VIcon icon="tabler-building-bank" size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													{{ sale.account_number ?? '-' }}
												</h5>

												<span class="text-sm">Compte</span>
											</div>
										</div>

										<!-- 👉 Done task -->
										<div class="d-flex align-center me-8">
											<VAvatar :size="40" rounded color="primary" variant="tonal" class="me-4">
												<VIcon icon="tabler-phone" size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													{{ sale.customer_phone_number ?? '-' }}
												</h5>

												<span class="text-sm">Teléphone</span>
											</div>
										</div>

										<!-- 👉 Done Project -->
										<div class="d-flex align-center me-4">
											<VAvatar :size="38" rounded color="primary" variant="tonal" class="me-4">
												<VIcon
													:icon="{ 'business': 'tabler-building-store', 'particular': 'tabler-user' }[sale.customer_type]"
													size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													{{ sale.customer_type_fr }}
												</h5>
												<span class="text-sm">Catégorie</span>
											</div>
										</div>
									</div>

									<VDivider class="my-4" />
								</VCardText>
							</VCard>
						</VCol>
						<VCol>
							<VCard v-if="sale">
								<VCardText class="text-center pt-12">
									<!-- 👉 Avatar -->
									<!-- <VAvatar rounded :size="100" :color="!sale.avatar ? 'primary' : undefined"
										:variant="!sale.avatar ? 'tonal' : undefined">
										<VImg v-if="sale.avatar" :src="sale.avatar" />
										<span v-else class="text-5xl font-weight-medium">
											{{ avatarText(sale.fullName) }}
										</span>
									</VAvatar> -->


									<h5 class="text-h5 mt-4">
										Vendeur
									</h5>
									<!-- 👉 User fullName -->
									<h5 class="text-h5 mt-4">
										{{ sale.seller.email }}
									</h5>

									<!-- 👉 Role chip -->
									<VChip label color="secondary" size="small" class="text-capitalize mt-4">
										{{ sale.seller.profile_fr }}
									</VChip>
								</VCardText>

								<VCardText>
									<div class="d-flex justify-space-around gap-x-6 gap-y-2 flex-wrap mb-6">
										<!-- 👉 Done task -->
										<div class="d-flex align-center me-8">
											<VAvatar :size="40" rounded color="primary" variant="tonal" class="me-4">
												<VIcon icon="tabler-user" size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													Nom
												</h5>

												<span class="text-sm">{{ sale.seller.name }}</span>
											</div>
										</div>

										<!-- 👉 Done Project -->
										<div class="d-flex align-center me-4">
											<VAvatar :size="38" rounded color="primary" variant="tonal" class="me-4">
												<VIcon icon="tabler-wallet" size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													Nombre de vente
												</h5>
												<span class="text-sm">{{ saleList.total }}</span>
											</div>
										</div>
									</div>

									<VDivider class="my-4" />

								</VCardText>
							</VCard>
						</VCol>
					</VCardText>
					<!-- Cartes -->
					<VCardText
						class="d-flex flex-wrap justify-center center flex-column flex-sm-row print-row text-lg text-white-custom">
						<VCol cols="12">
							<h2>Carte vendu</h2>
						</VCol>
						<VCol cols="6">
							<div class="d-flex flex-column gap-y-6">
								<VCard flat color="rgba(201, 60, 47,0.8)">
									<VCardText col="6" class="d-flex flex-sm-row flex-column">
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
												Numéro: <strong>{{ sale.credit_card.card_number_fr
													}}</strong>
											</div>
											<br>
											<div v-if="sale.credit_card.lot" style="color: white;font-weight: 150px;">
												Lot: <strong>{{
													sale.credit_card.lot?.first_card_number_fr
												}}</strong>
											</div>
											<br>
											<div v-if="sale.credit_card.lot" style="color: white;font-weight: 150px;">
												Référence de la facture: <strong>{{ sale.credit_card.invoice_reference
													}}</strong>
											</div>
											<br>
											<div style="color: white;font-weight: 150px;">
												Receptioniste: <strong>{{
													sale.credit_card.receptionist.name
												}}</strong>
											</div>
										</div>

										<VSpacer />

										<div class="d-flex flex-column text-sm-end">
											<span style="color: white;"
												class="text-body-2 my-4 order-sm-1 order-0">Livré le {{
													sale.credit_card.delivery_date_fr
												}}</span><span style="color: white;"
												class="text-body-2 my-4 order-sm-1 order-0">Expire le {{
													sale.credit_card.expiration_date_fr
												}}</span><span style="color: white;"
												class="text-body-2 my-4 order-sm-1 order-0">Prix de vente: <strong>{{
													sale.sale_price_fr
												}}</strong></span>
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
