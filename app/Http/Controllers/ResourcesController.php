<?php

namespace App\Http\Controllers;

use App\Helpers\CreateSlug;
use App\Module\Resource;
use App\Module\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ResourcesController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $arrObjResource = Resource::latest()->paginate(5);
        return view('resource.index', compact('arrObjResource'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }

    /**
     * Display the specified resource.
     * @return \Illuminate\Http\Response
     */
    public function getIndexData() {
        $arrObjResources    = Resource::with('collections')->latest()->paginate(5);
        $arrObjCollections  = Collection::all();
        return response()->json(["arrObjResources" => $arrObjResources, "arrObjCollections" => $arrObjCollections]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $objResourceRequest
     * @return json
     */
    public function postStoreResource(Request $objResourceRequest) {
        $arrFormData = array(
            'title'       => $objResourceRequest->title,
            'slug'        => (new CreateSlug())->get($objResourceRequest->title),
            'description' => $objResourceRequest->description,
        );
        $objResource = Resource::create($arrFormData);
        return response()->json($objResource);
    }

    /**
     *update resource in storage.
     *
     * @param  \Illuminate\Http\Request $objResourceUpdateRequest
     * @param  id $intResourceId
     * @return json
     */

    public function postUpdateResource(Request $objResourceUpdateRequest,$intResourceId) {
        $objResource = Resource::find($intResourceId);
        $arrFormData = array(
            'title'       => $objResourceUpdateRequest->title,
            'slug'        => (new CreateSlug())->get($objResourceUpdateRequest->title),
            'description' => $objResourceUpdateRequest->description
        );
        $objResource->update($arrFormData);
        return response()->json($objResource);
    }

    /**
     * Show the form for delete the specified resource.
     * @param  int $intId
     * @return json
     */
    public function deleteResource($intId) {
        Resource::destroy($intId);
        $arrObjResources    = Resource::all();
        $arrObjCollections  = Collection::all();
        return response()->json(["arrObjResources" => $arrObjResources, "arrObjCollections" => $arrObjCollections]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  $objRequest
     * @param  $intResourceId
     * @return json
     */
    public function postAddCollectionToResource(Request $objRequest, $intResourceId) {
        $objResource = Resource::find($intResourceId);
        $objResource->collections()->attach($objRequest->id);
        $objResource->collections;
        return response()->json($objResource);
    }

    /**
     * Remove the specified resource from storage.
     * @param  $intResourceId
     * @return \Illuminate\Http\Response
     */
    public function postRemoveCollectionToResource(Request $objRequest, $intResourceId) {
        $objResource = Resource::find($intResourceId);
        $objResource->collections()->detach($objRequest->id);
        $objResource->collections;
        return response()->json($objResource);
    }

    /**
     * Add in favrite
     * @param $intUserId
     * @return redirect
     */
    public function postSetFavorite($intUserId) {
        $boolIsFavoritted = Redis::SISMEMBER('favorite:vueresource', $intUserId);
        if ($boolIsFavoritted == 1) {
             Redis::srem('favorite:vueresource', $intUserId);
        }
        else {
             Redis::sadd('favorite:vueresource', $intUserId);
        }
        return response()->json(['id' => $intUserId, 'status' => 200, 'message', 'Success']);
    }

    /**
     * for search  specified resource
     * @param $objRequest
     * @return json
     */
    public function search() {
        return view('search');

    }
    public function searchResourceCollection(Request $objRequest) {
        $objSearch = $objRequest->search;

        $arrObjSearchResult = [];

        if (isset($objRequest->modeltype)) {
            $objFilter = $objRequest->modeltype;
            if ('resource' == $objFilter) {
                $arrObjSearchResult = Resource::where('title', $objSearch)->orWhere('title', 'like', '%' . $objSearch . '%');
            }
            else if ('collection' == $objFilter) {
                $arrObjSearchResult = Collection::where('title', $objSearch)->orWhere('title', 'like', '%' . $objSearch . '%');
            }
        }
        if (isset($objRequest->idsort)) {
            $objSort = $objRequest->idsort;
            if ('descending' == $objSort) {
                $arrObjSearchResult = $arrObjSearchResult->orderBy('title', 'desc');
            }
            if ('ascending' == $objSort) {
                $arrObjSearchResult = $arrObjSearchResult->orderBy('title', 'asc');
            }
        }
         $arrObjSearchResult = $arrObjSearchResult->get();

        return response()->json(["arrObjSearchResult" => $arrObjSearchResult]);

    }
}
