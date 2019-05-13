<?php

namespace App\Http\Controllers;

use App\Helpers\CreateSlug;
use App\Module\Resource;
use App\Module\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use App\Http\Requests\StoreAddResourceToCollection;

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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getIndexData() {

        $arrObjResources    = Resource::with('collections')->latest()->paginate(5);
        $arrObjCollections  = Collection::all();
        return response()->json(["arrObjResources" => $arrObjResources, "arrObjCollections" => $arrObjCollections]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {

        return view('create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $objResourcetoCollectionRequest) {
//     dd($objResourcetoCollectionRequest->file_upload);
//        $file_upload = $objResourcetoCollectionRequest->file('file_upload')->store('upload');
        $file_upload   = $objResourcetoCollectionRequest->file('file_upload');
        $strNewName = rand() . '.' .  $file_upload->getClientOriginalExtension();

        $file_upload->move(public_path('file_upload'), $strNewName);

        $arrFormData = array(
            'title'       => $objResourcetoCollectionRequest->title,
            'slug'        => (new CreateSlug())->get($objResourcetoCollectionRequest->title),
            'description' => $objResourcetoCollectionRequest->description,
            'file_upload' => $strNewName
        );

        $objResource = Resource::create($arrFormData);

        return response()->json($objResource);
    }


    public function update(Request $objResourceUpdateRequest,$intResourceId) {

        $objResource = Resource::find($intResourceId);
        $arrFormData = array(
            'title'       => $objResourceUpdateRequest->title,
            'slug'        => (new CreateSlug())->get($objResourceUpdateRequest->title),
            'description' => $objResourceUpdateRequest->description
//            'file_upload'        =>   $objResourcetoCollectionRequest->file_upload
        );
        $objResource->update($arrFormData);

        return response()->json($objResource);
    }


    /**
     * Show the form for delete the specified resource.
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id) {

            Resource::destroy($id);
       $arrObjResources    = Resource::all();
       $arrObjCollections  = Collection::all();
        return response()->json(["arrObjResources" => $arrObjResources, "arrObjCollections" => $arrObjCollections]);
//        return view('resource.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $intId
     * @return \Illuminate\Http\Response
     */
    public function show() {
        // $resource      = Resource::findOrFail($intId);
        $arrObjCollection = Collection::all();
        return response()->json($arrObjCollection);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  $obRequest
     * @param  $intResourceId
     * @return \Illuminate\Http\Response
     */
    public function postAddCollectionToResource(Request $objRequest, $intResourceId) {
        $objResource      = Resource::find($intResourceId);
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


    public function resourceSearch(Request $objRequest) {
//        $objSearch    = $objRequest->search;
        $arrObjSearch = Resource::where('title',$objRequest->search)->get();
        return response()->json($arrObjSearch);

    }
}
