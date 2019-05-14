<template>
    <div>
        <h2>search page</h2>
        <div>
            <input type="text"  v-model="objSearch.search" placeholder="search...."  >
            <label>Filter:</label>
            <select id="model_type" v-model="objSearch.modeltype" name="modeltype" >
                <option value="collection" id="collection">Collection</option>
                <option value="resource" id="resource">Resource</option>
            </select >
            <label>Sort:</label>
            <select id="idsort" v-model="objSearch.idsort" name="idsort" >
                <option value="ascending" id="ascending">Ascending </option>
                <option value="descending" id="descending">Descending</option>
            </select >

            <button type="submit" class="btn btn-primary"  @click="searchResourceCollection(objSearch)">Search</button>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {

        data(){
            return{
                objSearch:{
                    search:'',
                    modeltype:'',
                    idsort:''
                }
            }
        },
        methods:{
            searchResourceCollection(objSearch){
                this.$store.dispatch('searchResourceCollection', objSearch)
            }
        },
        computed: {
            ...mapState([
                'arrObjSearchPageData'

            ]),
        },

    }
</script>

<style scoped>

</style>
