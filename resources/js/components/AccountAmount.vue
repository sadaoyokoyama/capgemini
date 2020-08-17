<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex align-items-center">
        <div class="d-flex flex-column bd-highlight mb-3">
          <div class="p-2 bd-highlight d-flex justify-content-center">
            <input
              v-model.lazy="amount"
              v-money="money"
              value="0.00"
              class="text-center form-control-lg mb-2">
          </div>  
          <div class="p-2 bd-highlight d-flex justify-content-center">
            <div class="btn-group btn-group-lg">
              <button 
                type="button"
                class="btn btn-default btn-lg bordered" 
                v-on:click="$router.back();">
                Voltar
              </button>
              <button 
                type="button"
                class="btn btn-primary btn-lg"
                :disabled="validateAmount"
                v-on:click="confirm">
                Confirmar
              </button>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VMoney } from 'v-money';

export default {
  data() {
    return {
      amount: 0.00,
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
      }
    }
  },
  computed: {
    validateAmount() {
      let value = '' + this.amount;
      value = Number(value.replace('.', '').replace(',', '.'))
      
      return value === 0;
    }
  },
  methods: {
    confirm (e) {
      let value = '' + this.amount;
      value = Number(value.replace('.', '').replace(',', '.'))

      this.$emit('onConfirm', value);
    }
  },
  directives: { money: VMoney }
}
</script>