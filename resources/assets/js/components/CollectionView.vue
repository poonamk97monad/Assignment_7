<template>
    <div>
        <button class="btn btn-info" @click="viewCollection(objCollection)">Back</button>
        <div class="container" >
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">Example Component</div>
                        <center>
                            <h4>ID          :{{objCollectionsview.id}}</h4>
                            <h4>TITLE       :{{objCollectionsview.title}}</h4>
                            <h5>SLUG        :{{objCollectionsview.slug}}</h5>
                            <h5>DESCRIPTION :{{objCollectionsview.description}}</h5>
                        </center>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#collection">Add collection</button>
        <div>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Slug</th>
                    <th scope="col">Description</th>
                    <th scope="col"> Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="objCollection in objCollectionsview.resources">
                    <td>{{objCollection.id}}</td>
                    <td>{{objCollection.slug}}</td>
                    <td>{{objCollection.description}}</td>
                    <td>
                        <button class="btn btn-danger" @click="removeResourceToCollection(objCollection,objCollectionsview.id)">Remove to Resource</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="collection" tabindex="-1" role="dialog" aria-labelledby="favoritesModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"
                            id="favoritesModalLabel">All Resource list</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Description</th>
                                <th scope="col"> Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="objResource in arrObjResources">
                                <td>{{objResource.title}}</td>
                                <td>{{objResource.slug}}</td>
                                <td>{{objResource.description}}</td>
                                <td>
                                    <button data-dismiss="modal" class="btn btn-success" @click="addResourceToCollection(objResource,objCollectionsview.id)">Add Resource</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        mounted() {
            this.$store.dispatch('fetchCollectionsResources')
        },
        methods: {
            viewCollection() {
                this.$store.commit('VIEW_COLLECTION', {objCollection: false})
            },
            addResourceToCollection(objCollection,intCollectionId) {
                console.log(objCollection)
                this.$store.dispatch('addResourceToCollection',{'objCollection': objCollection, 'intCollectionId': intCollectionId})
            },
            removeResourceToCollection(objCollection,intCollectionId) {
                this.$store.dispatch('removeResourceToCollection',{'objCollection': objCollection, 'intCollectionId': intCollectionId})
            }
        },
        computed: {
            ...mapState([
                'objCollections',
                'objCollectionsview',
                'arrObjResources',
                'arrObjCollections'
            ])
        }
    }
</script>
