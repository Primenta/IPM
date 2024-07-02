<template>
  <div class="container">
    <div class="content">
      <img class="logo" src="../assets/esideal.png" alt="Esideal Logo"/>
      <h1>Sign Up</h1>
      <div class="register">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" placeholder="Enter Email"/>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="Enter Password"/>
        <button v-on:click="signUp">Sign Up</button>
        <p class="signup-link">
          Already have an account? <router-link to="/login" class="signup-button">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async signUp() {
      this.error = '';
      if (!this.email || !this.password) {
        this.error = 'Please fill in all fields';
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/users?email=${this.email}`);
        if (response.data.length > 0) {
          this.error = 'Email already registered';
          return;
        }
      } catch (error) {
        console.error('Error checking email:', error);
        return;
      }

      try {
        let result = await axios.post("http://localhost:3000/users", {
          email: this.email,
          password: this.password
        });

        if (result.status == 201) {
          localStorage.setItem("user-info", JSON.stringify(result.data))
          this.$router.push({name: 'Home'})
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.content {
  text-align: center;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}

.register {
  width: 100%;
  max-width: 600px;
}

.register label {
  display: block;
  margin-bottom: 5px;
}

.register input {
  width: calc(100% - 10px);
  height: 40px;
  padding-left: 15px;
  margin-bottom: 15px;
  border: 1px solid #3498db;
  border-radius: 5px;
}

.register button {
  width: 100%;
  height: 40px;
  border: none;
  background: #3498db;
  color: white;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.register button:hover {
  background-color: #2980b9;
}

.signup-link {
  margin-top: 15px;
}

.signup-button {
  color: #3498db;
  text-decoration: none;
}

.signup-button:hover {
  text-decoration: underline;
}
</style>
