<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/accounts/{number}')->group(function () {
    Route::get('/', 'Api\AccountController@show');
    Route::post('/move', 'Api\AccountController@move');
    Route::post('/movements', 'Api\AccountController@movements');
    Route::post('/balance', 'Api\AccountController@balance');
});