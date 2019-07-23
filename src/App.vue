<template>
  <div id="app">
    <div class="b-container mx-auto text-center" style="max-width: 480px;">
      <h2 class="mt-3">Upcoming Games</h2>
      <div>
        <b-button v-b-toggle.collapse-september class="m-3">September</b-button>
        <b-collapse visible id="collapse-september">
            <div class="d-flex flex-column">
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
            </div>
        </b-collapse>
      </div>
      <div>
        <b-button v-b-toggle.collapse-october class="m-3">October</b-button>
        <b-collapse visible id="collapse-october">
            <div class="d-flex flex-column">
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
              <b-button class="d-block m-3">Equipo 1 vs Equipo 2</b-button>
            </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
      showDismissibleAlert: false,
      form: {
        email: '',
        password: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true
    }
  },
  methods: {
    handleClick() {
      this.showDismissibleAlert = true
    },
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.password = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

  body {
    background: #EEF1F4 !important;
    font-family: 'Lato', sans-serif !important;
  }

  .nav-background {
    background: #353535;
  }
</style>
