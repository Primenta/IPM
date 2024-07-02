<template>
  <div class="nav">
    <router-link v-if="!isLoginPage" to="/" class="nav-link">Home</router-link>
    <router-link v-if="!isLoginPage" to="/perfil" class="nav-link">Perfil</router-link>
    <a v-if="!isLoginPage" v-on:click="logout" class="nav-link">Logout</a>
    <h1 v-else class="nav-title">ES IDEAL</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isLoginPage() {
      return this.$route.name === 'Login';
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-around; 
  align-items: center; 
  padding: 10px 50px; 
  background-color: #A7B9B0; 
  color: white; 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
  z-index: 1000; 
}
.nav-title {
  margin: 0;
}
.logo {
  width: 50px; 
  height: auto;
}
.nav-link {
  color: rgb(0, 0, 0); 
  text-decoration: none; 
  border-radius: 10px; 
  padding: 10px 15px; 
  cursor: pointer;
  transition: 0.7s; 
}

.nav-link:hover {
  background-color: #495b58; 
  color: white; 
}
</style>
