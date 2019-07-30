<template>
  <div id="app">
    <div class="b-container mx-auto text-center" style="max-width: 480px;">
      <header class="pt-2">
        <a href="#"><img src="nysl_logo.png" alt="NYSL Logo" style="width: 115px;"></a>
        <h2 class="mt-2 text-light font-weight-bold">UPCOMING GAMES</h2>
      </header>
      <div>
        <b-button v-b-toggle.collapse-september class="m-3 menu">September</b-button>
        <b-collapse visible id="collapse-september">
            <div class="d-flex flex-column">
              <template v-for="partido in listaPartidos">
                <b-button class="d-block m-3 menu" v-if="partido.fecha.includes('2019-09')" @click="partidoActivo = partido" v-b-modal.detalles>
                  <b-row>
                    <b-col align-self="start" class="text-left">
                      {{ partido.fecha.slice(-5) }}
                    </b-col>
                    <b-col cols="6" align-self="center">
                      {{ partido.equipos }}
                    </b-col>
                    <b-col align-self="end">
                    </b-col>
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
                <b-button class="d-block m-3 menu" v-if="partido.fecha.includes('2019-10')" @click="partidoActivo = partido" v-b-modal.detalles>
                  <b-row>
                    <b-col align-self="start" class="text-left">
                      {{ partido.fecha.slice(-5) }}
                    </b-col>
                    <b-col cols="6" align-self="center">
                      {{ partido.equipos }}
                    </b-col>
                    <b-col align-self="end">
                    </b-col>
                  </b-row>
                </b-button>
              </template>
            </div>
        </b-collapse>
      </div>
      <b-modal id="detalles" centered hide-footer :title="partidoActivo.equipos" header-text-variant="white" body-text-variant="white">
        <template slot="modal-header" slot-scope="{ close }">
          <div class="d-flex flex-column">
            <b-row>
              <b-col align-self="start" class="bg-primary">
                <b-button class="back-button" @click="close()">
                  <img src="back_arrow.svg" alt="Go back">
                </b-button>
              </b-col>
              <b-col cols="6" align-self="center" class="bg-secondary">
                <h5 class="text-center">{{ partidoActivo.equipos }}</h5>
              </b-col>
              <b-col align-self="end" class="bg-dark">P</b-col>
            </b-row>
          </div>
        </template>
        <b-card-group deck class="text-center">
          <b-card header="When?" bg-variant="info" text-variant="white">
            <b-card-text>
              {{ partidoActivo.fecha }}
              {{ partidoActivo.hora }}
            </b-card-text>
          </b-card>
          <b-card header="Where?" bg-variant="info" text-variant="white">
            <b-card-text>
              {{ partidoActivo.ubicacion }}
            </b-card-text>
          </b-card>
        </b-card-group>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      partidoActivo: "",
      listaPartidos: [
        {
          "equipos": "U1 vs U4",
          "fecha": "2019-09-01",
          "hora": "9:30",
          "ubicacion": "AJ Katzenmaier"
        },
        {
          "equipos": "U3 vs U2",
          "fecha": "2019-09-01",
          "hora": "13:00",
          "ubicacion": "Greenbay"
        },
        {
          "equipos": "U5 vs U6",
          "fecha": "2019-09-08",
          "hora": "9:30",
          "ubicacion": "Howard A Yeager"
        },
        {
          "equipos": "U6 vs U1",
          "fecha": "2019-09-08",
          "hora": "13:00",
          "ubicacion": "Marjorie P Hart"
        },
        {
          "equipos": "U2 vs U4",
          "fecha": "2019-09-15",
          "hora": "9:30",
          "ubicacion": "North"
        },
        {
          "equipos": "U3 vs U5",
          "fecha": "2019-09-15",
          "hora": "13:00",
          "ubicacion": "AJ Katzenmaier"
        },
        {
          "equipos": "U1 vs U3",
          "fecha": "2019-09-22",
          "hora": "9:30",
          "ubicacion": "South"
        },
        {
          "equipos": "U2 vs U6",
          "fecha": "2019-09-22",
          "hora": "13:00",
          "ubicacion": "Howard A Yeager"
        },
        {
          "equipos": "U4 vs U5",
          "fecha": "2019-09-29",
          "hora": "9:30",
          "ubicacion": "Greenbay"
        },
        {
          "equipos": "U2 vs U5",
          "fecha": "2019-10-06",
          "hora": "9:30",
          "ubicacion": "Marjorie P Hart"
        },
        {
          "equipos": "U1 vs U6",
          "fecha": "2019-10-06",
          "hora": "13:00",
          "ubicacion": "South"
        },
        {
          "equipos": "U3 vs U4",
          "fecha": "2019-10-08",
          "hora": "9:30",
          "ubicacion": "Howard A Yeager"
        },
        {
          "equipos": "U5 vs U1",
          "fecha": "2019-10-08",
          "hora": "13:00",
          "ubicacion": "Greenbay"
        },
        {
          "equipos": "U6 vs U3",
          "fecha": "2019-10-20",
          "hora": "9:30",
          "ubicacion": "North"
        },
        {
          "equipos": "U2 vs U4",
          "fecha": "2019-10-20",
          "hora": "13:00",
          "ubicacion": "Marjorie P Hart"
        },
        {
          "equipos": "U3 vs U1",
          "fecha": "2019-10-27",
          "hora": "9:30",
          "ubicacion": "AJ Katzenmaier"
        },
        {
          "equipos": "U5 vs U6",
          "fecha": "2019-10-27",
          "hora": "13:00",
          "ubicacion": "Howard A Yeager"
        }
      ]
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

  body {
    background: #343A40 !important;
    font-family: 'Lato', sans-serif !important;
  }

  button.menu {
    background: #033949 !important;
    border-color: #A3FF15 !important;
    border-width: 2px !important;
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
    background-color: #033949 !important;
    border-bottom: 0px !important;
    /* justify-content: center !important; */
  }

  .modal-header h5 {
    /* align-items: center !important; */
  }
  
  .modal-body {
    background-color: #033949 !important;
  }



</style>
