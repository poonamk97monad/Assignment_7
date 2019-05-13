<template>
    <div>
        <div>
              <input type="text" v-model="resource.search"  placeholder="search...."  >
                <button type="submit" class="btn btn-primary" @click.prevent="searchResource(resource)">Search</button>


        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {

        data(){
            return{
                resource:{
                    search:''
                }
            }
        },
        methods:{
            searchResource(resource){
                this.$store.dispatch('searchResource', resource)
            }

        },
        computed: {
            ...mapState([
                'resources',
                'resourcesdata',
                'resourcesview'
            ]),

        },

    }
</script>
