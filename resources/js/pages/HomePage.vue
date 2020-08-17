<template>
  <div>
    <div class="row" style="margin-bottom: 10px;">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Saldo</h5>
            <p class="card-text">Aqui você pode consultar o seu saldo em poucas etapas.</p>
            <router-link :to="{ name: 'balance' }" class="card-link">Iniciar</router-link>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Saque</h5>
            <p class="card-text">Aqui você pode sacar a quantia que quiser.</p>
            <router-link :to="{ name: 'withdrawal' }" class="card-link">Iniciar</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Depósito</h5>
            <p class="card-text">Deposite aqui a quantidade que quiser para seu dinheiro render mais.</p>
            <router-link :to="{ name: 'deposit' }" class="card-link">Iniciar</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created() {
    //console.log('HomePage', this.started, this.finished);
  },
  computed: {
    ...mapGetters(['started', 'finished']),
    disableStart() {
      return this.started
        && !this.finished;
    },
    disableFinish() {
      return (!this.started) 
        || (this.started && this.finished);
    }
  },
  methods: {
    start (e) {
      this.$store.commit(this.started ? 'restartAction' : 'startAction');
    },
    finish (e) {
      this.$store.commit('finishAction');
    }
  }   
}
</script>
