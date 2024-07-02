<template>
    <Header />
    <div class="content">
      <h1>Razão para Suspensão</h1>
      <div class="info">
        <textarea v-model="reason" placeholder="Escreva a razão da suspensão..."></textarea>
        <button @click="goBack" class="action-button grey retroceder">Retroceder</button>
        <button @click="submitReason" class="action-button green retroceder">Submeter</button>
      </div>
      <div class="imagem">
        <img src='../assets/complaint.png' />
      </div>
    </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  import axios from 'axios';
  export default {
    data() {
      return {
        reason: ''
      };
    },
    components: {
    Header
  },
    props: {
      serviceId: {
        type: String,
        required: true
      }
    },
    methods: {
      goBack() {
        if (!this.serviceId) {
          console.error("ID do serviço não fornecido.");
          return;
        }
        
        axios.patch(`http://localhost:3000/services/${this.serviceId}`, {
          estado: 'programado'
        })
        .then(() => {
          this.$router.go(-2);
        })
        .catch(error => {
          console.error("Erro ao reverter o estado do serviço com id:", this.serviceId, error);
        });
      },
      submitReason() {
        if (this.reason.trim() === '') {
          alert('Por favor, insira uma razão para a suspensão.');
          return;
        }
        axios.patch(`http://localhost:3000/services/${this.serviceId}`, {
          razao: this.reason,
          estado: 'suspenso'
        })
        .then(() => {
          this.$router.go(-2);
        })
        .catch(error => {
          console.error("Erro ao salvar a razão para o serviço com id:", this.serviceId, error);
        });
      }
    }
  };
  </script>

<style scoped>
.content {
  background-color: #A7B9B0;
  display: grid;
}

.info{
  grid-area: info;
  text-align: end;
}

.imagem{
  grid-area: imge;
}

.imagem img {
  height: 200px;
}

.content h1 {
  grid-area: titulo;
  margin-bottom: 25px;
  color: white;
  justify-self: center;
}

textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.action-button {
  padding: 0.5rem 1rem;
  height: 50px;
  margin-left: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.action-button:hover {
  opacity: 0.8;
}

.action-button.grey {
  background-color: #7f8c8d;
  color: white;
}

.action-button.green {
  background-color: #4CAF50;
  color: #fff;
}

@media (min-width: 769px) {
  .content {
    grid-template-areas:
      'titulo titulo'
      'info imge'
      'info imge';
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 150px auto;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}


@media (max-width: 768px) {
  .content {
    grid-template-areas:
      'titulo'
      'info';
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 150px auto;
    padding: 40px;
    max-width: 800px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .imagem{
    display: none;
  }
}
</style>