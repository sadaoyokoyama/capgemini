<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-md-8">
        <div class="card" style="height: 500px;">
          <div class="card-header">Selecione uma das opções abaixo</div>
            <div class="card-body h-100">
              <div class="row h-100">
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 pb-2">
                  <div class="list-group" id="list-tab" role="tablist">
                    <router-link 
                      :to="{ name: 'home' }"
                      class="list-group-item list-group-item-action"
                      :class="{'active': $route.path === '/'}">
                      Início
                    </router-link>
                    <router-link 
                      :to="{ name: 'balance' }"
                      class="list-group-item list-group-item-action"
                      :class="{'active': subIsActive('/balance')}">
                      Saldo
                    </router-link>
                    <router-link 
                      :to="{ name: 'withdrawal' }"
                      class="list-group-item list-group-item-action"
                      :class="{'active': subIsActive('/withdrawal')}">
                      Saque
                    </router-link>
                    <router-link 
                      :to="{ name: 'deposit' }"
                      class="list-group-item list-group-item-action"
                      :class="{'active': subIsActive('/deposit')}">
                      Depósito
                    </router-link>
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 d-flex justify-content-center align-items-center">
                  <router-view :key="$route.path"></router-view>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => this.$route.path.indexOf(path) === 0)
    }
  }
}
</script>