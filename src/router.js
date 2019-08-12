import Vue from "vue";
import Router from "vue-router";
import UpcomingGames from "./views/UpcomingGames.vue";
import PastGames from "./views/PastGames.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "upcoming-games",
      component: UpcomingGames
    },
    {
      path: "/past-games",
      name: "past-games",
      component: PastGames
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
