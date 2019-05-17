let actions = {
    createResource({commit}, objResource,config) {
        axios.post('/api/resources', objResource,config)
            .then(response => {
                commit('CREATE_RESOURCE', response.data)
            }).catch(error => {
            console.log(error)
        })

    },

    addCollectionToResource({commit},  payload) {
        axios.post('/api/resources/'+payload.intResourceId,payload.objResource)
            .then(response => {
                commit('ADD_REMOVE_COLLECTION_TO_RESOURCE', {objResource: response.data})
            }).catch(error => {
            console.log(error)
        })

    },

    removeCollectionToResource({commit},  payload) {
        axios.post('/api/resources/remove/'+payload.intResourceId,payload.objResource)
            .then(response => {
                commit('ADD_REMOVE_COLLECTION_TO_RESOURCE', {objResource: response.data})
            }).catch(error => {
            console.log(error)
        })

    },
    fetchResourcesCollections({commit}) {
        axios.get('/api/resources')
            .then(response => {
                commit('FETCH_RESOURCES_COLLECTIONS', response.data)
                console.log(response.data)
            }).catch(error => {
             console.log(error)
        })
    },
    fetchCollectionsResources({commit}) {
        axios.get('/api/collections')
            .then(response => {
                commit('FETCH_COLLECTIONS_RESOURCES', response.data)
            }).catch(error => {
            console.log(error)
        })
    },
    deleteResource({commit}, objResource) {
        axios.delete(`/api/resources/${objResource.id}`)
            .then(response => {
                    commit('DELETE_RESOURCE', response.data)
                console.log(response.data)
            }).catch(error => {
        })
    },
    updateResource({commit}, objResource) {
        axios.post('/api/resources/update/'+objResource.id,objResource)
            .then(response => {
                    commit('UPDATE_RESOURCE', response.data)
            }).catch(error => {
            console.log(error)
        })
    },
    createCollection({commit}, objCollection) {
        axios.post('/api/collections', objCollection)
            .then(response => {
                commit('CREATE_COLLECTION', response.data)
            }).catch(error => {
            console.log(error)
        })

    },
    deleteCollection({commit}, objCollection) {
        console.log()
        axios.delete(`/api/collections/${objCollection.id}`)
            .then(response => {
                    commit('UPDATE_COLLECTION', response.data)
            }).catch(error => {

        })
    },
    updateCollection({commit}, collection) {
        axios.post('/api/collections/update/'+collection.id,collection)
            .then(response => {
                    commit('UPDATE_COLLECTION', response.data)
            }).catch(error => {
            console.log(error)
        })
    },
    addResourceToCollection({commit},  payload) {
        axios.post('/api/collections/'+payload.intCollectionId,payload.objCollection)
            .then(response => {
                commit('ADD_REMOVE_RESOURCE_TO_COLLECTION', {objCollection: response.data})
            }).catch(error => {
            console.log(error)
        })

    },

    removeResourceToCollection({commit},  payload) {
        axios.post('/api/collections/remove/'+payload.intCollectionId,payload.objCollection)
            .then(response => {
                commit('ADD_REMOVE_RESOURCE_TO_COLLECTION', {objCollection: response.data})
            }).catch(error => {
            console.log(error)
        })

    },
    addToResourceFavorite({commit}, resource) {

        axios.post('/api/resources/add_to_favortted/' + resource.id, resource)
            .then(response => {
                    commit('FAVORITES_RESOURCE', {id: response.data.id})
            }).catch(error => {
            console.log(error)
        })
    },
    searchResourceCollection({commit}, search) {
        axios.post('/resources/search/data' , search)
            .then(response => {
                commit('SEARCH_RESOURCE_COLLECTION', response.data)
            }).catch(error => {
            console.log(error)
        })
    },
    addToCollectionFavorite({commit}, collection) {

        axios.post('/api/collections/add_to_favortted/' + collection.id, collection)
            .then(response => {
                commit('FAVORITES_COLLECTION', {id: response.data.id})
            }).catch(error => {
            console.log(error)
        })
    },

    elasticSearchData({commit}, payload) {
        axios.post('/elasticsearch' ,payload)
            .then(response => {
                commit('ELASTIC_SEARCH',response.data)
            }).catch(error => {
            console.log(error)
        })
    }
}

export default actions
