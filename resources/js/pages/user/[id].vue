<script setup>
import avatar from '@images/avatars/avatar-1.png'
definePage({
	meta: {
		action: 'read',
		subject: 'user',
	},
})
const router = useRouter()
const route = useRoute("user-id")
let nextRoute = "/user";


const { data: user } = await useApi(
	createUrl(`/user/${Number(route.params.id)}`, {
		query: {
			with_agency: 'true',
		},
	})
)

if (user.value.status == 200) {
	user.value = user.value.data.user
} else {
	router.push("/user")
}

</script>

<template>
	<section v-if="user">
		<VRow>
			<VCol cols="12">
				<VCard>
					<!-- SECTION Header -->
					<VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
						<VCol cols="10">
							<VBtn prepend-icon="tabler-arrow-narrow-left" :to="nextRoute">
								Utilisateurs
							</VBtn>
						</VCol>
					</VCardText>
					<VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row text-lg">
						<VCol>
							<VCard v-if="user">
								<VCardText class="text-center pt-12">
									<!-- 👉 Avatar -->
									<VAvatar rounded :size="100" :color="!avatar ? 'primary' : undefined"
										:variant="!avatar ? 'tonal' : undefined">
										<VImg v-if="avatar" :src="avatar" />
										<span v-else class="text-5xl font-weight-medium">
											{{ avatarText(user.fullName) }}
										</span>
									</VAvatar>


									<!-- 👉 User fullName -->
									<h5 class="text-h5 mt-4">
										{{ user.name }}
									</h5>

									<!-- 👉 Role chip -->
									<VChip label color="secondary" size="small" class="text-capitalize mt-4">
										{{ user.profile_fr }}
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
												<span class="text-sm">Nombre de transferts</span>
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
													Email:
													<div class="d-inline-block text-body-1">
														{{ user.email }}
													</div>
												</h6>
												<h6 class="text-h6">
												Activation:
													<div class="text-link text-base font-weight-medium d-inline-block">
														{{ { false: 'Désactivé', true: 'Activé' }[user.activated] }}
													</div>
												</h6>
												<h6 class="text-h6">
													Changement de mot de passe:
													<div class="text-link text-base font-weight-medium d-inline-block">
														{{ { true: 'Obligatoire', false: 'Facultatif' }[user.password_change_required] }}
													</div>
												</h6>
											</VListItemTitle>
										</VListItem>
									</VList>
								</VCardText>
							</VCard>
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
