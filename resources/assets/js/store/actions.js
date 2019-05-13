let actions = {
    createResource({commit}, resource) {
        axios.post('/api/resources', resource)
            .then(response => {
                commit('CREATE_RESOURCE', response.data)
                // window.location.reload();
            }).catch(error => {
            console.log(error)
        })

    },

    addCollectionToResource({commit},  payload) {
        axios.post('/api/resources/'+payload.intResourceId,payload.resource)
            .then(response => {
                commit('ADD_REMOVE_COLLECTION_TO_RESOURCE', {objResource: response.data})
            }).catch(error => {
            console.log(error)
        })

    },

    removeCollectionToResource({commit},  payload) {
        axios.post('/api/resources/remove/'+payload.intResourceId,payload.resource)
            .then(response => {
                commit('ADD_REMOVE_COLLECTION_TO_RESOURCE', {objResource: response.data})
            }).catch(error => {
            console.log(error)
        })

    },
    fetchResourcesCollections({commit},payload) {
        axios.get('/api/resources')
            .then(response => {
                commit('FETCH_RESOURCES_COLLECTIONS', response.data)
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
    // viewResource({commit}, intId) {
    //     console.log(intId)
    //     axios.get('/api/resources/'+intId)
    //         .then(resource => {
    //             commit('VIEW_RESOURCE', resource)
    //
    //         }).catch(err => {
    //         console.log(err)
    //     })
    // },
    deleteResource({commit}, resource) {
        axios.delete(`/api/resources/${resource.id}`)
            .then(response => {
                if (response.data === 'ok')
                    commit('DELETE_RESOURCE', resource)
                window.location.reload();
            }).catch(error => {
            // console.log(error)
        })
    },
    updateResource({commit}, resource) {
        axios.post('/api/resources/update/'+resource.id,resource)
            .then(response => {

                if (response.data === 'ok')
                    commit('UPDATE_RESOURCE', resource)
                window.location.reload();
            }).catch(error => {
            console.log(error)
        })
    },
    createCollection({commit}, collection) {
        axios.post('/api/collections', collection)
            .then(response => {
                commit('CREATE_COLLECTION', response.data)
                // window.location.reload();
            }).catch(error => {
            console.log(error)
        })

    },
    deleteCollection({commit}, collection) {
        axios.delete(`/api/collections/${collection.id}`)
            .then(response => {
                if (response.data === 'ok')
                    commit('DELETE_COLLECTION', collection)
                window.location.reload();
            }).catch(error => {
            // console.log(error)
        })
    },
    updateCollection({commit}, collection) {
        axios.post('/api/collections/update/'+collection.id,collection)
            .then(response => {

                if (response.data === 'ok')
                    commit('UPDATE_COLLECTION', collection)
                window.location.reload();
            }).catch(error => {
            console.log(error)
        })
    },
    // viewCollection({commit}, intId) {
    //     console.log(intId)
    //     axios.get('/api/collections/'+intId)
    //         .then(collection => {
    //             commit('VIEW_COLLECTION', collection)
    //
    //         }).catch(err => {
    //         console.log(err)
    //     })
    // },

    addResourceToCollection({commit},  payload) {
        axios.post('/api/collections/'+payload.intCollectionId,payload.collection)
            .then(response => {
                commit('ADD_REMOVE_RESOURCE_TO_COLLECTION', {objCollection: response.data})
            }).catch(error => {
            console.log(error)
        })

    },

    removeResourceToCollection({commit},  payload) {
        axios.post('/api/collections/remove/'+payload.intCollectionId,payload.collection)
            .then(response => {
                commit('ADD_REMOVE_RESOURCE_TO_COLLECTION', {objCollection: response.data})
            }).catch(error => {
            console.log(error)
        })

    },
    addToResourceFavortted({commit}, resource) {

        axios.post('/api/resources/add_to_favortted/' + resource.id, resource)
            .then(response => {
                    commit('FAVORITES_RESOURCE', {id: response.data.id})
            }).catch(error => {
            console.log(error)
        })
    },
    searchResource({commit}, resource) {
        axios.post('/resources/search' , resource)
            .then(response => {
                commit('SEARCH_RESOURCE', response)
                // console.log(response)
            }).catch(error => {
            console.log(error)
        })
    },
    searchCollection({commit}, resource) {
        axios.post('/collections/search' , resource)
            .then(response => {
                commit('SEARCH_COLLECTION', response)
                // console.log(response)
            }).catch(error => {
            console.log(error)
        })
    },
    addToCollectionFavortted({commit}, collection) {

        axios.post('/api/collections/add_to_favortted/' + collection.id, collection)
            .then(response => {
                commit('FAVORITES_COLLECTION', {id: response.data.id})
            }).catch(error => {
            console.log(error)
        })
    }
}

export default actions
