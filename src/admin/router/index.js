import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import axios from "axios";
import store from '../store/index'
import {setAuthHttpHeaderToAxios, getTokenFromLocalStorage} from '../helpers/token'

Vue.use(VueRouter);

const guard = axios.create({
  baseURL: "https://webdev-api.loftschool.com/"
});

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  const isPublicRoute = to.matched.some(record => record.meta.public);
  const isUserLogged = store.getters["auth/userIsLogged"];

  if (isPublicRoute === false && isUserLogged === false) {
    setAuthHttpHeaderToAxios(guard, getTokenFromLocalStorage());
    guard
      .get("/user")
      .then(response => {
        store.commit("user/SET_USER", response.data.user);
        next();
      })
      .catch(error => {
        router.replace("/login");
        localStorage.removeItem("token");
      });
  } else {
    guard
      .get("/user")
      .then(response => {
        store.commit("user/SET_USER", response.data.user);
        next();
      })
  }

  next();
});
export default router;
