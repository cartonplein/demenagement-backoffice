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
            <div class="choice-panel" @click="openPageGestionCoorCp">
              <h2>Gestion de coordonnées Carton Plein</h2>
              <img :src="imageCartonPlein">
            </div>
          </div>
          <div class="cell">
            <div class="choice-panel" @click="openPageGestionAgenda">
              <h2>Gestion de l'agenda</h2>
              <img :src="imageAgenda">
            </div>
          </div>
          <div class="cell">
            <div class="choice-panel" @click="openPageGestionInventaire">
              <h2>Gestion de l'inventaire</h2>
              <img :src="imageInventaire">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <div class="choice-panel" @click="openPageGestionDemandes">
              <h2>Gestion de demandes des clients</h2>
              <img :src="imageDemandes">
            </div>
          </div>
          <div class="cell">
            <div class="choice-panel" @click="openPageGestionTarification">
              <h2>Gestion de tarification</h2>
              <img :src="imageTarification">
            </div>
          </div>
          <div class="cell">
            <div class="choice-panel" @click="openPageGestionInterface">
              <h2>Gestion de l'interface graphique</h2>
              <img :src="imageInterface">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import firebase from 'firebase';
import imageCartonPlein from "../assets/logo-cp.png"
import imageAgenda from "../assets/calendar-512.png"
import imageInventaire from "../assets/inventory.png"
import imageDemandes from "../assets/demandes-clients.png"
import imageTarification from "../assets/tarification.png"
import imageInterface from "../assets/interface.png"

export default {
    name: 'Dashboard',
    data () {
      return {
        name: '',
        photo: '',
        user: {},

        imageCartonPlein: imageCartonPlein,
        imageAgenda: imageAgenda,
        imageInventaire: imageInventaire,
        imageDemandes: imageDemandes,
        imageTarification: imageTarification,
        imageInterface: imageInterface
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
