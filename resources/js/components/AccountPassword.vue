<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex align-items-center">
        <div class="d-flex flex-column bd-highlight mb-3">
          <div class="p-2 bd-highlight d-flex justify-content-center">
            <input
              placeholder="Insira a senha" 
              type="password"
              v-model="password"
              v-mask="'######'"
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
                :disabled="validatePassword"
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
export default {
  data() {
    return {
      password: ""
    }
  },
  computed: {
    validatePassword() {
      return this.password.length !== 6;
    }
  },
  methods: {
    confirm (e) {
      this.$emit('onConfirm', this.password);
    }
  }
}
</script>