import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../routers';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    errorMessage: ''
  }),
  actions: {
    async login(userId, password) {
        if (!userId || !password) {
          this.errorMessage = 'User ID and password are required.';
          return;
        }
        try {
          let result = await axios.get(`http://localhost:3000/users?id=${userId}&password=${password}`);
          if (result.status === 200 && result.data.length > 0) {
            this.user = result.data[0];
            this.isAuthenticated = true;
            localStorage.setItem("user-info", JSON.stringify(result.data[0]));
            router.push({ name: 'Home' });
          } else {
            this.errorMessage = 'Invalid User ID or password.';
          }
        } catch (error) {
          this.errorMessage = 'An error occurred. Please try again.';
          console.error(error);
        }
      }
      ,
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user-info");
      router.push({ name: 'Login' });
    }
  }
});
