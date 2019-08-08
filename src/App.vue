<template>
  <div id="app">
    <div class="b-container mx-auto text-center" style="max-width: 480px;">
      <header class="pt-3">
        <b-row>
          <b-col align-self="left">
            <b-dropdown class="login-button" left>
              <template slot="button-content">
                <img src="menu.svg" alt="Menu" />
              </template>
              <b-dropdown-item href="#">Upcoming Games</b-dropdown-item>
              <b-dropdown-item href="#">Past Games</b-dropdown-item>
              <!-- <b-dropdown-item href="#">Upcoming Events</b-dropdown-item>
              <b-dropdown-item href="#">About NYSL</b-dropdown-item>-->
            </b-dropdown>
          </b-col>
          <b-col align-self="center">
            <a href="#">
              <img src="nysl_logo.png" alt="NYSL Logo" style="width: 115px;" />
            </a>
          </b-col>
          <b-col align-self="right">
            <b-dropdown class="login-button" right>
              <template slot="button-content">
                <img src="login.svg" alt="Login" v-if="!loggedIn" />
                <img src="login-successful.svg" alt="Login" v-if="loggedIn" />
              </template>
              <b-dropdown-item href="#" v-b-modal.login v-if="!loggedIn">Sign In</b-dropdown-item>
              <b-dropdown-item href="#" v-b-modal.signup v-if="!loggedIn">Sign Up</b-dropdown-item>
              <b-dropdown-item href="#" v-if="loggedIn" @click="logout">Sign Out</b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>
        <h5 class="mt-3 text-light font-weight-bold">NORTHSIDE YOUTH SOCCER LEAGUE</h5>
      </header>
      <h3 class="mt-2 text-light font-weight-bold">UPCOMING GAMES</h3>
      <div>
        <b-button v-b-toggle.collapse-september class="m-3 menu">September</b-button>
        <b-collapse visible id="collapse-september">
          <div class="d-flex flex-column">
            <template v-for="partido in listaPartidos">
              <b-button
                class="d-block m-3 menu"
                v-if="partido.fecha.includes('2019-09')"
                @click="partidoActivo = partido"
                v-b-modal.detalles
              >
                <b-row>
                  <b-col align-self="start" class="text-left">{{ partido.fecha.slice(-5) }}</b-col>
                  <b-col cols="6" align-self="center">{{ partido.equipos }}</b-col>
                  <b-col align-self="end"></b-col>
                </b-row>
              </b-button>
            </template>
          </div>
        </b-collapse>
      </div>
      <div>
        <b-button v-b-toggle.collapse-october class="m-3 menu">October</b-button>
        <b-collapse id="collapse-october">
          <div class="d-flex flex-column">
            <template v-for="partido in listaPartidos">
              <b-button
                class="d-block m-3 menu"
                v-if="partido.fecha.includes('2019-10')"
                @click="partidoActivo = partido"
                v-b-modal.detalles
              >
                <b-row>
                  <b-col align-self="start" class="text-left">{{ partido.fecha.slice(-5) }}</b-col>
                  <b-col cols="6" align-self="center">{{ partido.equipos }}</b-col>
                  <b-col align-self="end"></b-col>
                </b-row>
              </b-button>
            </template>
          </div>
        </b-collapse>
      </div>

      <!-- Ventana de detalles de cada juego -->
      <b-modal
        id="detalles"
        centered
        hide-footer
        :title="partidoActivo.equipos"
        header-text-variant="white"
        body-text-variant="white"
      >
        <template slot="modal-header" slot-scope="{ close }">
          <div class="d-flex flex-column">
            <b-row>
              <b-col align-self="start">
                <b-button class="back-button" @click="close()">
                  <img src="back_arrow.svg" alt="Go back" />
                </b-button>
              </b-col>
              <b-col cols="6" align-self="center">
                <h5 class="text-center">{{ partidoActivo.equipos }}</h5>
              </b-col>
              <b-col align-self="end"></b-col>
            </b-row>
          </div>
        </template>
        <div class="text-center">
          <b-card header="When?" text-variant="white" class="mb-6">
            <b-card-text>
              <div>{{ partidoActivo.fecha }}</div>
              <div>{{ partidoActivo.hora }}</div>
            </b-card-text>
          </b-card>
        </div>
        <div class="text-center mt-3">
          <b-card header="Where?" text-variant="white">
            <b-card-text>
              <div>{{ partidoActivo.ubicacion }}</div>
              <div>{{ direccion(partidoActivo.ubicacion) }}</div>
              <div class="map-responsive mt-2">
                <iframe
                  :src="mapa(partidoActivo.ubicacion)"
                  frameborder="0"
                  style="border:0"
                  allowfullscreen
                ></iframe>
              </div>
            </b-card-text>
          </b-card>
        </div>
        <div class="comments-outside" v-if="loggedIn">
          <!-- <div class="comments-header">
            <div class="comments-stats">
              <span>
                <i class="fa fa-thumbs-up"></i>
                {{ likes }}
              </span>
              <span>
                <i class="fa fa-comment"></i>
                {{ comments.length }}
              </span>
            </div>
            <div class="post-owner">
              <div class="avatar">
                <img :src="creator.avatar" alt />
              </div>
              <div class="username">
                <a href="#">@{{ creator.user }}</a>
              </div>
            </div>
          </div>-->
          <comments
            :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
            :comments="comments"
            :current_user="current_user"
            @submit-comment="submitComment"
          ></comments>
        </div>
      </b-modal>

      <!-- Ventana de login -->
      <b-modal
        id="login"
        centered
        hide-footer
        title="Sign In"
        header-text-variant="white"
        body-text-variant="white"
      >
        <template slot="modal-header" slot-scope="{ close }">
          <div class="d-flex flex-column">
            <b-row>
              <b-col align-self="start">
                <b-button class="back-button" @click="close()">
                  <img src="back_arrow.svg" alt="Go back" />
                </b-button>
              </b-col>
              <b-col cols="6" align-self="center">
                <h5 class="text-center">Sign In</h5>
              </b-col>
              <b-col align-self="end"></b-col>
            </b-row>
          </div>
        </template>
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
                    placeholder="example@nysl.org"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-password"
                  label="Password:"
                  label-for="input-password"
                >
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
              <p class="text-center mt-3">
                Don't have an account?
                <a href class="text-white">Sign up!</a>
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
        <template slot="modal-header" slot-scope="{ close }">
          <div class="d-flex flex-column">
            <b-row>
              <b-col align-self="start">
                <b-button class="back-button" @click="close()">
                  <img src="back_arrow.svg" alt="Go back" />
                </b-button>
              </b-col>
              <b-col cols="6" align-self="center">
                <h5 class="text-center">Sign Up</h5>
              </b-col>
              <b-col align-self="end"></b-col>
            </b-row>
          </div>
        </template>
        <div>
          <b-card text-variant="white">
            <b-card-text>
              <b-form @keyup.enter="signup">
                <b-form-group id="input-group-email" label="Email address:" label-for="input-email">
                  <b-form-input
                    id="input-email"
                    type="email"
                    v-model="email"
                    required
                    placeholder="example@nysl.org"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-password"
                  label="Password:"
                  label-for="input-password"
                >
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
                <a href class="text-white">Sign in!</a>
              </p>
            </b-card-text>
          </b-card>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Comments from "./components/Comments.vue";

const ubicaciones = [
  {
    nombre: "AJ Katzenmaier",
    direccion: "24 W. Walton St., Chicago, IL 60610",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.654246110989!2d-87.63123908459744!3d41.900292379220375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34e07f6bac3%3A0x68a82e5d59952c86!2s24+W+Walton+St%2C+Chicago%2C+IL+60610%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1555979654633!5m2!1ses-419!2sar"
  },
  {
    nombre: "Greenbay",
    direccion: "1734 N. Orleans St., Chicago, IL 60614",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.0258843688553!2d-87.64002798462597!3d41.91380227921941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34073f306a3%3A0x9e1726bbf8f23f0e!2s1734+N+Orleans+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1555980240536!5m2!1ses-419!2sar"
  },
  {
    nombre: "Howard A Yeager",
    direccion: "2245 N. Southport Ave., Chicago, IL 60614",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.5856830856196!2d-87.6651145846198!3d41.923264579218625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2e37f9b8d2d%3A0x62ad8b907dd755d6!2s2245+N+Southport+Ave%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1555980924357!5m2!1ses-419!2sar"
  },
  {
    nombre: "Marjorie P Hart",
    direccion: "2625 N. Orchard St., Chicago, IL 60614",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.2919146584286!2d-87.64808628461962!3d41.92957827921821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd30f2630e551%3A0x3e719e44a5cef714!2s2625+N+Orchard+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1556081565001!5m2!1ses-419!2sar"
  },
  {
    nombre: "North",
    direccion: "1409 N. Ogden Ave., Chicago, IL 60610",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.337799849208!2d-87.64837698462034!3d41.90709647921998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33af0e6ccc3%3A0x26c81c1d557667da!2s1409+N+Ogden+Ave%2C+Chicago%2C+IL+60610%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1555981093835!5m2!1ses-419!2sar"
  },
  {
    nombre: "South",
    direccion: "2101 N. Fremont St., Chicago, IL 60614",
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.9243907367786!2d-87.65304238462014!3d41.91598407921926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3188c084b73%3A0x492517dd97fe611e!2sN+Fremont+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1555981145369!5m2!1ses-419!2sar"
  }
];

function obtenerDireccion(nombre) {
  let ubicacion = ubicaciones.find(function(ubicacionActual) {
    return ubicacionActual.nombre === nombre;
  });
  return ubicacion.direccion;
}

function obtenerMapa(nombre) {
  let ubicacion = ubicaciones.find(function(ubicacionActual) {
    return ubicacionActual.nombre === nombre;
  });
  return ubicacion.mapa;
}

export default {
  name: "app",
  components: {
    Comments
  },
  data() {
    return {
      partidoActivo: "",
      listaPartidos: [
        {
          equipos: "U1 vs U4",
          fecha: "2019-09-01",
          hora: "9:30 am",
          ubicacion: "AJ Katzenmaier"
        },
        {
          equipos: "U3 vs U2",
          fecha: "2019-09-01",
          hora: "1:00 pm",
          ubicacion: "Greenbay"
        },
        {
          equipos: "U5 vs U6",
          fecha: "2019-09-08",
          hora: "9:30 am",
          ubicacion: "Howard A Yeager"
        },
        {
          equipos: "U6 vs U1",
          fecha: "2019-09-08",
          hora: "1:00 pm",
          ubicacion: "Marjorie P Hart"
        },
        {
          equipos: "U2 vs U4",
          fecha: "2019-09-15",
          hora: "9:30 am",
          ubicacion: "North"
        },
        {
          equipos: "U3 vs U5",
          fecha: "2019-09-15",
          hora: "1:00 pm",
          ubicacion: "AJ Katzenmaier"
        },
        {
          equipos: "U1 vs U3",
          fecha: "2019-09-22",
          hora: "9:30 am",
          ubicacion: "South"
        },
        {
          equipos: "U2 vs U6",
          fecha: "2019-09-22",
          hora: "1:00 pm",
          ubicacion: "Howard A Yeager"
        },
        {
          equipos: "U4 vs U5",
          fecha: "2019-09-29",
          hora: "9:30 am",
          ubicacion: "Greenbay"
        },
        {
          equipos: "U2 vs U5",
          fecha: "2019-10-06",
          hora: "9:30 am",
          ubicacion: "Marjorie P Hart"
        },
        {
          equipos: "U1 vs U6",
          fecha: "2019-10-06",
          hora: "1:00 pm",
          ubicacion: "South"
        },
        {
          equipos: "U3 vs U4",
          fecha: "2019-10-08",
          hora: "9:30 am",
          ubicacion: "Howard A Yeager"
        },
        {
          equipos: "U5 vs U1",
          fecha: "2019-10-08",
          hora: "1:00 pm",
          ubicacion: "Greenbay"
        },
        {
          equipos: "U6 vs U3",
          fecha: "2019-10-20",
          hora: "9:30 am",
          ubicacion: "North"
        },
        {
          equipos: "U2 vs U4",
          fecha: "2019-10-20",
          hora: "1:00 pm",
          ubicacion: "Marjorie P Hart"
        },
        {
          equipos: "U3 vs U1",
          fecha: "2019-10-27",
          hora: "9:30 am",
          ubicacion: "AJ Katzenmaier"
        },
        {
          equipos: "U5 vs U6",
          fecha: "2019-10-27",
          hora: "1:00 pm",
          ubicacion: "Howard A Yeager"
        }
      ],
      loggedIn: false,
      email: "",
      password: "",
      // creator: {
      //   avatar: "http://via.placeholder.com/100x100/a74848",
      //   user: "exampleCreator"
      // },
      current_user: {
        avatar: "http://via.placeholder.com/100x100/a74848",
        user: "exampler"
      },
      comments: [
        {
          id: 1,
          user: "Moe",
          avatar: "moe.png",
          text: "Can't make it to the game, sorry."
        },
        {
          id: 2,
          user: "Larry",
          avatar: "larry.png",
          text: "Bringing Snacks!"
        },
        {
          id: 3,
          user: "Curly",
          avatar: "curly.png",
          text: "Go teams!"
        }
      ]
    };
  },
  methods: {
    direccion: function(nombre) {
      if (nombre != null) {
        return obtenerDireccion(nombre);
      }
    },
    mapa: function(nombre) {
      if (nombre != null) {
        return obtenerMapa(nombre);
      }
    },
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.loggedIn = true;
            this.$bvModal.hide("login");
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
            alert("Account created");
            this.$bvModal.hide("signup");
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
          this.loggedIn = false;
        });
    },
    submitComment: function(reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: this.current_user.avatar,
        text: reply
      });
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
</style>
