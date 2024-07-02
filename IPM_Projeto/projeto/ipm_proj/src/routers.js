import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Eletrico from './components/Eletrico.vue'
import Gasolina from './components/Gasolina.vue'
import Perfil from './components/Perfil.vue'
import {createRouter, createWebHistory} from 'vue-router'
import Login from './components/Login.vue'
import ServiceDetails from './components/ServiceDetails.vue'
import Reason from './components/Reason.vue'
import Hibrido from './components/Hibrido.vue'
import Diesel from './components/Diesel.vue'

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },
    {
        name: 'Login',
        component: () => import('./components/Login.vue'),
        path: '/login'
    },
    { name: 'Eletrico',
      component: Eletrico,
      path: '/eletrico'
    },
    {
        name:'Gasolina',
        component: Gasolina,
        path: '/gasolina'
    },
    {
        name:'Hibrido',
        component: Hibrido,
        path: '/hibrido'
    },
    {
        name:'Diesel',
        component: Diesel,
        path: '/diesel'
    },
    {
        name: 'Perfil',
        component: Perfil,
        path: '/perfil'
    },
    {
        name: 'ServiceDetails',
        component: ServiceDetails,
        path: '/servicedetails/:serviceId',
        props: true
    },
    {
        name: 'Reason',
        component: Reason,
        path: '/reason/:serviceId',
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;