// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire';
import App from './App'
import router from './router'
import firebaseui from 'firebaseui'

import { config } from './db/firebaseConfig.js'
import { store } from './store.js'
import './assets/scss/app.scss'

const fb = require('./db/firebaseConfig.js')

Vue.use(VueFire);


Vue.config.productionTip = false

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})
