<template>
    <div id="demandes">
      <div class="upper-bar">
        <a @click="openPageGestionAgenda()">Gestion agenda</a>
        <a @click="openPageGestionInventaire()">Gestion inventaire</a>
        <a @click="openPageGestionDemandes()">Gestion demandes</a>
        <a @click="openDashboard()">Revenir à l'accueil</a>
      </div>
      <div class="main">
        <div class="row">
          <div class="cell" style="width: 50%; max-width: 50%">
            <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Liste de demandes de clients (cliquer pour afficher une demande)</div>
            <div style="width: 100%; border: 2px solid gray; border-radius: 10px; height: 500px">
              <input id="input-search-bar" type="text" v-model="searchClient" placeholder="Rechercher un client">
              <div id="list-orders">
                <div id="element-order" v-for="order in filteredList" :key="order.contact.telephone" @click="selectAndDisplayOrder(order)"><b>{{ order.contact.prenom }} {{ order.contact.nom }}</b> &lt;{{ order.contact.email }}&gt; (#{{ order.orderNumber }})</div>
              </div>
            </div>
          </div>
          <div class="cell" style="width: 50%"">
            <div v-show="selectedClient !== ''">
              <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Récapitulatif de demande ({{ selectedClient.prenom }} {{ selectedClient.nom }} le {{ dateSelectedOrder }})</div>
              <div id="display-demande">
                <ul style="color: #E85029; font-size: 15px; text-align: justify">
                  <li>
                    <b>Informations de contact :</b>
                    <ul>
                      <li>Nom : {{ selectedClient.nom }}</li>
                      <li>Prénom : {{ selectedClient.prenom }}</li>
                      <li>Adresse mail : {{ selectedClient.email }}</li>
                      <li>N° de téléphone : {{ selectedClient.telephone }}</li>
                    </ul>
                  </li>
                  </br>
                  <li>
                  <li>
                    <b>Adresse de départ :</b>
                    <ul>
                      <li>{{ pickupAddress.adresse }}</li>
                      <li>Surface : {{ pickupAddress.surface }}</li>
                      <li>Étage : {{ pickupAddress.etage }}</li>
                      <li>Ascenseur : {{ pickupAddress.ascenseur }}</li>
                      <li>Cave : {{ pickupAddress.cave }}</li>
                    </ul>
                  </li>
                  </br>
                  <li>
                    <b>Adresse de destination :</b>
                    <ul>
                      <li>{{ destinationAddress.adresse }}</li>
                      <li>Surface : {{ destinationAddress.surface }}</li>
                      <li>Étage : {{ destinationAddress.etage }}</li>
                      <li>Ascenseur : {{ destinationAddress.ascenseur }}</li>
                      <li>Cave : {{ destinationAddress.cave }}</li>
                    </ul>
                  </li>
                  </br>
                  <li><b>Distance : </b>{{ distance.text }}</li></br>
                  <li><b>Itinéraires : </b></li>
                  <iframe height="300px" width="100%" id="iframe-map" :src=direction allowFullscreen></iframe>
                  <li></br><b>Type de déménagement :</b> {{ typeDemenagement }}</li></br>
                  <li v-show="this.typeDemenagement == 'Aide au déménagement'"><b>Taille de logement :</b> {{ tailleLogement }}</br></br></li>
                  <li v-show="this.typeDemenagement == 'Aide au déménagement'"><b>Durée de prestation :</b> {{ dureePrestation }}</br></li>
                  <li v-show="(this.typeDemenagement == 'Déménagement sur inventaire') || (this.typeDemenagement == 'Transport simple')"><b>Inventaire :</b><br/>
                    <table style="width:100%" id="table-inventaire">
                      <tr>
                        <th>Meuble</th>
                        <th>Qté.</th>
                        <th>Qté. à démonter</th>
                      </tr>
                      <tr v-for="element in inventaire">
                        <td>{{ element.name }}</td>
                        <td>{{ element.quantity }}</td>
                        <td>{{ element.quantityDemonter }}</td>
                      </tr>
                    </table>
                  </li></br>
                  <li><b>Date de déménagement :</b> {{ dateDemenagement }}</li></br>
                  <li v-show="this.options.length !== 0"><b>Options :</b><br/>
                    <table style="width:100%" id="table-options">
                      <tr>
                        <th>Option</th>
                        <th>Qté.</th>
                      </tr>
                      <tr v-for="option in options">
                        <td>{{ option.name }}</td>
                        <td>{{ option.quantity }}</td>
                      </tr>
                    </table>
                    </br>
                  </li>
                  <li><b>Nombre de déménageurs : </b>{{ numberMovers }}</li></br>
                  <li><b>VR : </b>{{ vrTotal }} VR</li></br>
                  <li><b>TARIF : </b>{{ tarif }}€</li></br>
                </ul>
                <!--
                <div style="margin-bottom: 5px; height: 10%;">
                  <label for="nom-meuble">Nom :</label>
                  <input id="nom-meuble" type="text" v-model="elementName"></input>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label for="volume-meuble">Volume :</label>
                  <input id="volume-meuble" type="number" v-model.number="elementVolume"></input>
                  <span class="unit">m³</span>
                </div>
                <div style="margin-bottom: 10px; height: 10%; position: relative;">
                  <label for="image-meuble">Image :</label>
                  <input id="image-meuble" type="file" @change="processFile($event)">
                  <a id="image-link" v-show="isElementSelected && selectedElement.image !== ''" onclick="window.open(this.href);return false;">Voir l'image</a>
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
                -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { store } from '../store.js';
import { db } from '../db/firebaseConfig.js';

export default {
  name: 'Demandes',
  data () {
    return {
      pickupAddress: '',
      destinationAddress: '',
      direction: '',
      distance: '',
      typeDemenagement: '',

      tailleLogement: '',
      dureePrestation: '',

      inventaire: [],

      dateDemenagement: '',
      options: [],

      searchClient: '',
      selectedClient: '',
      dateSelectedOrder: '',

      numberMovers: 0,
      vrTotal: 0,
      tarif: 0,

      /*
      isOrderSelected: false,
      elementName: '',
      elementVolume: '',
      elementTarif: '',
      elementImage: null,
      selectedElement: {},
      isAdded: false,
      isModified: false,
      isDeleted: false*/
    };
  },
  firebase: {
    orders: db.ref('orders')
  },
  methods: {
    selectAndDisplayOrder(order) {
      console.log(order);
      this.selectedClient = order.contact;
      this.dateSelectedOrder = order.orderDateTime;
      this.pickupAddress = order.pickupAddress;
      this.destinationAddress = order.destinationAddress;
      this.direction = order.direction;
      this.distance = order.distance;
      this.typeDemenagement = order.typeDemenagement;
      if(this.typeDemenagement == 'Aide au déménagement') {
        this.tailleLogement = order.tailleLogement;
        this.dureePrestation = order.dureePrestation;
        this.inventaire = null;
      }
      if(this.typeDemenagement == 'Déménagement sur inventaire' || this.typeDemenagement == 'Transport simple') {
        this.inventaire = order.inventaire;
        this.tailleLogement = null;
        this.dureePrestation = null;
      }
      this.dateDemenagement = order.dateDemenagement[0]+'/'+(order.dateDemenagement[1]+1)+'/'+order.dateDemenagement[2];
      if(order.options !== undefined) {
        this.options = order.options;
      }
      console.log(this.options);
      this.numberMovers = order.numberMovers;
      this.vrTotal = order.vrTotal;
      this.tarif = order.tarif;
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
    /*
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
      this.isElementSelected = false;
      this.selectedElement = {}
    },
    */
  },
  computed: {
    filteredList() {
      return this.orders.filter(order => {
        return order.contact.nom.toLowerCase().includes(this.searchClient.toLowerCase()) ||
              order.contact.prenom.toLowerCase().includes(this.searchClient.toLowerCase())
      });
    }
  },
}
</script>

<style lang="scss" scoped>

#demandes {

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

    #list-orders {
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

    #element-order {
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

    #display-demande {
      border: 2px solid gray;
      border-radius: 10px;
      width: 80%;
      max-width: 80%;
      height: 500px;
      overflow: hidden;
      padding: 20px;
      margin: auto;
      overflow-y: scroll;
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

    input[type=file]  {
      cursor: pointer;
      display: inline-block;
      margin: 6px;
      float: right;
      width: 68%;
      max-width: 68%;
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

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
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

    #table-inventaire, #table-options {
      border: 1px solid #E85029;
      th, td {
        border: 1px solid #E85029;
        padding: 5px;
      }
    }

  }
}
</style>
