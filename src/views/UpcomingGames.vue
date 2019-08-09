<template>
  <div id="upcoming-games">
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
          <b-row class="justify-content-between">
            <b-col>
              <b-button class="back-button" @click="close()">
                <img src="back_arrow.svg" alt="Go back" />
              </b-button>
            </b-col>
            <b-col cols="6">
              <h5 class="text-center">{{ partidoActivo.equipos }}</h5>
            </b-col>
            <b-col></b-col>
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
      <div class="comments-outside" v-if="isLoggedIn">
        <comments
          :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
          :comments="comments"
          :current_user="current_user"
          @submit-comment="submitComment"
        ></comments>
      </div>
    </b-modal>
  </div>
</template>

<script>

import Comments from "@/components/Comments.vue";

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
  name: "upcoming-games",
  components: {
    Comments
  },
  data() {
    return {
      partidoActivo: "",
      listaPartidos: [
        {
          id: 0,
          equipos: "U1 vs U4",
          fecha: "2019-09-01",
          hora: "9:30 am",
          ubicacion: "AJ Katzenmaier"
        },
        {
          id: 1,
          equipos: "U3 vs U2",
          fecha: "2019-09-01",
          hora: "1:00 pm",
          ubicacion: "Greenbay"
        },
        {
          id: 2,
          equipos: "U5 vs U6",
          fecha: "2019-09-08",
          hora: "9:30 am",
          ubicacion: "Howard A Yeager"
        },
        {
          id: 3,
          equipos: "U6 vs U1",
          fecha: "2019-09-08",
          hora: "1:00 pm",
          ubicacion: "Marjorie P Hart"
        },
        {
          id: 4,
          equipos: "U2 vs U4",
          fecha: "2019-09-15",
          hora: "9:30 am",
          ubicacion: "North"
        },
        {
          id: 5,
          equipos: "U3 vs U5",
          fecha: "2019-09-15",
          hora: "1:00 pm",
          ubicacion: "AJ Katzenmaier"
        },
        {
          id: 6,
          equipos: "U1 vs U3",
          fecha: "2019-09-22",
          hora: "9:30 am",
          ubicacion: "South"
        },
        {
          id: 7,
          equipos: "U2 vs U6",
          fecha: "2019-09-22",
          hora: "1:00 pm",
          ubicacion: "Howard A Yeager"
        },
        {
          id: 8,
          equipos: "U4 vs U5",
          fecha: "2019-09-29",
          hora: "9:30 am",
          ubicacion: "Greenbay"
        },
        {
          id: 9,
          equipos: "U2 vs U5",
          fecha: "2019-10-06",
          hora: "9:30 am",
          ubicacion: "Marjorie P Hart"
        },
        {
          id: 10,
          equipos: "U1 vs U6",
          fecha: "2019-10-06",
          hora: "1:00 pm",
          ubicacion: "South"
        },
        {
          id: 11,
          equipos: "U3 vs U4",
          fecha: "2019-10-08",
          hora: "9:30 am",
          ubicacion: "Howard A Yeager"
        },
        {
          id: 12,
          equipos: "U5 vs U1",
          fecha: "2019-10-08",
          hora: "1:00 pm",
          ubicacion: "Greenbay"
        },
        {
          id: 13,
          equipos: "U6 vs U3",
          fecha: "2019-10-20",
          hora: "9:30 am",
          ubicacion: "North"
        },
        {
          id: 14,
          equipos: "U2 vs U4",
          fecha: "2019-10-20",
          hora: "1:00 pm",
          ubicacion: "Marjorie P Hart"
        },
        {
          id: 15,
          equipos: "U3 vs U1",
          fecha: "2019-10-27",
          hora: "9:30 am",
          ubicacion: "AJ Katzenmaier"
        },
        {
          id: 16,
          equipos: "U5 vs U6",
          fecha: "2019-10-27",
          hora: "1:00 pm",
          ubicacion: "Howard A Yeager"
        }
      ],
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
    }
  },
  props: {
   isLoggedIn: {
    type: Boolean,
    required: true
    // default: 'false'
   }
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
