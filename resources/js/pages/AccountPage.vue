<template>
  <div>
    <h3>Insira o número da conta</h3>
    <account-keyboard 
      @onConfirm="onConfirm">
    </account-keyboard>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AccountKeyboard from '../components/AccountKeyboard';

export default {
  components: {
    AccountKeyboard
  },
  computed: {
    ...mapGetters([
      'started', 
      'finished', 
      'action'
    ])
  },
  methods: {
    async onConfirm (accountNumber) {
      const number = accountNumber.replace('-', '');
      
      try {
        const { data } = await axios.get(`/api/accounts/${number}`);

        this.$store.commit('setAccountData', data.data);
        this.$store.commit(this.started ? 'restartAction' : 'startAction');
        
        if (['withdrawal', 'deposit'].includes(this.action)) {
          this.$router.push(`/${this.action}/${number}/amount`);
        } else {
          this.$router.push(`/${this.action}/${number}/password`);
        }
      } catch (err) {
        console.log(err)
        alert('Conta não encontrada!');
      }
    },
    onFinish (e) {
      this.$store.commit('finishAction');
    }
  }   
}
</script>
