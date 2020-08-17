<template>
  <div class="row">
    <div class="col-12">
      <div class="btn-group-vertical">
        <div class="btn-group">
          <input 
            v-model="accountNumber"
            v-mask="'####-#'"
            class="text-center readonly form-control-lg mb-2 w-100">
        </div>
        <div class="btn-group w-100">
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="1">1</button>
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="2">2</button>
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="3">3</button>
        </div>
        <div class="btn-group w-100">
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="4">4</button>
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="5">5</button>
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="6">6</button>
        </div>
        <div class="btn-group w-100">
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="7">7</button>
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="8">8</button>
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="9">9</button>
        </div>
        <div class="btn-group w-100">
          <button 
            type="button" 
            class="btn btn-warning" 
            :disabled="disableClearButton"
            v-on:click="onClear">
            Limpar
          </button>
          <button 
            type="button" 
            class="btn btn-outline-secondary" 
            v-on:click="onKey" 
            value="0">0</button>
          <button 
            type="button" 
            class="btn btn-primary" 
            :disabled="validateAccountNumber"
            v-on:click="onConfirm">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accountNumber: ""
    }
  },
  computed: {
    validateAccountNumber() {
      return this.accountNumber.length !== 6;
    },
    disableClearButton() {
      return this.accountNumber.length === 0;
    }
  },
  methods: {
    onConfirm (e) {
      this.$emit('onConfirm', this.accountNumber);
    },
    onKey (e) {
      this.accountNumber += e.target.value;
    },
    onClear (e) {
      this.accountNumber = this.accountNumber.slice(0, -1);
    }
  }   
}
</script>
<style scoped>
button {
  width: 150px;
  height: 70px;
}
</style>