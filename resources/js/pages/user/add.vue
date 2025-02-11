<!-- eslint-disable camelcase -->
<script setup>
definePage({
	meta: {
		action: 'create',
		subject: 'user',
	},
})
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue';
import AppTextField from '@/@core/components/app-form-elements/AppTextField.vue';
import { ref } from 'vue'

const router = useRouter()

const userData = ref({
	name: "test",
	email: "test@gmail.com",
	password: "P@sse123",
	profile: "marketing_manager",
	activated: false,
	password_change_required: true,
	agency_id: 1,
})

const getResetTransferError = () => {
	return {
		name: "",
		email: "",
		password: "",
		profile: "",
		activated: "",
		password_change_required: "",
		agency_id: "",
	}
}
const userError = ref(getResetTransferError())


const refForm = ref()

const onSubmit = () => {
	refForm.value?.validate().then(async ({ valid }) => {
		if (valid) {
			const res = await $api('/user', {
				method: 'POST',
				body: {
					name: userData.value.name,
					email: userData.value.email,
					password: userData.value.password,
					profile: userData.value.profile,
					activated: userData.value.activated,
					password_change_required: userData.value.password_change_required,
					agency_id: userData.value.agency_id,
				},
			})

			userError.value = getResetTransferError()
			if (res.status == 201) {
				snackbarMessage.value = "Utilisateur crée"
				snackbarCollor.value = "success"
				isSnackbarScrollReverseVisible.value = true
				router.push("/user")
			} else {
				if (res.errors.name) {
					userError.value["name"] = res.errors.name[0]
					res.errors.name = null
				}
				if (res.errors.email) {
					userError.value["email"] = res.errors.email[0]
					res.errors.email = null
				}
				if (res.errors.password) {
					userError.value["password"] = res.errors.password[0]
					res.errors.password = null
				}
				if (res.errors.profile) {
					userError.value["profile"] = res.errors.profile[0]
					res.errors.profile = null
				}
				if (res.errors.activated) {
					userError.value["activated"] = res.errors.activated[0]
					res.errors.activated = null
				}
				if (res.errors.password_change_required) {
					userError.value["password_change_required"] = res.errors.password_change_required[0]
					res.errors.password_change_required = null
				}
				if (res.errors.agency_id) {
					userError.value["agency_id"] = res.errors.agency_id[0]
					res.errors.agency_id = null
				}
				snackbarMessage.value = ""
				let show = false
				for (const key in res.errors) {
					if(res.errors[key] != null){
						snackbarCollor.value = "error"
						res.errors[key].forEach(message => {
							show = true;
							snackbarMessage.value += key + ": " + message + "<br>";
						})
					}
				}
				isSnackbarScrollReverseVisible.value = show
			}
			nextTick(() => {
				// refForm.value?.reset()
				refForm.value?.resetValidation()
			})
		}
	})
}
const {
	data: agencyListData,
} = await useApi(createUrl(`/agency`, {
	query: {
		"paginate": 'false'
	},
}))

const isSnackbarScrollReverseVisible = ref(false)
const snackbarMessage = ref("")
const snackbarCollor = ref("success")
const agencyList = computed(() => agencyListData.value.data)
const isPasswordVisible = ref(false)
</script>

<template>
	<div>
		<div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
			<div class="d-flex flex-column justify-center">
				<h4 class="text-h4 font-weight-medium">
					Ajouter un utilisateur
				</h4>
				<span>Informations sur l'utilisateur</span>
			</div>
		</div>
		<VForm ref="refForm" @submit.prevent="onSubmit">
			<VRow>
				<VCol md="12">
					<!-- 👉 PV Information -->
					<VCard class="mb-6" title="Information du pv">
						<VCardText>
							<VRow>
								<VCol cols="12" md="12" lg="6">
									<AppTextField v-model="userData.name" :error-messages="userError.name"
										label="Nom" />
								</VCol>
								<VCol cols="12" md="12" lg="6">
									<AppTextField v-model="userData.email" :error-messages="userError.email"
										type="email" label="Email" />
								</VCol>
								<VCol cols="12" md="12" lg="6">
									<AppSelect v-model="userData.profile"
										:items="[{ 'name': 'Administrateur', 'id': 'admin' }, { 'name': 'Chargé de clientèle', 'id': 'responsible_for_customer' }, { 'name': 'Responsable marketing', 'id': 'marketing_manager' }, { 'name': 'Chef d\'agence', 'id': 'agency_head' }, { 'name': 'Controlleur interne', 'id': 'audit_controller' },{ 'name': 'Chargé d\'affaires', 'id': 'caf' },{ 'name': 'Operations', 'id': 'ops' }]"
										:error-messages="userError.profile" label="Profile" item-title="name"
										item-value="id" required />
								</VCol>
								<VCol cols="12" md="12" lg="6">
									<AppAutocomplete v-model="userData.agency_id" :items="agencyList"
										:error-messages="userError.agency_id" label="Agency" item-title="name"
										item-value="id" required />
								</VCol>
								<VCol cols="12" md="12" lg="6">
									<AppSelect v-model="userData.activated"
										:items="[{ 'name': 'Activé', 'id': true }, { 'name': 'Désactivé', 'id': false }]"
										:error-messages="userError.activated" label="Activation" item-title="name"
										item-value="id" required />
								</VCol>
								<VCol cols="12" md="12" lg="6">
									<AppSelect v-model="userData.password_change_required"
										:items="[{ 'name': 'Obligatoire', 'id': true }, { 'name': 'Facultatif', 'id': false }]"
										:error-messages="userError.password_change_required"
										label="Changement de mot de passe" item-title="name" item-value="id" required />
								</VCol>
								<VCol cols="12" md="12" lg="12">
									<AppTextField v-model="userData.password" label="Password"
										placeholder="············" :rules="[requiredValidator]"
										:type="isPasswordVisible ? 'text' : 'password'"
										:error-messages="userError.password"
										:append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
										@click:append-inner="isPasswordVisible = !isPasswordVisible" class="mb-8" />
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
			<div v-html="snackbarMessage"></div>
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
