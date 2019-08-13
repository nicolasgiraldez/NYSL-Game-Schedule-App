<template>
  <!-- Contenedor de la App -->
  <div id="app" class="b-container mx-auto text-center p-3">
    <!-- Encabezado -->
    <header>
      <b-row class="justify-content-between">
        <!-- Botón izquierdo (menú) -->
        <b-col class="text-left">
          <b-dropdown class="login-button" left>
            <template slot="button-content">
              <img src="menu.svg" alt="Menu" />
            </template>
            <b-dropdown-item>
              <router-link to="/" tag="span">Upcoming Games</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/past-games" tag="span">Past Games</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/about" tag="span">About NYSL</router-link>
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
        <!-- Logo -->
        <b-col>
          <a href="#">
            <img src="nysl_logo.png" alt="NYSL Logo" style="width: 115px;" />
          </a>
        </b-col>
        <!-- Botón derecho (login) -->
        <b-col class="text-right">
          <b-dropdown class="login-button" right>
            <template slot="button-content">
              <img src="login.svg" alt="Login" v-if="!isLoggedIn" />
              <img src="login-successful.svg" alt="Login" v-if="isLoggedIn" />
            </template>
            <b-dropdown-item href="#" v-b-modal.login v-if="!isLoggedIn">Sign In</b-dropdown-item>
            <b-dropdown-item href="#" v-b-modal.signup v-if="!isLoggedIn">Sign Up</b-dropdown-item>
            <b-dropdown-item href="#" v-if="isLoggedIn" @click="logout">Sign Out</b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
      <!-- Título -->
      <h5 class="mt-3 text-light font-weight-bold">NORTHSIDE YOUTH SOCCER LEAGUE</h5>
    </header>

    <!-- Muestra la vista actual -->
    <transition name="slide-fade" mode="out-in">
      <router-view :loggedIn="isLoggedIn" :listaPartidos="partidos" />
    </transition>

    <!-- Ventana de login -->
    <b-modal
      id="login"
      centered
      hide-footer
      title="Sign In"
      header-text-variant="white"
      body-text-variant="white"
    >
      <!-- Encabezado de ventana -->
      <template slot="modal-header" slot-scope="{ close }">
        <div class="d-flex flex-column">
          <b-row class="justify-content-between">
            <b-col>
              <b-button class="back-button" @click="close()">
                <img src="back_arrow.svg" alt="Go back" />
              </b-button>
            </b-col>
            <b-col cols="6">
              <h5 class="text-center">Sign In</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
        </div>
      </template>
      <!-- Cuerpo de ventana -->
      <div>
        <b-card text-variant="white">
          <b-card-text>
            <b-form @keyup.enter="login">
              <b-form-group id="input-group-email" label="Email address:" label-for="input-email">
                <b-form-input
                  id="input-email"
                  type="email"
                  v-model="email"
                  required
                  autofocus
                  placeholder="example@nysl.org"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-password" label="Password:" label-for="input-password">
                <b-form-input
                  id="input-password"
                  type="password"
                  v-model="password"
                  required
                  placeholder="••••••••"
                ></b-form-input>
              </b-form-group>
              <div class="d-flex justify-content-center">
                <b-button class="card-button" @click="login">Submit</b-button>
              </div>
            </b-form>
            <p class="text-center mt-3 mb-0">
              Don't have an account?
              <b-link class="text-white" v-b-modal.signup @click="$bvModal.hide('login')">Sign up!</b-link>
            </p>
          </b-card-text>
        </b-card>
      </div>
    </b-modal>

    <!-- Ventana de registro -->
    <b-modal
      id="signup"
      centered
      hide-footer
      title="Sign Up"
      header-text-variant="white"
      body-text-variant="white"
    >
      <!-- Encabezado de ventana -->
      <template slot="modal-header" slot-scope="{ close }">
        <div class="d-flex flex-column">
          <b-row class="justify-content-between">
            <b-col>
              <b-button class="back-button" @click="close()">
                <img src="back_arrow.svg" alt="Go back" />
              </b-button>
            </b-col>
            <b-col cols="6">
              <h5 class="text-center">Sign Up</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
        </div>
      </template>
      <!-- Cuerpo de ventana -->
      <div>
        <b-card text-variant="white">
          <b-card-text>
            <b-form @keyup.enter="signup">
              <b-form-group id="input-group-name" label="Name:" label-for="input-name">
                <b-form-input
                  id="input-name"
                  type="text"
                  v-model="name"
                  required
                  autofocus
                  placeholder="Your name"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-email" label="Email address:" label-for="input-email">
                <b-form-input
                  id="input-email"
                  type="email"
                  v-model="email"
                  required
                  placeholder="example@nysl.org"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-password" label="Password:" label-for="input-password">
                <b-form-input
                  id="input-password"
                  type="password"
                  v-model="password"
                  required
                  placeholder="Must be at least 6 characters"
                ></b-form-input>
              </b-form-group>
              <div class="d-flex justify-content-center">
                <b-button class="card-button" @click="signup">Sign up</b-button>
              </div>
            </b-form>
            <p class="text-center mt-3">
              Already registered?
              <b-link class="text-white" v-b-modal.login @click="$bvModal.hide('signup')">Sign in!</b-link>
            </p>
          </b-card-text>
        </b-card>
      </div>
    </b-modal>
  </div>
</template>

<script>
import firebase from "firebase";
import { rtdbPlugin } from "vuefire";

export default {
  name: "app",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      isLoggedIn: false,
      partidos: []
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.updateLoginState();
            this.$bvModal.hide("login");
            this.email = "";
            this.password = "";
          },
          function(err) {
            alert("Oops.." + err.message);
          }
        );
    },
    signup: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            let usuario = firebase.auth().currentUser;
            usuario.updateProfile({
              displayName: this.name
            });
            alert("Account created successfully!");
            this.$bvModal.hide("signup");
            this.name = "";
            this.email = "";
            this.password = "";
          },
          function(err) {
            alert("Oops.." + err.message);
          }
        );
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.updateLoginState();
        });
    },
    updateLoginState: function() {
      this.isLoggedIn = firebase.auth().currentUser != null;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato:400,700");

body {
  background: #343a40 !important;
  font-family: "Lato", sans-serif !important;
}

#app {
  max-width: 35rem;
}

button.menu {
  background: #033949 !important;
  border-color: #a3ff15 !important;
  border-width: 0.1rem !important;
}

button.card-button {
  background: #033949 !important;
  border: 0px !important;
}

.dropdown-toggle {
  background-color: transparent !important;
  border: 0px !important;
}

.dropdown-toggle:focus {
  box-shadow: 0 0 0 0 transparent !important;
}

.login-button img {
  width: 32px;
}

.back-button {
  background-color: transparent !important;
  border: 0px !important;
}

.back-button img {
  width: 30px;
}

.modal-content {
  background-color: transparent !important;
}

.modal-header {
  display: block !important;
  background-color: #033949 !important;
  border-bottom: 0px !important;
  padding-bottom: 0rem !important;
}

.modal-body {
  background-color: #033949 !important;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}

.card {
  background-color: #005c77 !important;
}

.map-responsive {
  overflow: hidden;
  padding-bottom: 50%;
  position: relative;
  height: 0;
}
.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
