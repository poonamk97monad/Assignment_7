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
//    Route::post('resources/submit', 'ResourcesController@store');
});
Route::post('resources', 'ResourcesController@store');

Route::get('resources', 'ResourcesController@getIndexData');


Route::delete('resources/{id}', 'ResourcesController@delete');

Route::post('resources/{id}', 'ResourcesController@postAddCollectionToResource');
Route::post('resources/remove/{id}', 'ResourcesController@postRemoveCollectionToResource');

Route::post('/resources/update/{id}', 'ResourcesController@update');
Route::post('resources/add_to_favortted/{id}', 'ResourcesController@postSetFavorite');


Route::post('collections','CollectionsController@store');

Route::get('collections', 'CollectionsController@getindex');

Route::delete('collections/{id}', 'CollectionsController@delete');

Route::post('/collections/update/{id}', 'CollectionsController@update');

Route::post('collections/{id}', 'CollectionsController@postAddResourceToCollection');

Route::post('collections/remove/{id}', 'CollectionsController@postRemoveResourceToCollection');


Route::post('add_favorites_resource/{id}','ResourcesController@postSetFavorite');


//


Route::post('collections/add_to_favortted/{id}', 'CollectionsController@postSetFavorite');
