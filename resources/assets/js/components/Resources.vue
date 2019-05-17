<template>
    <div>
        <div v-if="!objResourcesView">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#resourceModal">Add New Resource</button>
            <div class="modal fade" id="resourceModal" tabindex="-1" role="dialog" aria-labelledby="favoritesModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="favoritesModalLabel">Resources list</h4>
                        </div>
                        <div class="modal-body">
                            <h4 v-if="errors.length">
                                <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                            </h4>
                            <form @submit="createResource(resource)">
                                <div class="form-group">
                                    <label class="col-md-4 text-right">Enter Title of File</label>
                                    <div class="col-md-8">
                                        <input type="text" id="title" v-model="resource.title" class="form-control input-lg" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 text-right">Enter Description</label>
                                    <div class="col-md-8">
                                        <input type="text" id="description" v-model="resource.description" class="form-control input-lg" />
                                    </div>
                                </div>
                                <br/><br/><br/>
                                <div class="form-group">
                                    <button :disabled="!isValid" data-dismiss="modal" class="btn btn-block btn-primary" @click.prevent="createResource(resource)" >Submit</button>
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

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import resourcesView from './ResourceView'
    export default {
        name: "CreateResource",
        data() {
            return {
                errors:[],
                resource: {
                    title: '',
                    description: '',
                    file_upload:''
                }
            }
        },
        methods: {
            createResource(resource) {
                if (this.title && this.description) {
                    return true;
                }

                this.errors = [];

                if (!this.title) {
                    this.errors.push('title required.');
                }
                if (!this.description) {
                    this.errors.push('description required.');
                }

                this.$store.dispatch('createResource', resource)
            }
        },
        computed: {
            ...mapState([
                'objResources',
                'objResourcesView'
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
