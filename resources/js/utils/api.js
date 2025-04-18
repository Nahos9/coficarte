import { ofetch } from 'ofetch'

const $api = ofetch.create({

	baseURL: '/api',
	onRequest:
		async ({ options }) => {
			options.headers = {
				...options.headers,
				Accept: 'application/json',
			}

			const userToken = useCookie('userToken').value
			if (userToken) {
				options.headers = {
					...options.headers,
					Authorization: `Bearer ${userToken}`,
				}
			}
		},
	onResponse: async ({ response }) => {
		if (response.status === 401) {
			useCookie('userToken').value = null
			useCookie('userData').value = null
			useCookie('userAbilityRules').value = null
			const ability = useAbility()
			ability.update([])
			window.location.href = '/login';
		} else if (response._data.status === 403) {
			if (response._data.errors.sub_code[0] == "002") {
				useCookie('userToken').value = null
				useCookie('userData').value = null
				useCookie('userAbilityRules').value = null
				window.location.href = '/not-authorized';
			}
			else if (response._data.errors.sub_code[0] == "002") {
				if (window.location.href != '/settings/user/security') {
					window.location.href = '/settings/user/security';
				}
			}
		}
	},
})

export { $api }
