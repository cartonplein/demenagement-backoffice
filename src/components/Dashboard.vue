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
            <div class="calendar-panel" @click="openPageAgenda">
              <h2>Gestion de l'agenda</h2>
              <img :src="imageAgenda">
            </div>
          </div>
          <div class="cell">
            <div class="inventory-panel">
              <h2>Gestion de l'inventaire</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import firebase from 'firebase';
import imageAgenda from "../assets/calendar-512.png"

export default {
    name: 'Dashboard',
    data () {
      return {
        name: '',
        photo: '',
        user: {},

        imageAgenda: imageAgenda
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
      openPageAgenda () {
        this.$router.push('/agenda');
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
