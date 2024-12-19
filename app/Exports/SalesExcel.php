<?php

namespace App\Exports;

use App\Models\Sale;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class SalesExcel implements FromCollection, WithHeadings, WithMapping
{
	/**
	 * @return \Illuminate\Support\Collection
	 */
	public function collection()
	{
		// return Sale::all();
		return collect(DB::select("
			select
				cc.card_number CARTE,
				s.customer_type TYPE_CLIENT,
				s.customer_name NOM_CLIENT,
				s.account_number NO_COMPTE,
				ats.name TYPE_COMPTE,
				s.comment COMMENTAIRE,
				u.name VENDEUR,
				s.sale_price PRIX_VENTE,
				s.customer_phone_number TEL_CLIENT,
				STR_TO_DATE(s.created_at, '%Y-%m-%d %H:%i:%s') DATE_VENTE
			from
				sales s
				join users u on s.seller_id = u.id
				join account_types ats on s.account_type_id = ats.id
				join credit_cards cc on s.credit_card_id = cc.id
			order by s.created_at desc
		"));
	}

	public function headings(): array
	{
		// Spécifiez les titres des colonnes dans l'ordre souhaité.
		return [
			'CARTE',
			'TYPE_CLIENT',
			'NOM_CLIENT',
			'NO_COMPTE',
			'TYPE_COMPTE',
			'COMMENTAIRE',
			'VENDEUR',
			'PRIX_VENTE',
			'TEL_CLIENT',
			'DATE_VENTE',
		];
	}

	public function map($row): array
    {
		$formattedDate = \DateTime::createFromFormat('d/m/Y H:i:s', $row->DATE_VENTE);
        return [
            $row->CARTE,
            $row->TYPE_CLIENT,
            $row->NOM_CLIENT,
            $row->NO_COMPTE,
            $row->TYPE_COMPTE,
            $row->COMMENTAIRE,
            $row->VENDEUR,
            $row->PRIX_VENTE,
            $row->TEL_CLIENT,
			$formattedDate ? $formattedDate->format('Y-m-d H:i:s') : $row->DATE_VENTE, // Gérer les erreurs de formatage
        ];
    }
}
