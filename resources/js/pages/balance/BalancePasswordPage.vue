<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex align-items-center">
          <div class="d-flex flex-column bd-highlight mb-3">
            <div class="p-2 bd-highlight d-flex justify-content-center">
              <h3>Insira a senha da conta</h3>
            </div>
            <div class="p-2 bd-highlight d-flex justify-content-center">
              <h5>Conta <strong> {{ accountData && accountData.number | format }} </strong></h5>
            </div>  
            <div class="p-2 bd-highlight d-flex justify-content-center">
              <h5>Titular <strong> {{ accountData && accountData.user.name }} </strong></h5>
            </div>  
            <account-password 
              @onConfirm="onConfirm">
            </account-password>   
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import AccountPassword from '../../components/AccountPassword';

export default {
  components: {
    AccountPassword
  },
  created() {
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
    async onConfirm (password) {
      const { account } = this.$route.params;

      try {
        const { data } = await axios.post(`/api/accounts/${account}/balance`, {
          password
        });
        
        this.$store.commit('setAmount', data.balance);
        this.$router.push(`/balance/${this.$route.params.account}/result`);
      } catch (err) {
        if (err.response) {
          const { status } = err.response;

          if (status === 401) {
            alert('Senha incorreta.');
          }
        } else {
          alert('Erro no sistema.');
        }
      }
    }
  }
}
</script>
