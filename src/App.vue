<template>
  <div id="app">
    <div class="b-container mx-auto text-center" style="max-width: 480px;">
      <header class="pt-2">
        <a href="#"><img src="nysl_logo.png" alt="NYSL Logo" style="width: 115px;"></a>
        <h2 class="mt-2 text-light font-weight-bold">UPCOMING GAMES</h2>
      </header>
      <div>
        <b-button v-b-toggle.collapse-september class="m-3">September</b-button>
        <b-collapse visible id="collapse-september">
            <div class="d-flex flex-column">
              <template v-for="partido in listaPartidos">
                <b-button class="d-block m-3" v-if="partido.fecha.includes('2019-09')" v-b-popover.hover="'I am popover content!'" title="Popover Title">
                  <b-row>
                    <b-col align-self="start" class="text-secondary text-left">
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
        <b-button v-b-toggle.collapse-october class="m-3">October</b-button>
        <b-collapse id="collapse-october">
            <div class="d-flex flex-column">
              <template v-for="partido in listaPartidos">
                <b-button class="d-block m-3" v-if="partido.fecha.includes('2019-10')">
                  <b-row>
                    <b-col align-self="start" class="text-secondary text-left">
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
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
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

  button {
    background: #033949 !important;
    border-color: #A3FF15 !important;
    border-width: 2px !important;
  }

</style>
