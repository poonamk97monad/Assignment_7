<template>
 <div>
     <div v-if="!objCollectionsview">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#collectionsModal">Add New Collections</button>
    <hr>
    <div class="modal fade" id="collectionsModal" tabindex="-1" role="dialog" aria-labelledby="favoritesModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="favoritesModalLabel">Add Collection </h4>
                </div>
                <div class="modal-body">
                    <div>
                        <form @submit="createCollection(objCollection)">
                            <span id="form_output"></span>
                            <div class="form-group">
                                <label class="col-md-4 text-right">Enter Title of File</label>
                                <div class="col-md-8">
                                    <input type="text" name="title" v-model="objCollection.title" id="title" class="form-control input-lg" />
                                </div>
                            </div>
                            <br/><br/><br/>
                            <div class="form-group">
                                <label class="col-md-4 text-right">Enter Description</label>
                                <div class="col-md-8">
                                    <input type="text" name="description" v-model="objCollection.description" id="description" class="form-control input-lg" />
                                </div>
                            </div>
                            <br /><br /><br />
                            <div class="form-group">
                                <button :disabled="!isValid" data-dismiss="modal" class="btn btn-block btn-primary" @click.prevent="createCollection(objCollection)">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"  data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
     </div>
 </div>
</template>

<script>
    import {mapState} from 'vuex'
    import collectionsView from './CollectionView'
    export default {

        name: "CreateCollection",
        data() {
            return {
                objCollection: {
                    title: '',
                    description: ''
                }
            }
        },
        methods: {
            createCollection(objCollection) {
                this.$store.dispatch('createCollection', objCollection)
            }
        },
        computed: {
            ...mapState([
                'objCollections',
                'objCollectionsview'
            ]),
            isValid() {
                return this.objCollection.title !== '' && this.objCollection.description !== ''
            }
        },
        components: {
            collectionsView:collectionsView
        },
    }
</script>
