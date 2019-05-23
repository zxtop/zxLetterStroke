import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index';
import Edit from 'xes-tem-edit';
Vue.use(Edit);
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            component: Index,
        },
        {
            path: '/edit',
            component: Edit,
        }
    ]
})
