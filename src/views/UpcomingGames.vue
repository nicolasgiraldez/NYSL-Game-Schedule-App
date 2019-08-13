<template>
  <div id="upcoming-games">
    <h3 class="mt-2 mb-3 text-light font-weight-bold">UPCOMING GAMES</h3>
    <div>
      <b-row class="justify-content-between mt-4 mb-2">
        <b-col>
          <b-form-select v-model="mesSeleccionado" @change="filtrarPartidos">
            <option :value="null" disabled>Filter by Month</option>
            <option value="2019-09">September</option>
            <option value="2019-10">October</option>
            <option value="all">All</option>
          </b-form-select>
        </b-col>
        <b-col>
          <b-form-select
            :options="listaEquipos"
            v-model="equipoSeleccionado"
            @change="filtrarPartidos"
          >
            <template slot="first">
              <option :value="null" disabled>Filter by Team:</option>
            </template>
            <option value="all">All</option>
          </b-form-select>
        </b-col>
      </b-row>
      <div class="d-flex flex-column">
        <template v-for="partido in listaFiltrada">
          <b-button
            class="d-block mt-3 mb-3 menu"
            @click="partidoActivo = partido"
            v-b-modal.detalles
            :key="partido.id"
          >
            <b-row class="justify-content-between">
              <b-col class="text-left">{{ partido.fecha.slice(-5) }}</b-col>
              <b-col cols="6">{{ partido.equipos }}</b-col>
              <b-col></b-col>
            </b-row>
          </b-button>
        </template>
      </div>
    </div>

    <!-- Ventana de detalles de cada juego -->
    <b-modal
      id="detalles"
      centered
      hide-footer
      header-text-variant="white"
      body-text-variant="white"
    >
      <template slot="modal-header" slot-scope="{ close }">
        <div class="d-flex flex-column">
          <b-row class="justify-content-between">
            <b-col>
              <b-button class="back-button" @click="close()">
                <img src="back_arrow.svg" alt="Go back" />
              </b-button>
            </b-col>
            <b-col cols="6">
              <h5 class="text-center">{{ listaPartidos[partidoActivo.id].equipos }}</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
        </div>
      </template>
      <div class="text-center">
        <b-card header="When?" text-variant="white" class="mb-6">
          <b-card-text v-if="listaPartidos[partidoActivo.id]">
            <div>{{ listaPartidos[partidoActivo.id].fecha }}</div>
            <div>{{ listaPartidos[partidoActivo.id].hora }}</div>
          </b-card-text>
        </b-card>
      </div>
      <div class="text-center mt-3">
        <b-card header="Where?" text-variant="white">
          <b-card-text v-if="listaPartidos[partidoActivo.id]">
            <div>{{ listaPartidos[partidoActivo.id].ubicacion }}</div>
            <div>{{ direccion(listaPartidos[partidoActivo.id].ubicacion) }}</div>
            <div class="map-responsive mt-2">
              <iframe
                :src="mapa(listaPartidos[partidoActivo.id].ubicacion)"
                frameborder="0"
                style="border:0"
                allowfullscreen
              ></iframe>
            </div>
          </b-card-text>
        </b-card>
      </div>
      <div class="comments-outside" v-if="loggedIn">
        <comments
          :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
          :comments="listaPartidos[partidoActivo.id].comentarios"
          :current_user="current_user"
          @submit-comment="submitComment"
        ></comments>
      </div>
    </b-modal>
  </div>
</template>

<script>
import firebase from "firebase";
import { rtdbPlugin } from "vuefire";
// import { db } from "../main"
import Comments from "@/components/Comments.vue";

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
// const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.initializeApp(firebaseConfig).database();

let partidos = db.ref("partidos");

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

function filtrarPartidoPorMes(mes) {
  return function(partido) {
    if (mes == "all") return true;
    return partido.fecha.includes(mes);
  };
}

function filtrarPartidoPorEquipo(equipo) {
  return function(partido) {
    if (equipo == "all") return true;
    return partido.equipos.includes(equipo);
  };
}

export default {
  name: "upcoming-games",
  components: {
    Comments
  },
  data() {
    return {
      partidoActivo: {
        id: 0,
        equipos: "U1 vs U4",
        fecha: "2019-09-01",
        hora: "9:30 am",
        ubicacion: "AJ Katzenmaier",
        comentarios: [
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
      },
      listaEquipos: ["U1", "U2", "U3", "U4", "U5", "U6"],
      mesSeleccionado: null,
      equipoSeleccionado: null,
      listaPartidos: [],
      listaFiltrada: [],
    };
  },
  firebase: {
    listaPartidos: partidos
  },
  props: {
    loggedIn: {
      type: Boolean,
      required: true
    }
  },
  created: function() {
    this.listaFiltrada = this.listaPartidos;
  },
  computed: {
    current_user: function() {
      return firebase.auth().currentUser.displayName;
    }
  },
  methods: {
    filtrarPartidos: function() {
      this.listaFiltrada = this.listaPartidos;
      if (this.mesSeleccionado != null) {
        this.listaFiltrada = this.listaFiltrada.filter(
          filtrarPartidoPorMes(this.mesSeleccionado)
        );
      }
      if (this.equipoSeleccionado != null) {
        this.listaFiltrada = this.listaFiltrada.filter(
          filtrarPartidoPorEquipo(this.equipoSeleccionado)
        );
      }
    },
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
    submitComment: function(reply) {
      let nuevoComentario = db
        .ref("partidos/" + this.partidoActivo.id + "/comentarios")
        .push();
      nuevoComentario.set({
        id: nuevoComentario.key,
        user:  firebase.auth().currentUser.displayName,
        avatar: "http://via.placeholder.com/100x100/a74848",
        text: reply
      });
    }
  }
};
</script>
