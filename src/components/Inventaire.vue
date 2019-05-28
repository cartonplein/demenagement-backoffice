<template>
    <div id="inventaire">
      <div class="upper-bar">
        <a @click="openPageGestionAgenda()">Gestion agenda</a>
        <a @click="openPageGestionInventaire()">Gestion inventaire</a>
        <a @click="openPageGestionDemandes()">Gestion demandes</a>
        <a @click="openDashboard()">Revenir à l'accueil</a>
      </div>
      <div class="main">
        <div class="row">
          <div class="cell" style="width: 60%">
            <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Liste de meubles (cliquer pour modifier/supprimer un meuble)</div>
            <div style="width: 100%; border: 2px solid gray; border-radius: 10px; height: 500px">
              <input id="input-search-bar" type="text" v-model="searchElement" placeholder="Rechercher un élément">
              <div id="list-meubles">
                <div id="element-meuble" v-for="meuble in filteredList" :key="meuble.number" @click="selectAndDisplayElement(meuble)"><b>{{ meuble.number }}.</b> {{ meuble.name }}</div>
              </div>
            </div>
          </div>
          <div class="cell" style="width: 40%">
            <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Ajout/Modification/Suppression d'un meuble</div>
            <div id="form-ajout-meuble">
              <div style="margin-bottom: 5px; height: 10%;">
                <label for="nom-meuble">Nom :</label>
                <input id="nom-meuble" type="text" v-model="elementName"></input>
              </div>
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label for="volume-meuble">Volume :</label>
                <input id="volume-meuble" type="number" v-model.number="elementVolume"></input>
                <span class="unit">m³</span>
              </div>
              <div id="image-element" style="margin-bottom: 10px; height: 10%; position: relative;">
                <img id="image-link" v-show="isElementSelected && selectedElement.image !== ''"></img>
                <!--@click="window.open(this.src);return false;"-->
                <label for="image-meuble">Image :</label>
                <input id="image-meuble" type="file" @change="processFile($event)">
              </div>
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label for="tarif-meuble">Tarif :</label>
                <input id="tarif-meuble" type="number" v-model.number="elementTarif"></input>
                <span class="unit">€</span>
              </div>
              <button id="reset-button" @click="resetForm">Réinitialiser</button>
              <div class="row">
                <div class="cell" style="width: 50%">
                  <button id="save-button" @click="saveElementInventaire(selectedElement, elementName, elementVolume, elementTarif, elementImage)">Enregistrer</button>
                </div>
                <div class="cell" style="width: 50%">
                  <button id="delete-button" @click="deleteElementInventaire(selectedElement)" v-bind:class="{ 'disableButton': !isElementSelected }">Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { store } from '../store.js';
import { config } from '../db/firebaseConfig.js';

const fb = require('../db/firebaseConfig.js');

export default {
  name: 'Inventaire',
  data () {
    return {
      searchElement: '',
      isElementSelected: false,
      elementName: '',
      elementVolume: '',
      elementTarif: '',
      elementImage: null,
      selectedElement: {},

      isAdded: false,
      isModified: false,
      isDeleted: false
    };
  },
  firebase: {
    meubles: fb.inventaireRef.child('meubles')
  },
  methods: {
    selectAndDisplayElement(element) {
      this.elementName = element.name;
      this.elementVolume = element.volume;
      this.elementTarif = element.tarif;
      if(element.image !== '') {
        document.getElementById("image-element").style.marginBottom = "100px";
        document.getElementById("image-meuble").style.top = "105px";
      }
      else {
        document.getElementById("image-element").style.marginBottom = "10px";
        document.getElementById("image-meuble").style.top = "0";
      }
      document.getElementById("image-link").setAttribute("src", element.image);
      this.isElementSelected = true;
      this.selectedElement = element;
    },
    saveElementInventaire(element, elementName, elementVolume, elementTarif, elementImage) {
      store.saveElementInventaire(element, elementName, elementVolume, elementTarif, elementImage);
      this.resetForm();
    },
    deleteElementInventaire(element) {
      store.deleteElementInventaire(element)
      this.resetForm();
    },
    resetForm() {
      this.elementName = '';
      this.elementVolume = null;
      this.elementTarif = null;
      this.elementImage = null;
      document.getElementById('image-meuble').value = "";
      document.getElementById("image-element").style.marginBottom = "10px";
      document.getElementById("image-meuble").style.top = "0";
      this.isElementSelected = false;
      this.selectedElement = {}
    },

    processFile(event) {
      this.elementImage = event.target.files[0];
      console.log(this.elementImage);
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
    openDashboard () {
      this.$router.push('/dashboard');
    }
  },
  computed: {
    filteredList() {
      return this.meubles.filter(element => {
        return element.name.toLowerCase().includes(this.searchElement.toLowerCase())
      });
    }
  },
}
</script>

<style lang="scss" scoped>

#inventaire {

  .upper-bar {
    overflow: hidden;
    background-color: #E85029;
    position: fixed;
    top: 0;
    width: 100%;
    height: 8%;
  }

  .upper-bar  a {
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

    #list-meubles {
      border-top: 2px solid gray;
      width: 100%;
      max-width: 100%;
      height: 440px;
      overflow-y: scroll;
      margin: auto;
    }

    #input-search-bar {
      margin: 5px;
      padding: 10px;
      width: 90%;
      max-width: 90%;
      float: left;
      font-size: 12px;
    }

    #element-meuble {
      margin: 5px;
      padding: 10px;
      float: left;
      text-align: justify;
      width: 90%;
      max-width: 90%;
      background: #7222B1;
      color: white;
      &:hover {cursor: pointer; background-color: #320853}
    }

    #form-ajout-meuble {
      border: 2px solid gray;
      border-radius: 10px;
      width: 80%;
      max-width: 80%;
      height: 500px;
      overflow: hidden;
      padding: 20px;
      margin: auto;

    }

    input[type=text] {
      padding: 5px 5px;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      width: 70%;
      float: right;
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

    .unit {
      position: absolute; display: block; right: 8px; top: 4px; z-index: 9; color: grey;
    }

    #image-link {
      position: absolute;
      left: 100px;
      top: 5px;
      width: 100px;
      height: 100px;
      cursor: pointer;
      border: 1px solid gray;
      padding: 5px;
    }


    input[type=file]  {
      cursor: pointer;
      display: inline-block;
      margin: 6px;
      float: left;
      width: 68%;
      max-width: 68%;
      position: absolute;
      left: 95px;
      top: 0;
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

    #delete-button {
      padding: 3px;
      font-size: 15px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: #fff;
      background-color: #ff0000ff;
      border: none;
      border-radius: 5px;
      box-shadow: 0 5px #999;
      width: 120px;
      height: 40px;
      margin: auto;

      &:hover {background-color: #980000ff}

      &:active {
        background-color: #980000ff;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }
    }

    .disableButton {
      opacity: 0.3;
      pointer-events: none;
    }

    #reset-button {
      cursor: pointer;
      float: right;
      &:hover {background-color: #580919; color: #fff; border-radius: 5px;}
    }

  }


}

</style>
