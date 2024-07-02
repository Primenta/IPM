<template>
  <Header />
  <div class="container">
    <div class="content">
      <img class="logo" src="../assets/esideal2.png"/>
      <h1>Login</h1>
      <div class="register">
        <input type="text" v-model="userId" placeholder="Enter User ID"/>
        <input type="password" v-model="password" placeholder="Enter Password"/>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button @click="login" class="preto">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import { useAuthStore } from '../stores/auth';
import { ref, computed } from 'vue';

export default {
  name: 'Login',
  components: {
    Header
  },
  setup() {
    const authStore = useAuthStore();
    const userId = ref('');
    const password = ref('');
    const errorMessage = computed(() => authStore.errorMessage);

    const login = async () => {
      await authStore.login(userId.value, password.value);
    };

    return { userId, password, login, errorMessage };
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
}

.content {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 0.5fr 1fr;
  grid-template-areas:
    "logo"
    "login"
    "register";
  text-align: center;
  background-color: #A7B9B0;
  padding: 40px;
}

.logo {
  grid-area: logo;
  background-color: white;
  width: 20vh; 
  margin-bottom: 20px;
  border-radius: 50%;
}

h1 {
  grid-area: login;
  color: white;
  margin-bottom: 20px;
  font-size: 32px; 
}

.register {
  grid-area: register;
  width: 100%;
  max-width: 400px;
}

.register label {
  display: block;
  margin-bottom: 5px;
}

.register input {
  width: 100%;
  height: 7vh;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 2px solid #3498db; 
  border-radius: 12px; 
  font-size: 16px; 
}

.register button {
  width: 100%;
  height: 50px;
  border: none;
  background: #3498db; 
  color: white;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 10px; 
  transition: background-color 0.3s ease;
  font-size: 18px; 
}

.register button:hover {
  background-color: #297fb8; 
}


.error-message {
  color: red;
  margin-top: 10px;
}
</style>

