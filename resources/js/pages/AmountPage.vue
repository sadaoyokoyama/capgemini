<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex align-items-center">
          <div class="d-flex flex-column bd-highlight mb-3">
            <div class="p-2 bd-highlight d-flex justify-content-center">
              <h3>Insira o valor da retirada</h3>
            </div>
            <div class="p-2 bd-highlight d-flex justify-content-center">
              <h5>Conta <strong> {{ accountData && accountData.number | format }} </strong></h5>
            </div>  
            <div class="p-2 bd-highlight d-flex justify-content-center">
              <h5>Titular <strong> {{ accountData && accountData.user.name }} </strong></h5>
            </div>  
            <account-amount 
              @onConfirm="onConfirm">
            </account-amount>   
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AccountAmount from '../components/AccountAmount';

export default {
  components: {
    AccountAmount
  },
  mounted() {
    if (this.accountData == null) {
      this.$router.push(`/${this.action}`);
    }
  },
  computed: {
    ...mapGetters([
      'action', 
      'accountData'
    ])
  },
  filters: {
    format: function (value) {
      if (!value) return ''
      
      const number = value.slice(0, 4);
      const digit = value[value.length - 1];
      
      return `${number}-${digit}`;
    }
  },
  methods: {
    voltar (e) {
      this.$router.back();
      this.$store.commit('restartAction');
    },
    onConfirm (amount) {
      this.$store.commit('setAmount', amount);
      this.$router.push(`/${this.action}/${this.$route.params.account}/password`);
    }
  }
}
</script>
