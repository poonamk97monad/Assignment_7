let mutations = {
    CREATE_RESOURCE(state, payload) {
        state.arrObjResources    = payload.arrObjResources
        state.arrObjCollections  = payload.arrObjCollections
    },

    FETCH_RESOURCES_COLLECTIONS(state, payload) {
        state.arrObjResources    = payload.arrObjResources
        state.arrObjCollections  = payload.arrObjCollections
    },

    FETCH_COLLECTIONS_RESOURCES(state, payload) {
        state.arrObjCollections  = payload.arrObjCollections
        state.arrObjResources    = payload.arrObjResources

    },

    FAVORITES_RESOURCE(state, response) {
        let intId = response.id;
        state.arrObjResources.data.forEach(function(item ,i) {
            if(item.id == intId) {
                state.arrObjResources.data[i].is_favortted = !item.is_favortted;
            }
        });
    },

    FAVORITES_COLLECTION(state, response) {
        let intId = response.id;
        state.arrObjCollections.data.forEach(function(item ,i) {
            if(item.id == intId) {
                state.arrObjCollections.data[i].is_favortted = !item.is_favortted;
            }
        });
    },

    DELETE_RESOURCE(state, payload) {
        state.arrObjResources    = payload.arrObjResources
        state.arrObjCollections  = payload.arrObjCollections
    },

    ADD_REMOVE_COLLECTION_TO_RESOURCE(state, payload) {
        state.objResourcesView = payload.objResource
    },

    ADD_REMOVE_RESOURCE_TO_COLLECTION(state, payload) {
        state.objCollectionsview = payload.objCollection
    },

    VIEW_RESOURCE(state, payload) {
        state.objResourcesView = payload.objResource
    },

    UPDATE_RESOURCE(state,payload) {
        state.arrObjResources    = payload.arrObjResources
        state.arrObjCollections  = payload.arrObjCollections
    },

    CREATE_COLLECTION(state, payload) {
        state.arrObjCollections  = payload.arrObjCollections
        state.arrObjResources    = payload.arrObjResources
    },

    UPDATE_COLLECTION(state,payload) {
        state.arrObjCollections  = payload.arrObjCollections
        state.arrObjResources    = payload.arrObjResources
    },

    VIEW_COLLECTION(state, payload) {
        state.objCollectionsview = payload.objCollection
    },

    SEARCH_RESOURCE_COLLECTION(state, payload) {
        state.arrObjSearchPageData    = payload
    },

    SEARCH_COLLECTION(state, payload) {
        state.arrObjCollections = payload
    },

    ELASTIC_SEARCH(state, payload){
        state.arrObjElasticSearchResult = payload
    }
}
export default mutations
