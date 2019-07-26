<template>
    <div id="demandes">
      <NavigationBar />
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
          <div class="cell" style="width: 50%;" v-show="selectedOrder !== ''">
              <div class="row" style="width: 100%;">
                <div style="width: 200%; font-weight: bold; margin-bottom: 10px;">Récapitulatif de demande ({{ selectedClient.prenom }} {{ selectedClient.nom }} le {{ dateSelectedOrder }})</div>
                <div id="display-demande">
                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="contact-nom">Nom :</label>
                    <input id="contact-nom" type="text" v-model="selectedClient.nom"></input>
                  </div>
                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="contact-prenom">Prénom :</label>
                    <input id="contact-prenom" type="text" v-model="selectedClient.prenom"></input>
                  </div>
                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="contact-email">Email :</label>
                    <input id="contact-email" type="text" v-model="selectedClient.email"></input>
                  </div>
                  <div style="margin-bottom: 20px; height: 10%; border-bottom: 2px solid gray">
                    <label for="contact-telephone">N° de télephone :</label>
                    <input id="contact-telephone" type="text" v-model="selectedClient.telephone"></input>
                  </div>

                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="pickup-adresse">Adresse de départ :</label>
                    <vue-google-autocomplete
                      ref="pickupAddress"
                      id="pickup-adresse"
                      classname="form-control"
                      v-on:placechanged="getPickupAddressData"
                      country="fr"
                      placeholder="Rechercher une adresse"

                    >
                    </vue-google-autocomplete>
                  </div>
                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="pickup-etage">Étage de départ :</label>
                    <select id="input-address-etage" ref="pickupEtage">
                      <option value="" disabled selected>Selectionner une étage</option>
                      <option value="RDC">RDC</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value=">8">&gt;8</option>
                    </select>
                  </div>
                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="pickup-ascenseur">Ascenseur de départ :</label>
                    <select id="input-address-ascenseur" ref="pickupAscenseur" >
                      <option value="" disabled selected>Oui/Non</option>
                      <option value="Oui - 2 personnes">Oui - 2 personnes</option>
                      <option value="Oui - 3 personnes">Oui - 3 personnes</option>
                      <option value="Oui - 4 personnes">Oui - 4 personnes</option>
                      <option value="Non">Non</option>
                    </select>
                  </div>
                  <div style="margin-bottom: 20px; height: 10%;">
                    <label for="pickup-cave">Cave de départ :</label>
                    <select id="input-address-cave" ref="pickupCave">
                      <option value="" disabled selected>Oui/Non</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
                  </div>

                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="destination-adresse">Adresse d'arrivée :</label>
                    <vue-google-autocomplete
                      ref="destinationAddress"
                      id="destination-adresse"
                      classname="form-control"
                      v-on:placechanged="getDestinationAddressData"
                      country="fr"
                      placeholder="Rechercher une adresse"

                    >
                    </vue-google-autocomplete>
                  </div>
                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="destination-etage">Étage d'arrivée :</label>
                    <select id="input-address-etage" ref="destinationEtage">
                        <option value="" disabled selected>Selectionner une étage</option>
                        <option value="RDC">RDC</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value=">8">&gt;8</option>
                    </select>
                  </div>
                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="destination-ascenseur">Ascenseur d'arrivée :</label>
                    <select id="input-address-ascenseur" ref="destinationAscenseur" >
                      <option value="" disabled selected>Oui/Non</option>
                      <option value="Oui - 2 personnes">Oui - 2 personnes</option>
                      <option value="Oui - 3 personnes">Oui - 3 personnes</option>
                      <option value="Oui - 4 personnes">Oui - 4 personnes</option>
                      <option value="Non">Non</option>
                    </select>
                  </div>
                  <div style="margin-bottom: 20px; height: 10%; ">
                    <label for="destination-cave">Cave d'arrivée :</label>
                    <select id="input-address-cave" ref="destinationCave">
                      <option value="" disabled selected>Oui/Non</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
                  </div>

                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="distance">Distance :</label>
                    <input type="text" v-model="distance.text" disabled></input>
                  </div>

                  <div style="margin-bottom: 20px; height: 80%; border-bottom: 2px solid gray">
                    <label for="itineraire">Itinéraires :</label>
                    <iframe height="300px" width="100%" id="iframe-map" :src=direction allowFullscreen></iframe>
                  </div>

                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="date-demenagement">Date de déménagement :</label>
                    <Datepicker monday-first full-month-name :language="fr" :disabled-dates="disabledDates" :highlighted="highlighted" class="datepicker" v-model="dateDemenagement"></Datepicker>
                  </div>

                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="heure-rdv">Heure de RDV :</label>
                    <select id="heure-rdv" ref="heureRdv">
                      <option value="" disabled selected>Heure RDV</option>
                      <option value="10h">10h</option>
                      <option value="11h">11h</option>
                      <option value="12h">12h</option>
                      <option value="13h">13h</option>
                      <option value="14h">14h</option>
                      <option value="15h">15h</option>
                      <option value="16h">16h</option>
                      <option value="17h">17h</option>
                    </select>
                  </div>

                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="nb-demenageurs">Nombre de déménageurs :</label>
                    <input type="number" v-model.number="numberMovers"></input>
                  </div>

                  <div style="margin-bottom: 3px; height: 10%;">
                    <label for="vr-total">VR :</label>
                    <input type="number" v-model.number="vrTotal"></input>
                  </div>

                  <div style=" margin-bottom: 3px; height: 25%;">
                    <label for="comments-user">Commentaires :</label>
                    <textarea class="txtarea" value="" placeholder="Modifier les commentaires..." ref="commentsUser"></textarea>
                  </div>

                  <div style=" margin-bottom: 3px;">
                    <label for="inventaire">Inventaire :</label>
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
                  </div>

                  <div style=" margin-bottom: 3px;" v-show="options !== null">
                    <label for="options">Options :</label>
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
                  </div>

                  <div style="margin-top: 20px; height: 10%; position: relative">
                    <label for="tarif">Tarif :</label>
                    <input type="number" v-model.number="tarif" disabled></input>
                    <span class="unit">€</span>
                  </div>

                </div>
              </div>

              <div class="row" style="width: 100%">
                <div class="cell" style="width: 50%">
                  <button id="save-button" @click="saveOrder()">Enregistrer</button>
                </div>
                <div class="cell" style="width: 50%">
                  <button id="delete-button" @click="deleteOrder(selectedOrder)">Supprimer</button>
                </div>
              </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import Datepicker from 'vuejs-datepicker';

import { store } from '../store.js';
import { db } from '../db/firebaseConfig.js';
import { fr } from 'vuejs-datepicker/dist/locale';

export default {
  name: 'Demandes',
  data () {
    return {
      fr: fr,
      disabledDates: {
        to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        dates: []
      },
      highlighted: {
        dates: [],
        includeDisabled: true
      },

      selectedOrder: '',

      direction: '',
      distance: '',

      inputPickupAddress: '',
      pickupCp: '',
      pickupCoor: null,
      inputDestinationAddress: '',
      destinationCp: '',
      destinationCoor: null,

      tailleLogement: '',
      dureePrestation: '',

      inventaire: [],

      dateDemenagement: '',
      heureRdv: '',

      options: [],
      comments: '',

      searchClient: '',
      selectedClient: '',
      dateSelectedOrder: '',

      numberMovers: 0,
      vrTotal: 0,
      tarif: 0,
    };
  },
  components: {
    NavigationBar,
    VueGoogleAutocomplete,
    Datepicker
  },
  firebase: {
    orders: db.ref('orders')
  },
  mounted() {
    let demandes = this;
    db.ref('agenda').child('datesReservees').on('child_added', function(snapshot) {
      let month = parseInt(snapshot.key, 10);
      snapshot.forEach(function(snapshot) {
        let day = parseInt(snapshot.key, 10);
        snapshot.forEach(function(snapshot) {
          let year = parseInt(snapshot.key, 10);
          demandes.disabledDates.dates.push(new Date(year, month, day));
          demandes.highlighted.dates.push(new Date(year, month, day));
        });
      });
    });
    db.ref('agenda').child('datesReservees').on('child_changed', function(snapshot) {
      let month = parseInt(snapshot.key, 10);
      snapshot.forEach(function(snapshot) {
        let day = parseInt(snapshot.key, 10);
        snapshot.forEach(function(snapshot) {
          let year = parseInt(snapshot.key, 10);
          demandes.disabledDates.dates.push(new Date(year, month, day));
          demandes.highlighted.dates.push(new Date(year, month, day));
        });
      });
    });
    db.ref('agenda').child('datesFermees').on('child_added', function(snapshot) {
      let month = parseInt(snapshot.key, 10);
      snapshot.forEach(function(snapshot) {
        let day = parseInt(snapshot.key, 10);
        snapshot.forEach(function(snapshot) {
          let year = parseInt(snapshot.key, 10);
          demandes.disabledDates.dates.push(new Date(year, month, day));
          demandes.highlighted.dates.push(new Date(year, month, day));
        });
      });
    });
    db.ref('agenda').child('datesFermees').on('child_changed', function(snapshot) {
      let month = parseInt(snapshot.key, 10);
      snapshot.forEach(function(snapshot) {
        let day = parseInt(snapshot.key, 10);
        snapshot.forEach(function(snapshot) {
          let year = parseInt(snapshot.key, 10);
          demandes.disabledDates.dates.push(new Date(year, month, day));
          demandes.highlighted.dates.push(new Date(year, month, day));
        });
      });
    });
  },
  methods: {
    selectAndDisplayOrder(order) {
      console.log(order);
      this.selectedClient = order.contact;
      this.dateSelectedOrder = order.orderDateTime;

      this.$refs.pickupAddress.update(order.pickupAddress.adresse);
      this.inputPickupAddress = order.pickupAddress.adresse;
      this.pickupCp = order.pickupAddress.cp;
      this.pickupCoor = order.pickupAddress.coor;
      this.$refs.pickupEtage.value = order.pickupAddress.etage;
      this.$refs.pickupAscenseur.value = order.pickupAddress.ascenseur;
      this.$refs.pickupCave.value = order.pickupAddress.cave;

      this.$refs.destinationAddress.update(order.destinationAddress.adresse);
      this.inputDestinationAddress = order.destinationAddress.adresse;
      this.destinationCp = order.destinationAddress.cp;
      this.destinationCoor = order.destinationAddress.coor;
      this.$refs.destinationEtage.value = order.destinationAddress.etage;
      this.$refs.destinationAscenseur.value = order.destinationAddress.ascenseur;
      this.$refs.destinationCave.value = order.destinationAddress.cave;

      this.direction = order.direction;
      this.distance = order.distance;

      if(order.typeDemenagement == 'Déménagement sur inventaire' || order.typeDemenagement == 'Transport simple') {
        this.inventaire = order.inventaire;
        this.tailleLogement = null;
        this.dureePrestation = null;
      }
      this.dateDemenagement = new Date(order.dateDemenagement[2], order.dateDemenagement[1], order.dateDemenagement[0]);
      this.$refs.heureRdv.value = order.heureRdv;
      this.$refs.commentsUser.value = order.comments;
      if(order.options !== undefined) {
        this.options = order.options;
      }
      else {
        this.options = null;
      }
      this.numberMovers = order.numberMovers;
      this.vrTotal = order.vrTotal;
      this.tarif = order.tarif;

      this.selectedOrder = order;
    },

    getPickupAddressData (addressData, placeResultData, id) {
      //this.$parent.$options.methods.updateOrigin(addressData, placeResultData, id);
      this.pickupCoor = placeResultData.geometry.location.lat()+","+placeResultData.geometry.location.lng();
      console.log(this.pickupCoor, this.destinationCoor);
      this.inputPickupAddress = placeResultData.formatted_address;
      this.pickupCp = addressData.postal_code;
      store.calculateDistance(this.pickupCoor, this.destinationCoor).then( (distance) => {
        this.distance = distance;
      });
      this.direction = store.getDirection(this.pickupCoor, this.destinationCoor);
    },

    getDestinationAddressData (addressData, placeResultData, id) {
      //this.$parent.$options.methods.updateOrigin(addressData, placeResultData, id);
      this.destinationCoor = placeResultData.geometry.location.lat()+","+placeResultData.geometry.location.lng();
      this.inputDestinationAddress = placeResultData.formatted_address;
      this.destinationCp = addressData.postal_code;
      store.calculateDistance(this.pickupCoor, this.destinationCoor).then( (distance) => {
        this.distance = distance;
      });
      this.direction = store.getDirection(this.pickupCoor, this.destinationCoor);
    },

    saveOrder() {
      let key = this.selectedClient.prenom+'-'+this.selectedClient.nom+'-'+this.selectedOrder.orderNumber;
        db.ref('orders').child(key).update({
          orderNumber: this.selectedOrder.orderNumber,
          contact: this.selectedClient,
          pickupAddress: {
            adresse: this.inputPickupAddress,
            cp: this.pickupCp,
            etage: this.$refs.pickupEtage.value,
            ascenseur: this.$refs.pickupAscenseur.value,
            cave: this.$refs.pickupCave.value,
            coor: this.pickupCoor
          },
          destinationAddress: {
            adresse: this.inputDestinationAddress,
            cp: this.destinationCp,
            etage: this.$refs.destinationEtage.value,
            ascenseur: this.$refs.destinationAscenseur.value,
            cave: this.$refs.destinationCave.value,
            coor: this.destinationCoor
          },
          distance: this.distance,
          direction: this.direction,
          dateDemenagement: [this.dateDemenagement.getDate(), this.dateDemenagement.getMonth(), this.dateDemenagement.getFullYear()],
          heureRdv: this.$refs.heureRdv.value,
          numberMovers: this.numberMovers,
          vrTotal: this.vrTotal,
          comments: this.$refs.commentsUser.value

        },
        function(error) {
          if (error) {
            alert(error.message);
            console.log(error.message);
          } else {
            console.log("Une demande a été modifiée : "+key+'');
          }
        });

      //this.selectedOrder = '';
    },

    deleteOrder(order) {
      store.deleteOrder(order);
      this.selectedOrder = '';
    },

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

    .cell {
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
      width: 200%;
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
      width: 50%;
      float: right;
    }

    .datepicker {
      width: 50%;
      float: right;
      padding: 5px 5px;
    }

    input[type=number] {
      padding: 5px 5px;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      width: 50%;
      float: right;
      padding-right: 30px;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    textarea {
      width: 100%;
      height: 65%;
    }

    select{
      float: right;
      width: 50%;
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
