<?php

use App\Exports\SalesExcel;
use App\Http\Controllers\API\AccountTypeController;
use App\Http\Controllers\API\AgencyController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CreditCardController;
use App\Http\Controllers\API\SaleController;
use App\Http\Controllers\API\TransferController;
use App\Http\Controllers\API\UserController;
use App\Models\CreditCard;
use Illuminate\Support\Facades\Route;
use Maatwebsite\Excel\Facades\Excel;


Route::post('auth/login', [AuthController::class, "login"])->name("auth.login");
Route::middleware('auth:sanctum')->group(function () {
	Route::prefix("/auth")->name("auth.")->group(function () {
		Route::get('show', [AuthController::class, "show"])->name("show");
		Route::delete('logout', [AuthController::class, "logout"])->name("logout");
	});
	Route::prefix("agency")->name("agency.")->group(function () {
		Route::get("/", [AgencyController::class, "index"])->name("index");
		Route::get("/{id}", [AgencyController::class, "show"])->name("show");
		Route::post("/", [AgencyController::class, "store"])->name("store");
		Route::put("/{id}", [AgencyController::class, "update"])->name("update");
		Route::delete("/{id}", [AgencyController::class, "destroy"])->name("destroy");
	});
	Route::prefix("user")->name("user.")->group(function () {
		Route::get("/", [UserController::class, "index"])->name("index");
		Route::get("/{id}", [UserController::class, "show"])->name("show");
		Route::post("/", [UserController::class, "store"])->name("store");
		Route::put("/update-password", [UserController::class, "update_password"])->name("update-password");
		Route::put("/{id}", [UserController::class, "update"])->name("update");
		Route::delete("/{id}", [UserController::class, "destroy"])->name("destroy");
	});
	Route::prefix("credit-card")->name("credit-card.")->group(function () {
		Route::get("/", [CreditCardController::class, "index"])->name("index");
		Route::get("/stats",[CreditCardController::class,"statistiques"])->name("statistiques");
		Route::post("/return-credit-card",[CreditCardController::class,"returnCard"])->name("returnCard");
		Route::post("/validate-return-credit-card",[CreditCardController::class,"valideReturnCard"])->name("valideReturnCard");
		Route::get("/{id}", [CreditCardController::class, "show"])->name("show");
		Route::post("/", [CreditCardController::class, "store"])->name("store");
		Route::put("/update-price", [CreditCardController::class, "update_price"])->name("update-price");
		Route::put("/{id}", [CreditCardController::class, "update"])->name("update");
		Route::delete("/{id}", [CreditCardController::class, "destroy"])->name("destroy");
		// Route::get('/stats',[CreditCardController::class,"statistiques"])->name("statistiques");

	});
	Route::prefix("transfer")->name("transfer.")->group(function () {
		Route::get("/", [TransferController::class, "index"])->name("index");
		Route::get("/{id}", [TransferController::class, "show"])->name("show");
		Route::post("/", [TransferController::class, "store"])->name("store");
		Route::put("/trate/{id}", [TransferController::class, "trate"])->name("trate");
	});

	Route::prefix("account-type")->name("account-type.")->group(function () {
		Route::get("/", [AccountTypeController::class, "index"])->name("index");
		Route::get("/{id}", [AccountTypeController::class, "show"])->name("show");
		Route::post("/", [AccountTypeController::class, "store"])->name("store");
		Route::put("/{id}", [AccountTypeController::class, "update"])->name("update");
		Route::delete("/{id}", [AccountTypeController::class, "destroy"])->name("destroy");
	});

	Route::prefix("sale")->name("sale.")->group(function () {
		Route::get("/", [SaleController::class, "index"])->name("index");
		Route::get("/{id}", [SaleController::class, "show"])->name("show");
		Route::post("/", [SaleController::class, "store"])->name("store");
		Route::put("/{id}", [SaleController::class, "update"])->name("update");
		Route::put("/unlock/{id}", [SaleController::class, "unlock"])->name("unlock");
		Route::delete("/{id}", [SaleController::class, "destroy"])->name("destroy");
		Route::get("/download/excel", [SaleController::class, "download"]);
	});

	Route::apiResource('sales', SaleController::class);
	// Route::get('/stats',[CreditCardController::class,"statistiques"])->name("statistiques")
});
Route::get('/ecritures/search',[UserController::class,'ecritures'])->name("ecritures");

