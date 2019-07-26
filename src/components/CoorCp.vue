<template>
  <div id="coor-cp">
    <NavigationBar />
    <div class="main">
      <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Réglage des coordonnées de Carton Plein</div>
      <div style="width: 100%; border-collapse:collapse; border: 2px solid gray; height: 600px; padding: 20px;">
        <div class="form-parametres-tarification">
          <div style="margin-bottom: 5px; height: 10%; position: relative">
            <label>Adresse :</label>
            <vue-google-autocomplete
              ref="adresseCp"
              id="adresse-cp"
              classname="form-control"
              v-on:placechanged="getAdresseCpData"
              country="fr"
              placeholder="Rechercher une adresse"
            >
            </vue-google-autocomplete>
          </div>
          <div style="margin-bottom: 5px; height: 10%; position: relative">
            <label>Coordonnées géographique :</label>
            <input type="text" v-model="coorGeoCp" disabled></input>
          </div>
          <div style="margin-bottom: 5px; height: 10%; position: relative">
            <label>Numéro de téléphone :</label>
            <input type="text" v-model="telCp"></input>
          </div>
          <button id="save-button" @click="saveCoorCp(inputAdresseCp, coorGeoCp, telCp)">Enregistrer</button>
        </div>
        <iframe height="500px" width="500px" id="iframe-map" :src=location style="" allowFullscreen style="float: right;"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

import { store } from '../store.js';
import { db } from '../db/firebaseConfig.js';

export default {
  name: 'CoorCp',
  data () {
    return {
      inputAdresseCp: '',
      coorGeoCp: '',
      location: '',
      telCp: '',
    };
  },
  components: {
    NavigationBar,
    VueGoogleAutocomplete
  },
  mounted() {
    this.getCoorCpData();
  },
  methods: {
    getAdresseCpData(addressData, placeResultData, id) {
      this.inputAdresseCp = placeResultData.formatted_address;
      this.coorGeoCp = placeResultData.geometry.location.lat()+","+placeResultData.geometry.location.lng();
      this.location = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBcc_IiK7JtWDhD9jm20HHjDaduqKHkcNg&q="+this.coorGeoCp+"";
    },

    getCoorCpData() {
      let app = this;
      db.ref('cartonPlein').on('child_added', function(snapshot) {
        if(snapshot.key == 'adresse') {
          app.$refs.adresseCp.update(snapshot.val());
        }
        if(snapshot.key == 'coorGeo') {
          app.coorGeoCp = snapshot.val();
        }
        if(snapshot.key == 'telephone') {
          app.telCp = snapshot.val();
        }
        app.location = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBcc_IiK7JtWDhD9jm20HHjDaduqKHkcNg&q="+app.coorGeoCp+"";
      });
      db.ref('cartonPlein').on('child_changed', function(snapshot) {
        if(snapshot.key == 'adresse') {
          app.$refs.adresseCp.update(snapshot.val());
        }
        if(snapshot.key == 'coorGeo') {
          app.coorGeoCp = snapshot.val();
        }
        if(snapshot.key == 'telephone') {
          app.telCp = snapshot.val();
        }
        app.location = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBcc_IiK7JtWDhD9jm20HHjDaduqKHkcNg&q="+app.coorGeoCp+"";
      });
      //console.log(this.coorGeoCp);
    },

    saveCoorCp(adresse, coorGeo, tel) {
      db.ref('cartonPlein').update({
        adresse: adresse,
        coorGeo: coorGeo,
        telephone: tel
      });
    },

  }
}
</script>

<style lang="scss" scoped>

#coor-cp {

  .main {
    display: table;
    width: 100%;

    .row {
      display: table-row;
    }

    .row .cell {
    //  border: 1px solid gray;
      display: table-cell;
      padding: 20px;
    }

    input[type=text] {
      padding: 5px 5px;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      width: 60%;
      float: right;
    }

    table, tr, td, th {
      border-collapse: collapse;
    }

    .form-parametres-tarification {
      width: 50%;
      max-width: 100%;
      height: 90%;
      overflow: hidden;
      padding: 20px;
      float: left;
    }

    input[type=number] {
      padding: 5px 5px;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      width: 70%;
      float: right;
      padding-right: 30px;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    label {
      float: left;
      font-weight: bold;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    #save-button {
      padding: 3px;
      font-size: 15px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: #fff;
      background-color:  #4CAF50;
      border: none;
      border-radius: 5px;
      box-shadow: 0 5px #999;
      width: 120px;
      height: 40px;
      margin: auto;

      &:hover {background-color: #3e8e41}

      &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }
    }

  }


}

</style>
