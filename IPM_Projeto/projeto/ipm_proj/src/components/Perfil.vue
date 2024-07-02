<template>
    <Header />
      <div class="profile">
        <div class="profile-pic">
          <img src="../assets/profile.png"/>
        </div>
        <div class="personal-info">
          <h1>{{ profile.name }}</h1>
          <div class="ipl">
            <p><b>Idade:</b>{{ profile.idade }}</p>
            <p><b>Profissão:</b>{{ profile.profissao }}</p>
            <p><b>Localização:</b>{{ profile.localizacao }}</p>
          </div>
        </div> 
        <div class="global-info">
          <div class="education">
            <h2>Educação</h2>
            <p>{{ profile.educacao }}</p>
          </div>
          <div class="specialization">
            <h2>Especialização</h2>
            <p>{{ profile.especializacao }}</p>
          </div>
          <div class="interests">
            <h2>Interesses</h2>
            <p>{{ profile.interesses }}</p>
          </div>
          <div class="objectives">
            <h2>Objetivos</h2>
            <p>{{ profile.objetivos }}</p>
          </div>
          <div class="challenges">
            <h2>Desafios</h2>
            <p>{{ profile.desafios }}</p>
          </div>
          <div class="solutions">
            <h2>Soluções</h2>
            <p>{{ profile.solucoes }}</p>
          </div>
          <blockquote>{{ profile.citacao }}</blockquote>
          </div>
      </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  
  export default {
  name: 'ProfilePage',
  components: {
    Header
  },
  data() {
    return {
      profile: {
        name: '',
        idade: '',
        profissao: '',
        localizacao: '',
        educacao: '',
        especializacao: '',
        interesses: [],
        objetivos: '',
        desafios: '',
        solucoes: '',
        citacao: ''
      }
    }
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    fetchUserProfile() {
      let userInfo = localStorage.getItem('user-info');
      if (userInfo) {
        userInfo = JSON.parse(userInfo);

        this.profile.name = userInfo.name || this.profile.name;
        this.profile.idade = userInfo.idade || this.profile.idade;
        this.profile.profissao = userInfo.profissao || this.profile.profissao;
        this.profile.localizacao = userInfo.localizacao || this.profile.localizacao;
        this.profile.educacao = userInfo.educacao || this.profile.educacao;
        this.profile.especializacao = userInfo.especializacao || this.profile.especializacao;
        this.profile.interesses = userInfo.interesses || this.profile.interesses;
        this.profile.objetivos = userInfo.objetivos || this.profile.objetivos;
        this.profile.desafios = userInfo.desafios || this.profile.desafios;
        this.profile.solucoes = userInfo.solucoes || this.profile.solucoes;
        this.profile.citacao = userInfo.citacao || this.profile.citacao;
      } else {
        this.$router.push({ name: 'Login' });
      }
    }
  }
}

  </script>
  
  <style scoped>
    .profile {
      color: white;
      display: grid;
    }

    .profile-pic{
      background-color: #3498db;
      border-radius: 8px 0 0 8px;
      grid-area: pic;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .profile-pic img{
      background-color: #10496f;
      width: 100px;
      border-radius: 50%;
    }

    .personal-info{
      background-color: #3498db;
      border-radius: 0 8px 8px 0;
      grid-area: pinfo;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .profile h1 {
      border: solid;
      border-radius: 50px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px; 
      width: 100%;

    }

    .ipl {
      display: flex;
      flex-direction: row;
      gap: 20px;
      margin: 10px 0;
    }

    .global-info{
      grid-area: ginfo;
      display: flex;
      flex-direction: column;
    }

    .education,
    .specialization,
    .interests,
    .objectives,
    .challenges,
    .solutions {
      background-color: white;
      color: #10496f;
      padding: 20px 20px 40px 20px;
      border-radius: 8px;
      margin-top: 15px;
    }

    .education h2,
    .specialization h2,
    .interests h2,
    .objectives h2,
    .challenges h2,
    .solutions h2 {
      font-size: 1.8em;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .education p,
    .specialization p,
    .objectives p,
    .challenges p,
    .solutions p,
    .interests p {
      color: #818181;
      margin-top: 20px;
    }

    .interests li{
      list-style: none;
      display: 	inline-block;
      padding: 0.5rem 1.5rem;
      margin: 10px 20px 0 0;
      border: solid;
      border-width: 1px;
      border-color: #818181;
      border-radius: 20px;
      background-color:	#a6a6a6;
      color: white;
    }

    blockquote {
      position: relative;
      font-style: italic;
      font-size: 1.2em;
      color: #818181;
      margin-top: 30px;
      padding: 20px;
      border-left: 5px solid #10496f;
      background-color: white;
    }

    blockquote::before {
      content: open-quote;
      position: absolute;
      top: -10px;
      left: 15px;
      font-size: 3em;
      color: #10496f;
    }

    @media screen and (max-width: 700px) {
      .profile {
        grid-template-columns: 1fr;
        grid-template-rows: 150px auto auto;
        grid-template-areas:
        "pic"
        "pinfo"
        "ginfo";
        margin-top: 100px;
        width: 350px; 
      }

      .profile-pic{
        border-radius: 8px 8px 0 0;
      }

      .personal-info{
        border-radius: 0 0 8px 8px;
      }
    }

    @media screen and (min-width: 701px) and (max-width: 1000px) {
      .profile {
        grid-template-columns: 150px 1fr;
        grid-template-rows: auto auto;
        grid-template-areas:
        "pic pinfo"
        "ginfo ginfo";
        margin-top: 100px;
        width: 500px;
      }
    }

    @media screen and (min-width: 1001px) {
      .profile {
        grid-template-columns: 300px 1fr;
        grid-template-rows: auto auto;
        grid-template-areas:
        "pic pinfo"
        "ginfo ginfo";
        margin: 100px auto 50px auto; 
        width: 800px;
      }
    }

  </style>
  
