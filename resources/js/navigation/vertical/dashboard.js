export default [
	{
		icon: { icon: 'tabler-credit-card' },
		title: 'Cartes',
		subject: 'credit-card',
		action: 'read',
		children: [
			{
				title: 'Ajouter',
				to: 'credit-card-add',
				action: 'create',
				subject: 'credit-card',
			},{
				title: 'Modifier prix',
				to: 'credit-card-update-price',
				action: 'update-price',
				subject: 'credit-card',
			}, {
				title: 'En Stock',
				to: 'credit-card',
				action: 'read',
				subject: 'credit-card',
			}, {
				title: 'Vendus',
				to: 'credit-card-historical',
				action: 'historical',
				subject: 'credit-card',
			}
		],
	}, {
		icon: { icon: 'tabler-transfer' },
		title: 'Transferts',
		subject: 'transfer',
		action: 'read',
		children: [
			{
				title: 'Nouveau',
				to: 'transfer-add',
				action: 'create',
				subject: 'transfer',
			}, {
				title: 'En attente',
				to: 'transfer',
				action: 'read',
				subject: 'transfer',
			}, {
				title: 'Historique',
				to: 'transfer-historical',
				action: 'historical',
				subject: 'transfer',
			}
		],
	}, {
		icon: { icon: 'tabler-coin' },
		title: 'Ventes',
		subject: 'sale',
		action: 'read',
		children: [
			{
				title: 'Nouveau',
				to: 'sale-add',
				action: 'create',
				subject: 'sale',
			}, {
				title: 'Historique',
				to: 'sale',
				action: 'read',
				subject: 'sale',
			}
		],
	}, {
		icon: { icon: 'tabler-user' },
		title: 'Utilisateurs',
		subject: 'user',
		action: 'read',
		children: [
			{
				title: 'Nouveau',
				to: 'user-add',
				action: 'create',
				subject: 'user',
			}, {
				title: 'Historique',
				to: 'user',
				action: 'read',
				subject: 'user',
			}
		],
	},
]
