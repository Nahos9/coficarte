<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('{any?}', function () {
	return view('application');
})->where('any', '.*');

// Route::get('/', function () {
//     try {
//         // $results = DB::connection('oracle')->select("SELECT * FROM cofina.client LIMIT 4 ");
// 		$results = DB::connection('oracle')->select("SELECT * FROM cofina.ecriture WHERE no_compte = '371360000368' FETCH FIRST 4 ROWS ONLY");
//         dd("Connexion réussie !", $results);
//     } catch (\Exception $e) {
//         dd("Erreur de connexion : " . $e->getMessage());
//     }
// });

// $ecritures = DB::connection('oracle')
// 		->select('SELECT * FROM cofina.ecriture WHERE FETCH LAST 4 ROWS ONLY');
// 		return $this->responseOk([
// 			"ecritures" => $ecritures
// 		]);