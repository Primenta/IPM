<template>
  <div>
    <Header />
    <div class="content">
      <div class="hometext-container">
        <h1>Bem-vindo aos serviços da oficina E.S Ideal!</h1>
        <p>Es Ideal é uma empresa de mecânicos de carros comprometida em fornecer serviços de alta qualidade para veículos de todos os tipos. A nossa equipa de profissionais muito experientes está pronta para atender às suas necessidades automotivas.</p>
      </div> 
      <div class="buttons-container">
        <div class="button-container">
          <img class="logo" src="../assets/eletrico.png"/>
          <router-link to="/eletrico" class="large-button electric-button">Posto Elétrico</router-link>
        </div>
        <div class="button-container">
          <img class="logo" src="../assets/gasolina.png"/>
          <router-link to="/gasolina" class="large-button gasoline-button">Posto Gasolina</router-link>
        </div>
        <div class="button-container">
          <img class="logo" src="../assets/diesel.png"/>
          <router-link to="/diesel" class="large-button diesel-button">Posto Diesel</router-link>
        </div>
        <div class="button-container">
          <img class="logo" src="../assets/hibrido.png"/>
          <router-link to="/hibrido" class="large-button hybrid-button">Posto Híbrido</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
export default {
  name: 'Home',
  components: {
    Header
  },
  mounted() {
    let user = localStorage.getItem('user-info');
    if (!user) {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>

.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 
    "text    text    text"
    "buttons buttons buttons";
  margin: auto;
  width: fit-content;
  gap: 1rem; 
}

.hometext-container {
  grid-area: text;
  width: 1100px;
  margin: auto;
}

h1 {
  margin-top: auto;
  font-size: 55px;
}

p {
  margin-top: auto;
  font-size: 20px;
}

.buttons-container {
  display: grid;
  grid-area: buttons;
  margin: auto;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 10px;
}

.large-button, .large-button:link, .large-button:visited {
  width: 300px;
  height: 150px;
  font-size: 24px;
  margin: 30px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
}

.large-button:hover, .large-button:active {
  text-decoration: none;
  background-color: darken(#f39c12, 10%);
}

.electric-button {
  background-color: #f39c12;
}

.gasoline-button {
  background-color: #e74c3c;
}

.diesel-button {
  background-color: #3498db;
}

.hybrid-button {
  background-color: #2ecc71;
}

@media screen and (max-width: 700px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
      "text"
      "buttons";
  }

  .hometext-container {
    margin: 120px auto auto auto;
    width: 100%;
    grid-template-columns: 1fr;
  }

  h1 {
    margin-top: auto;
    font-size: 32px;
  }

  p {
    margin-top: auto;
    font-size: 15px;
  }

  .buttons-container {
    margin-top: auto;
    display: grid;
    justify-content: center;  
  }

  .large-button, .large-button:link, .large-button:visited {
    width: 100%; 
    height: 50px;
    padding: 5px; 
  }

  .logo {
    width: 100px;
  }
}

@media screen and (max-width: 1000px) and (min-width: 701px) {
  .content {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 
      "text    text"
      "buttons buttons";
  }

  .hometext-container {
    width: 100%;
    grid-template-columns: 1fr 1fr;
  }

  h1 {
    margin-top: 5rem;
    font-size: 32px;
  }

  p {
    margin-top: 1rem;
    font-size: 15px;
  }

  .buttons-container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    justify-content: center;  
  }

  .large-button, .large-button:link, .large-button:visited {
    width: 100%; 
    height: auto;
    padding: 5px;
  }

  .logo {
    width: 75px;
  }
}

@media screen and (min-width: 1001px) {
  .content {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
      ". text ."
      ". buttons .";
  }

  .hometext-container {
    margin-bottom: 1rem;
  }

  .buttons-container {
    display: grid;
    grid-template-columns:repeat(4, 1fr);
  }

  .large-button, .large-button:link, .large-button:visited {
    width: 200px; 
    height: 130px;
  }
}
</style>