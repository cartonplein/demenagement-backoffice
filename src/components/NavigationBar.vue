<template>
  <div id="navigation-bar">
    <div class="upper-bar">
      <a @click="openPageGestionCoorCp()">Gestion coordonnées Carton Plein</a>
      <a @click="openPageGestionAgenda()">Gestion agenda</a>
      <a @click="openPageGestionInventaire()">Gestion inventaire</a>
      <a @click="openPageGestionDemandes()">Gestion demandes</a>
      <a @click="openPageGestionTarification()">Gestion tarification</a>
      <a @click="openPageGestionInterface()">Gestion interface graphique</a>
      <a @click="openDashboard()">Revenir à l'accueil</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Interface',
  methods: {
    openPageGestionCoorCp () {
      this.$router.push('/coor_cp');
    },
    openPageGestionAgenda () {
      this.$router.push('/agenda');
    },
    openPageGestionInventaire () {
      this.$router.push('/inventaire');
    },
    openPageGestionDemandes () {
      this.$router.push('/demandes');
    },
    openPageGestionTarification () {
      this.$router.push('/tarification');
    },
    openPageGestionInterface () {
      this.$router.push('/interface');
    },
    openDashboard () {
      this.$router.push('/dashboard');
    }
  }
}
</script>

<style lang="scss" scoped>

#navigation-bar {

  .upper-bar {
    overflow: hidden;
    background-color: #E85029;
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    height: 8%;
  }

  .upper-bar  a {
    font-size: 12px;
    float: left;
    display: block;
    color: #ddd;
    text-align: center;
    padding: 16px 16px;
    text-decoration: none;
    margin-right: 10px;
  }

  .upper-bar  a:hover {
    cursor: pointer;
    background: #ddd;
    color: #E85029;
  }

}

</style>
