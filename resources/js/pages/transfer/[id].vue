<script setup>
import visa from '@images/icons/payments/visa.png'
definePage({
	meta: {
		action: 'read',
		subject: 'transfer',
	},
})
const router = useRouter()
const route = useRoute("transfer-id")
let nextRoute = "/transfer";


const { data: transfer } = await useApi(
	createUrl(`/transfer/${Number(route.params.id)}`, {
		query: {
			with_sender: 'true',
			with_receiver: 'true',
			"with_transfer_details<credit_card<receptionist": 'true',
			"with_transfer_details<credit_card<lot": 'true',
		},
	})
)

if (transfer.value.status == 200) {
	transfer.value = transfer.value.data.transfer
	nextRoute = (transfer.value.status == "waiting") ? "/transfer" : "/transfer/historical"
} else {
	router.push("/transfer")
}

</script>

<template>
	<section v-if="transfer">
		<VRow>
			<VCol cols="12">
				<VCard>
					<!-- SECTION Header -->
					<VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
						<VCol cols="10">
							<VBtn prepend-icon="tabler-arrow-narrow-left" :to="nextRoute">
								Transferts
							</VBtn>
						</VCol>
					</VCardText>
					<VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
						<VCol cols="12">
							<h2>Intervenants</h2>
						</VCol>
						<VCol>
							<VCard v-if="transfer">
								<VCardText class="text-center pt-12">
									<!-- 👉 Avatar -->
									<!-- <VAvatar rounded :size="100" :color="!transfer.avatar ? 'primary' : undefined"
										:variant="!transfer.avatar ? 'tonal' : undefined">
										<VImg v-if="transfer.avatar" :src="transfer.avatar" />
										<span v-else class="text-5xl font-weight-medium">
											{{ avatarText(transfer.fullName) }}
										</span>
									</VAvatar> -->


									<h5 class="text-h5 mt-4">
										Envoyeur
									</h5>
									<!-- 👉 User fullName -->
									<h5 class="text-h5 mt-4">
										{{ transfer.sender.name }}
									</h5>

									<!-- 👉 Role chip -->
									<VChip label color="secondary" size="small" class="text-capitalize mt-4">
										{{ transfer.sender.profile_fr }}
									</VChip>
								</VCardText>

								<VCardText>
									<div class="d-flex justify-space-around gap-x-6 gap-y-2 flex-wrap mb-6">
										<!-- 👉 Done task -->
										<div class="d-flex align-center me-8">
											<VAvatar :size="40" rounded color="primary" variant="tonal" class="me-4">
												<VIcon icon="tabler-credit-card" size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													{{ '...' }}
												</h5>

												<span class="text-sm">Nombre de carte</span>
											</div>
										</div>

										<!-- 👉 Done Project -->
										<div class="d-flex align-center me-4">
											<VAvatar :size="38" rounded color="primary" variant="tonal" class="me-4">
												<VIcon icon="tabler-transfer" size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													{{ '...' }}
												</h5>
												<span class="text-sm">Nombre de transfert</span>
											</div>
										</div>
									</div>

									<!-- 👉 Details -->
									<h5 class="text-h5">
										Détails
									</h5>

									<VDivider class="my-4" />

									<!-- 👉 User Details list -->
									<VList class="card-list mt-2">
										<VListItem>
											<VListItemTitle>
												<h6 class="text-h6">
													Nom:
													<div class="d-inline-block text-body-1">
														{{ transfer.sender.name }}
													</div>
												</h6>
											</VListItemTitle>
											<VListItemTitle>
												<h6 class="text-h6">
													Email:
													<div class="d-inline-block text-body-1">
														{{ transfer.sender.email }}
													</div>
												</h6>
											</VListItemTitle>
											<VListItemTitle>
												<h6 class="text-h6">
													Commentaire:
													<div class="d-inline-block text-body-1">
														{{ transfer.comment }}
													</div>
												</h6>
											</VListItemTitle>
										</VListItem>
									</VList>
								</VCardText>
							</VCard>
						</VCol>
						<VCol>
							<VCard v-if="transfer">
								<VCardText class="text-center pt-12">
									<!-- 👉 Avatar -->
									<!-- <VAvatar rounded :size="100" :color="!transfer.avatar ? 'primary' : undefined"
										:variant="!transfer.avatar ? 'tonal' : undefined">
										<VImg v-if="transfer.avatar" :src="transfer.avatar" />
										<span v-else class="text-5xl font-weight-medium">
											{{ avatarText(transfer.fullName) }}
										</span>
									</VAvatar> -->

									<h5 class="text-h5 mt-4">
										Receveur
									</h5>
									<!-- 👉 User fullName -->
									<h5 class="text-h5 mt-4">
										{{ transfer.receiver.name }}
									</h5>

									<!-- 👉 Role chip -->
									<VChip label color="secondary" size="small" class="text-capitalize mt-4">
										{{ transfer.receiver.profile_fr }}
									</VChip>
								</VCardText>

								<VCardText>
									<div class="d-flex justify-space-around gap-x-6 gap-y-2 flex-wrap mb-6">
										<!-- 👉 Done task -->
										<div class="d-flex align-center me-8">
											<VAvatar :size="40" rounded color="success" variant="tonal" class="me-4">
												<VIcon icon="tabler-credit-card" size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													{{ '...' }}
												</h5>

												<span class="text-sm">Nombre de carte</span>
											</div>
										</div>

										<!-- 👉 Done Project -->
										<div class="d-flex align-center me-4">
											<VAvatar :size="38" rounded color="success" variant="tonal" class="me-4">
												<VIcon icon="tabler-transfer" size="24" />
											</VAvatar>
											<div>
												<h5 class="text-h5">
													{{ '...' }}
												</h5>
												<span class="text-sm">Nombre de transfert</span>
											</div>
										</div>
									</div>

									<!-- 👉 Details -->
									<h5 class="text-h5">
										Détails
									</h5>

									<VDivider class="my-4" />

									<!-- 👉 User Details list -->
									<VList class="card-list mt-2">
										<VListItem>
											<VListItemTitle>
												<h6 class="text-h6">
													Nom:
													<div class="d-inline-block text-body-1">
														{{ transfer.receiver.name }}
													</div>
												</h6>
											</VListItemTitle>
											<VListItemTitle>
												<h6 class="text-h6">
													Email:
													<div class="d-inline-block text-body-1">
														{{ transfer.receiver.email }}
													</div>
												</h6>
											</VListItemTitle>
										</VListItem>
									</VList>
								</VCardText>
							</VCard>
						</VCol>
					</VCardText>
					<!-- Cartes -->
					<VCardText
						class="d-flex flex-wrap justify-center center flex-column flex-sm-row print-row text-lg text-white-custom">
						<VCol cols="12">
							<h2>Cartes</h2>
						</VCol>
						<VCol v-for="transfer_detail in transfer.transfer_details" cols="6">
							<div class="d-flex flex-column gap-y-6">
								<VCard v-if="transfer_detail.credit_card" flat color="rgba(201, 60, 47,0.8)">
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
												Numéro: <strong>{{ transfer_detail.credit_card.card_number_fr
													}}</strong>
											</div>
											<br>
											<div v-if="transfer_detail.credit_card.lot"
												style="color: white;font-weight: 150px;">
												Lot: <strong>{{
													transfer_detail.credit_card.lot?.first_card_number_fr
												}}</strong>
											</div>
											<div v-if="transfer_detail.credit_card.lot"
												style="color: white;font-weight: 150px;">
												Référence de la facture: <strong>{{
													transfer_detail.credit_card.invoice_reference
												}}</strong>
											</div>

											<div style="color: white;font-weight: 150px;">
												Receptioniste: <strong>{{
													transfer_detail.credit_card.receptionist.name
												}}</strong>
											</div>
											<div style="color: white;font-weight: 150px;">
												Possesseur: <strong>{{ transfer_detail.credit_card.possessor.name
													}}</strong>
											</div>
										</div>

										<VSpacer />

										<div class="d-flex flex-column text-sm-end">
											<span style="color: white;"
												class="text-body-2 my-4 order-sm-1 order-0">Livré le {{
													transfer_detail.credit_card.delivery_date_fr
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
