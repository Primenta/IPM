<template>
    <Header />
    <div class="service-page">
      <div class="title-section">
        <h1>Serviços do Posto</h1>
      </div>
      <div @click="toggleDropdown()" class="sort-dropdown" :class="{ 'active': showDropdown }">
        <button class="dropbtn">Filtrar</button>
        <div v-show="showDropdown" class="dropdown-content">
          <a @click="toggleSortMode('byArrival')">Programado</a>
          <a @click="toggleSortMode('byDate')">Fila de Espera</a>
        </div>
      </div>
      <div class="service-content">
        <h2>Selecione um serviço:</h2>
        <div class="service-list">
          <div v-for="service in filteredServices" :key="service.id" class="service-card" @click="handleServiceClick(service.id)">
            <router-link :to="{ name: 'ServiceDetails', params: { serviceId: service.id }}" class="service-description">
              {{ getServiceDescription(service['service-definitionId']) }}
            </router-link>
            <span class="status" :class="getStatusClass(service.estado)">
              {{ getStatusText(service.estado) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  import db from '../../../db/db.json';
  
  export default {
    name: 'GasolinaServices',
    components: {
      Header
    },
    data() {
      return {
        vehicles: db.vehicles,
        services: db.services,
        serviceDefinitions: db['service-definitions'],
        sortMode: 'byArrival',
        buttonText: 'Fila de Espera',
        showDropdown: false
      };
    },
    computed: {
      filteredServices() {
        const gasolinaVehiclesIds = this.vehicles
          .filter(vehicle => vehicle['vehicle-typeId'] === 'gasoleo')
          .map(vehicle => vehicle.id);
  
        let services = this.services.filter(service =>
          gasolinaVehiclesIds.includes(service.vehicleId)
        );
  
        if (this.sortMode === 'byDate') {
          return services.filter(service => service.agendamento === 'programado')
                         .sort((a, b) => new Date(a.data.ano, a.data.mes - 1, a.data.dia, a.data.hora, a.data.minutos) - 
                                         new Date(b.data.ano, b.data.mes - 1, b.data.dia, b.data.hora, b.data.minutos));
        } else {
          return services.filter(service => service.agendamento === 'filaDeEspera');
        }
      }
    },
    methods: {
      toggleSortMode(mode) {
        this.sortMode = mode;
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      getServiceDescription(serviceDefinitionId) {
        const service = this.serviceDefinitions.find(service => service.id === serviceDefinitionId);
        return service ? service.descr : 'Descrição não disponível';
      },
      getStatusClass(estado) {
        switch (estado) {
          case 'nafila':
            return 'to-do';
          case 'programado':
            return 'in-progress';
          case 'realizado':
            return 'completed';
          case 'suspenso':
            return 'suspended';
          default:
            return '';
        }
      },
      getStatusText(estado) {
      switch (estado) {
        case 'nafila':
          return 'Por realizar';
        case 'programado':
          return 'A ser realizado';
        case 'realizado':
          return 'Concluído';
        case 'suspenso':
          return 'Suspenso';
        default:
          return 'Desconhecido';
      }
    },
      handleServiceClick(serviceId) {
        console.log('Service ID clicado:', serviceId);
      }
    }
  };
  </script>
  
  <style scoped>
  .service-page {
    background-color: #A7B9B0;
    display: grid;
  }
  
  .title-section h1{
    grid-area: title;
  }
  
  .title-section h1,
  .service-content h2 {
    text-align: center;
    width: 100%;
  }
  
  .service-content {
    grid-area: services;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .title-section h1 {
    color: #333;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .service-content h2 {
    color: #555;
    margin-top: 0;
  }
  
  .service-list {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }
  
  .service-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: center;
    background-color: #333;
    border-radius: 10px;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;
  }
  
  .service-card:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  
  .service-description {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  
  .status {
    padding: 5px 10px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    text-align: center;
  }
  
  .to-do {
    background-color: #e74c3c;
  }
  
  .in-progress {
    background-color: #f1c40f;
  }
  
  .completed {
    background-color: #2ecc71;
  }
  
  .suspended {
    background-color: #3498db;
  }
  
  .dropbtn {
    background-color: #3498db;
    color: white;
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    width: 160px;
    cursor: pointer;
  }
  
  .sort-dropdown {
    grid-area: button;
    justify-self: end;
    position: relative;
    display: inline-block;
    width: 160px;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }
  
  .dropdown-content a:hover {background-color: #808080}
  
  .sort-dropdown.active .dropdown-content {
    display: block;
  }
  
  @media (min-width: 769px) {
    .service-page {
      display: grid;
      grid-template-areas:
        'title button'
        'services services';
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 150px 1fr;
      height: 100%;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px 70px 70px 70px;
      border-radius: 10px;
      max-width: 800px;
      margin: 150px auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
  
  
  @media (max-width: 768px) {
    .service-page {
      grid-template-areas:
        'title'
        'button'
        'services';
      grid-template-columns: 1fr;
      grid-template-rows: auto 50px 1fr;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 150px auto;
      padding: 40px;
      gap: 20px;
      max-width: 400px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .sort-dropdown {
      justify-self: center;
    }
  
    .service-card {
      padding: 0.8rem;
    }
  }
  
  </style>
  