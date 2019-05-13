<template>
    <div>
        <div v-if="!resourcesview">
            <h4 class="text-center font-weight-bold">Resources</h4>
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
                <tr v-for="resources in arrObjResources.data">
                    <td>{{resources.file_upload}}</td>
                    <td>{{resources.title}}</td>
                    <td>{{resources.slug}}</td>
                    <td>{{resources.description}}</td>
                    <td>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#EditModal" @click="updateResource(resources)">
                            <span class="glyphicon glyphicon-pencil"></span></button>
                        <button class="btn btn-danger" @click="deleteResource(resources)"><span class="glyphicon glyphicon-trash"></span></button>
                        <button class="btn btn-info" @click="viewResource(resources)"><i style="color:white" class="fa fa-trash">View</i></button>
                    </td>
                    <td>
                        <p v-if="resources.is_favortted">
                            <button class="btn btn-success" @click="addToResourceFavortted(resources, false)">UnFavorites</button>
                        </p>
                        <p v-else>
                           <button class="btn btn-success" @click="addToResourceFavortted(resources, true)"> Favorites</button>
                        </p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div>
            <resourcesView v-if="resourcesview"></resourcesView>
        </div>
        <div class="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="favoritesModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="favoritesModalLabel">Edit From</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label class="col-md-4 text-right">Enter Title of File</label>
                                <div class="col-md-8">
                                    <input type="text" id="title" v-model="resource.title" class="form-control input-lg" />
                                </div>
                            </div>
                            <input type="hidden" v-model="resource.id" />
                            <div class="form-group">
                                <label class="col-md-4 text-right">Enter Description</label>
                                <div class="col-md-8">
                                    <input type="text" id="description" v-model="resource.description" class="form-control input-lg" />
                                </div>
                            </div>
                            <br /><br /><br />
                            <div class="form-group">
                                <button type="submit" :disabled="!isValid" data-dismiss="modal" class="btn btn-block btn-primary" @click="updateResourceDetails">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>'
<script>
    import {mapState} from 'vuex'
    import resourcesView from './ResourceView'

    export default {
        data(){
            return {
                resource: {
                    id:'',
                    title: '',
                    description: ''
                },
                boolResourceView:false,
                isfovrato:false
            }
        },
        mounted() {
            this.$store.dispatch('fetchResourcesCollections')
        },
        methods: {
            deleteResource(resource) {
                this.$store.dispatch('deleteResource',resource)
            },
            viewResource(objResource) {
                this.boolResourceView = true;
                this.$store.commit('VIEW_RESOURCE', {objResource: objResource})
            },
            updateResource(resource) {
                this.resource.id = resource.id;
                this.resource.title = resource.title;
                this.resource.description = resource.description;
            },
            updateResourceDetails() {
                this.$store.dispatch('updateResource',{id:this.resource.id,title:this.resource.title,description:this.resource.description})
            },
            addToResourceFavortted(resource) {

                this.$store.dispatch('addToResourceFavortted',resource)
            },
        },
        computed: {
            ...mapState([
                'resourcesview',
                'arrObjResources',
                'isFavorites'
            ]),
            isValid() {
                return this.resource.title !== '' && this.resource.description !== ''
            }

        },
        components: {
            resourcesView:resourcesView
        },
    }
</script>

