<template>
  <Header />
  <div class="content">
    <div class="carro">
      <div class="titulo">
        <h1>Detalhes do Serviço</h1>
      </div>
      <img src="../assets/car.png"/>
      <div class="nome">
        <span>{{ clientDetails.nome }}</span>
      </div>
      <div class="matricula">
        <span>{{ vehicleDetails.id }}</span>
      </div>
    </div>
    <div class="dados">
      <div class="detail contacto">
        <span class="label">Contacto:</span>
        <span class="value">{{ clientDetails.telefone }}</span>
      </div>
      <div class="detail modelo">
        <span class="label">Modelo:</span>
        <span class="value">{{ vehicleDetails.modelo }}</span>
      </div>
      <div class="detail hora">
        <span class="label">Hora de término:</span>
        <span class="value">{{ horaTermino }}</span>
      </div>
    </div>
    <div class="buttons">
      <button @click="goBack" class="action-button grey retroceder">Retroceder</button>
      <button v-if="serviceDetails.estado === 'nafila'" @click="startService" class="action-button green suspender">
        Iniciar Serviço
      </button>
      <button v-if="serviceDetails.estado === 'suspenso'" @click="initializeService" class="action-button green suspender">Iniciar Serviço</button>
      <button v-if="serviceDetails.estado === 'programado'" @click="suspendService" class="action-button blue">Suspender</button>
      <button v-if="serviceDetails.estado === 'programado'" @click="finalizeService" class="action-button green terminar">
        Finalizar Serviço
      </button>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import db from '../../../db/db.json';
import axios from 'axios'

export default {
  components: {
    Header
  },
  props: {
    serviceId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      serviceDetails: null,
      vehicleDetails: null,
      clientDetails: null,
      horaTermino: '', 
    };
  },
  created() {
    this.fetchServiceDetails();
  },
  methods: {
    finalizeService() {
      if (!this.serviceDetails || !this.serviceDetails.id) {
        console.error("Detalhes do serviço não estão definidos ou ID não está presente.");
        return;
      }
      axios.patch(`http://localhost:3000/services/${this.serviceDetails.id}`, {
        estado: 'realizado'
      })
      .then(response => {
        this.serviceDetails.estado = 'realizado';
        this.$router.go(-1);
      })
      .catch(error => {
        console.error("Não foi possível atualizar o serviço com id:", this.serviceDetails.id, error);
      });
    },
    startService() {
      if (!this.serviceDetails) {
        console.error("Detalhes do serviço não estão definidos.");
        return;
      }
      axios.patch(`http://localhost:3000/services/${this.serviceDetails.id}`, {
        estado: 'programado'
      })
      .then(response => {
        this.serviceDetails.estado = 'programado';
        this.$router.go(-1);
      })
      .catch(error => {
        console.error("Erro ao iniciar o serviço:", error);
      });
    },
    initializeService() {
      if (!this.serviceDetails || !this.serviceDetails.id) {
        console.error("Detalhes do serviço não estão definidos ou ID não está presente.");
        return;
      }
      axios.patch(`http://localhost:3000/services/${this.serviceDetails.id}`, {
        estado: 'programado'
      })
      .then(response => {
        this.serviceDetails.estado = 'programado';
        this.$router.go(-1);
      })
      .catch(error => {
        console.error("Não foi possível inicializar o serviço com id:", this.serviceDetails.id, error);
      });
    },
    suspendService() {
      if (!this.serviceDetails || !this.serviceDetails.id) {
        console.error("Detalhes do serviço não estão definidos ou ID não está presente.");
        return;
      }
      axios.patch(`http://localhost:3000/services/${this.serviceDetails.id}`, {
        estado: 'suspenso'
      })
      .then(response => {
        this.serviceDetails.estado = response.data.estado;
        this.$nextTick(() => {
          this.$router.push({ name: 'Reason', params: { serviceId: this.serviceDetails.id } });
        });
      })
      .catch(error => {
        console.error("Não foi possível suspender o serviço com id:", this.serviceDetails.id, error);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    fetchServiceDetails() {
      const service = db.services.find(s => s.id === this.serviceId);
      if (!service) {
        console.error("Serviço não encontrado.");
        return;
      }
      const serviceDefinition = db['service-definitions'].find(sd => sd.id === service['service-definitionId']);
      if (!serviceDefinition) {
        console.error("Definição de serviço não encontrada.");
        return;
      }
      this.serviceDetails = {
        ...serviceDefinition,
        ...service
      };
      const vehicle = db.vehicles.find(v => v.id === service.vehicleId);
      if (!vehicle) {
        console.error("Detalhes do veículo não encontrados.");
        return;
      }
      this.vehicleDetails = vehicle;
      const client = db.clients.find(c => c.id === vehicle.clientId);
      if (!client) {
        console.error("Detalhes do cliente não encontrados.");
        return;
      }
      this.clientDetails = client;

      const duracao = serviceDefinition['duração'];
      if (duracao) {
        let now = new Date();
        now.setMinutes(now.getMinutes() + duracao);

        let closingTime = new Date(now);
        closingTime.setHours(19, 1, 0, 0);

        let openingTime = new Date(now);
        openingTime.setHours(7, 0, 0, 0);

        if (now >= closingTime || now <= openingTime) {
          if (now.getHours() >= 19 && now.getMinutes() > 1) {
            now.setDate(now.getDate() + 1);
          }
          now.setHours(7, 0, 0, 0);
          now.setMinutes(duracao);
        }

        this.horaTermino = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
  }
};
</script>

<style scoped>
.content {
  background-color: white;
  display: grid;
}

.titulo {
  grid-area: titulo;
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.carro{
  background-image: linear-gradient(to right, #3498db, #10496f);;
  grid-area: carro;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
}

.carro img {
  width: 300px;
  filter: drop-shadow(0px 4px 8px #cfcfcf);
}

.nome {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
}

.dados {
  grid-area: dados;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 700px;
}

.detail {
  display: flex;
  justify-content:space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 30px;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  text-align: right;
  color: #666;
}

.buttons {
  grid-area: buttons;
  place-self: center;
  display: flex;
  padding: 12px;
  height: 80px;
  gap: 1rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.grey {
  background-color: #7f8c8d;
  color: white;
}

.green {
  background-color: #2ecc71;
  color: white;
}

.blue {
  background-color: #3498db;
  color: white;
}

.action-button:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-areas:
      "carro"
      "dados"
      "buttons";
    justify-items: center;
    align-items: center;
    margin: 150px auto;
  }

  .carro img{
    margin-top: 20px;
  }

  .detail{
    flex-direction: column;
  }

  .buttons {
    justify-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

@media (min-width: 769px) {
  .content {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
      "carro dados"
      "carro buttons";
    height: 450px;
    margin: 150px auto;
  }

  .titulo {
    padding: 16px;
    font-size: 20px;
    white-space: nowrap;
  }

  .buttons {
    justify-self: center;
  }
}

</style>