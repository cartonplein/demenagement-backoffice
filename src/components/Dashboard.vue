<template>
    <div id="dashboard">
      <div class="upper-bar">
        <img class= "user-photo" :src="photo" @click="displayPhoto">
        <p><b>Bienvenue {{ name }} ! </b></p>
        <a href="#deconnexion" @click="logOut">Déconnexion</a>
      </div>
      <div class="main">
        <div class="row">
          <div class="cell">
            <div class="calendar-panel" @click="openPageGestionAgenda">
              <h2>Gestion de l'agenda</h2>
              <img :src="imageAgenda">
            </div>
          </div>
          <div class="cell">
            <div class="inventory-panel" @click="openPageGestionInventaire">
              <h2>Gestion de l'inventaire</h2>
              <img :src="imageInventaire">
            </div>
          </div>
          <div class="cell">
            <div class="order-panel" @click="openPageGestionDemandes">
              <h2>Gestion de demandes des clients</h2>
              <img :src="imageDemandes">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import firebase from 'firebase';
import imageAgenda from "../assets/calendar-512.png"
import imageInventaire from "../assets/inventory.png"
import imageDemandes from "../assets/demandes-clients.png"

export default {
    name: 'Dashboard',
    data () {
      return {
        name: '',
        photo: '',
        user: {},

        imageAgenda: imageAgenda,
        imageInventaire: imageInventaire,
        imageDemandes: imageDemandes
      }
    },
    created () {
      this.user = firebase.auth().currentUser;
      if(this.user) {
        this.name = this.user.displayName;
        this.photo = this.user.photoURL;
      }
    },
    methods: {
      logOut () {
        firebase.auth().signOut();
        if(!this.user) {
          this.$router.push('/login');
          console.log(firebase.auth().currentUser);
        }
      },
      displayPhoto () {
        console.log(this.photo);
      },
      openPageGestionAgenda () {
        this.$router.push('/agenda');
      },
      openPageGestionInventaire () {
        this.$router.push('/inventaire');
      },
      openPageGestionDemandes () {
        this.$router.push('/demandes');
      }
    }
}
</script>




<style lang="scss" scoped>

html, body {
  height: 100%;
  margin: 0;
}



</style>
