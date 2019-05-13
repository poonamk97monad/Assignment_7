
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import store from './store/index'

Vue.component('resources', require('./components/Resources.vue'));
Vue.component('example-component', require('./components/ExampleComponent'));
Vue.component('resources-index', require('./components/ResourcesIndex'));
// Vue.component('resources-view', require('./components/ResourceView'));
Vue.component('collection', require('./components/CollectionCreate'));
Vue.component('collection-index', require('./components/CollectionIndex'));
Vue.component('collection-view', require('./components/CollectionView'));
Vue.component('resources-search', require('./components/ResourcesSearch'));
Vue.component('collection-search', require('./components/CollectionSearch'));

$(document).ready(function(){
    const app = new Vue({
        el: '#app',
        store
    });
})

// console.log("fgdfhg");
// function LoadCoreApp(el, data) {
//        const app = new Vue({
//            el: '#resource-app',
//            store,
//            data: {
//                newItem: {'title': '', 'description': ''}
//            },
//            createItem: function createItem() {
//                alert("hgfhgjfgh");
//                var input = this.newItem;
//            }
//     });
//
// }
//
// $(document).ready(function () {
//     LoadCoreApp('#resource-app', {});
// });
// const app = new Vue({
//     el: '#resource-app',
//     data: {
//         resource: {'title': '', 'description': ''}
//     }
// });

