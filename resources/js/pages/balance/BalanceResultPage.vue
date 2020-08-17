<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex align-items-center">
        <div class="d-flex flex-column bd-highlight mb-3">
          <div class="p-2 bd-highlight d-flex justify-content-center">
            <h5>O saldo da conta é de</h5>
          </div>  
          <div class="p-2 bd-highlight d-flex justify-content-center">
            <h1 
              class="font-weight-bold"
              :style="{ color: fontoColor }">
              R$ {{ parseFloat(amount).toFixed(2) }}
            </h1>
            </div>  
          <div class="p-2 bd-highlight d-flex justify-content-center">
            <div class="btn-group btn-group-lg">
              <button 
                type="button"
                class="btn btn-default btn-lg" 
                v-on:click="restart">
                Nova consulta
              </button>
              <button 
                type="button"
                class="btn btn-success btn-lg"
                v-on:click="finish">
                Finalizar
              </button>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    if (this.amount == null) {
      this.$router.push(`${this.action}`);
    }
  },
  computed: {
    ...mapGetters(['action', 'amount']),
    fontoColor() {
      return (this.amount > 0) 
        ? 'green' : (this.amount < 0 ? 'red' : 'grey');
    }
  },
  methods: {
    finish (e) {
      this.$store.commit('finishAction');
      this.$store.commit('resetAmount');
      this.$router.push('/');
    },
    restart (e) {
      this.$store.commit('finishAction');
      this.$store.commit('resetAmount');
      this.$router.push('/balance');
    }
  }
}
</script>