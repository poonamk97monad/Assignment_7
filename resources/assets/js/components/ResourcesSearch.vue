<template>
    <div>
        <div v-if="!resourcesview">
            <div>
                <input type="text" v-model="objResource.search"  placeholder="search...."  >
                <button type="submit" class="btn btn-primary" @click.prevent="searchResource(objResource)">Search</button>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import resourcesView from './ResourceView'
    export default {

        data(){
            return{
                objResource:{
                    search:''
                }
            }
        },
        methods:{
            searchResource(objResource){
                this.$store.dispatch('searchResource', objResource)
            }
        },
        computed: {
            ...mapState([
                'resources',
                'resourcesdata',
                'resourcesview'
            ]),
        },
        components: {
            resourcesView:resourcesView
        },
    }
</script>
