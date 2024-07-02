<template>
  <router-view />
</template>

<script>
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'

export default {
  name: 'App',
  components:{
    SignUp,
    Login
  }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #abc5c7;
    padding-top: auto;
}
</style>