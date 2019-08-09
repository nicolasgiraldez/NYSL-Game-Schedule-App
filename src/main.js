import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.config.productionTip = false;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR5W7FjtDQVIhSmPSldpClS_4dXMSLxHc",
  authDomain: "nysl-game-schedule-app.firebaseapp.com",
  databaseURL: "https://nysl-game-schedule-app.firebaseio.com",
  projectId: "nysl-game-schedule-app",
  storageBucket: "",
  messagingSenderId: "1099447516370",
  appId: "1:1099447516370:web:81335978eb5a4f29"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
