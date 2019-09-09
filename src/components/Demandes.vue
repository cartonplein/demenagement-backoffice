<template>
    <div id="demandes">
      <NavigationBar />
      <div class="main">

            <fieldset class="left-pane">
              <legend>Liste de demandes de clients (cliquer pour afficher une demande)</legend>
              <input id="input-search-bar" type="text" v-model="searchClient" placeholder="Rechercher un client">
              <fieldset class="list-orders">
                <legend>Non-confirmée(s)</legend>
                <Draggable
                  v-model="orders1"
                  :group="{ name: 'unconfirm', pull: 'clone', put: true }"
                  @change="updateOrders1"
                >
                  <div :class="{'element-order': true, 'element-transport': order.typeDemenagement == 'Transport simple', 'element-dem': order.typeDemenagement == 'Déménagement sur inventaire'}" v-for="order in filteredList1" :key="order.orderNumber" @click="selectAndDisplayOrder(order)">
                    <b>{{ order.contact.prenom }} {{ order.contact.nom }}</b> (#{{ order.orderNumber }})
                  </div>
                </Draggable>
              </fieldset>
              <fieldset class="list-orders">
                <legend>Confirmée(s)</legend>
                <Draggable
                  v-model="orders2"
                  :group="{ name: 'confirm', pull: 'clone', put: true  }"
                  @change="updateOrders2"
                >
                  <div :class="{'element-order': true, 'element-transport': order.typeDemenagement == 'Transport simple', 'element-dem': order.typeDemenagement == 'Déménagement sur inventaire'}" v-for="order in filteredList2" :key="order.orderNumber" @click="selectAndDisplayOrder(order)">
                    <b>{{ order.contact.prenom }} {{ order.contact.nom }}</b> (#{{ order.orderNumber }})
                  </div>
                </Draggable>
              </fieldset>
              <fieldset class="list-orders">
                <legend>Effectuée(s)</legend>
                <Draggable
                  v-model="orders3"
                  :group="{ name: 'confirm', pull: 'clone', put: true  }"
                  @change="updateOrders3"
                >
                  <div :class="{'element-order': true, 'element-transport': order.typeDemenagement == 'Transport simple', 'element-dem': order.typeDemenagement == 'Déménagement sur inventaire'}" v-for="order in filteredList3" ::key="order.orderNumber" @click="selectAndDisplayOrder(order)" v-if="order.statut == 2">
                    <b>{{ order.contact.prenom }} {{ order.contact.nom }}</b> (#{{ order.orderNumber }})
                  </div>
                </Draggable>

              </fieldset>
            </fieldset>

          <fieldset class="right-pane" v-show="selectedOrder.length !== 0">
            <legend>Récapitulatif de demande ({{ selectedClient.prenom }} {{ selectedClient.nom }} le {{ dateSelectedOrder }})</legend>
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

              <div style="margin-bottom: 3px; height: 10%;" v-show="selectedOrder.typeDemenagement == 'Transport simple'">
                <label for="heure-rdv">Heure de RDV :</label>
                <select id="heure-rdv" ref="heureRdv">
                  <option v-for="heure in heuresRdv" :value="heure.val">{{ heure.val }}</option>
                </select>
              </div>

              <div style="margin-bottom: 3px; height: 10%;" v-show="selectedOrder.typeDemenagement == 'Déménagement sur inventaire'">
                <label for="creneau-dem">Créneau horaire :</label>
                <select id="creneau-dem" ref="creneauDemenagement" :disabled="vrTotal > 4">
                  <option v-for="creneau in creneauxDem" :value="creneau.nom">{{ creneau.nom }}</option>
                </select>
              </div>

              <div style="margin-bottom: 3px; height: 10%;">
                <label for="nb-demenageurs">Nombre de déménageurs :</label>
                <input type="number" v-model.number="numberMovers"></input>
              </div>

              <div style="margin-bottom: 3px; height: 10%;">
                <label for="vr-total">VR :</label>
                <input type="number" v-model.number="vrTotal" disabled></input>
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
                    <th>Qté. à évacuer</th>
                  </tr>
                  <tr v-for="element in inventaire">
                    <td>{{ element.name }}</td>
                    <td>{{ element.quantity }}</td>
                    <td>{{ element.quantityDemonter }}</td>
                    <td>{{ element.quantityEvacuer }}</td>
                  </tr>
                </table>
              </div>

              <div style=" margin-bottom: 3px;" v-show="options.length !== 0">
                <label for="options">Cartons :</label>
                <table style="width:100%" id="table-options">
                  <tr>
                    <th>Pack</th>
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
            <div style="z-index: 999; border-top: 2px solid gray; margin-bottom: 5px; height: 10%; background: white;">
              <button class="save-button" @click="saveOrder()">Enregistrer</button>
              <button class="delete-button" @click="deleteOrder(selectedOrder)">Supprimer</button>
              <button id="download-pdf-button" class="delete-button" @click="downloadOrderPdf()">Télécharger</button>
            </div>
          </fieldset>

      </div>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import Datepicker from 'vuejs-datepicker';
import Draggable from 'vuedraggable';

import { store } from '../store.js';
import { db, rootRef } from '../db/firebaseConfig.js';
import { fr } from 'vuejs-datepicker/dist/locale';

import jsPDF from 'jsPDF';
import logoCp from "../assets/carton_plein_logo.png";

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

      orders1: [],
      orders2: [],
      orders3: [],

      selectedOrder: [],

      direction: '',
      distance: '',

      inputPickupAddress: '',
      pickupCp: '',
      pickupCoor: null,
      inputDestinationAddress: '',
      destinationCp: '',
      destinationCoor: null,

      inventaire: [],

      currentDateDemenagement: '',
      dateDemenagement: '',
      heureRdv: '',
      creneauDemenagement: '',

      options: [],
      comments: '',

      searchClient: '',
      selectedClient: '',
      dateSelectedOrder: '',

      numberMovers: 0,
      vrTotal: 0,
      tarif: 0,

      logoCp: logoCp,
    };
  },
  components: {
    NavigationBar,
    VueGoogleAutocomplete,
    Datepicker,
    Draggable
  },
  firebase: {
    //orders: rootRef.child('orders'),
    heuresRdv: rootRef.child('agenda/heureRdv'),
    creneauxDem: rootRef.child('agenda/creneauDemenagement')
  },
  mounted() {
    let demandes = this;
    rootRef.child('agenda').child('datesFermees').on('child_added', function(snapshot) {
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
    rootRef.child('agenda').child('datesFermees').on('child_changed', function(snapshot) {
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

    this.getOrders();
  },
  methods: {

    updateOrders1(evt) {
      if(evt.added !== undefined) {
        let key = evt.added.element.contact.prenom+'-'+evt.added.element.contact.nom+'-'+evt.added.element.orderNumber;
        rootRef.child('orders').child(key).update({
          statut: 0
        });
      }
      this.getOrders() ;
    },

    updateOrders2(evt) {
      if(evt.added !== undefined) {
        let key = evt.added.element.contact.prenom+'-'+evt.added.element.contact.nom+'-'+evt.added.element.orderNumber;
        rootRef.child('orders').child(key).update({
          statut: 1
        });
      }
      this.getOrders() ;
    },

    updateOrders3(evt) {
      if(evt.added !== undefined) {
        let key = evt.added.element.contact.prenom+'-'+evt.added.element.contact.nom+'-'+evt.added.element.orderNumber;
        rootRef.child('orders').child(key).update({
          statut: 2
        });
      }
      this.getOrders() ;
    },

    getOrders() {
      let demandes = this;
      demandes.orders1 = []; demandes.orders2 = []; demandes.orders3 = [];
      rootRef.child('orders').on('child_added', function(snapshot) {
        if(snapshot.val().statut == 0) {
          demandes.orders1.push(snapshot.val());
        }
        if(snapshot.val().statut == 1) {
          demandes.orders2.push(snapshot.val());
        }
        if(snapshot.val().statut == 2) {
          demandes.orders3.push(snapshot.val());
        }
      });
    },

    selectAndDisplayOrder(order) {
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

      this.inventaire = order.inventaire;

      this.currentDateDemenagement = order.dateDemenagement;
      this.dateDemenagement = new Date(order.dateDemenagement[2], order.dateDemenagement[1], order.dateDemenagement[0]);
      if(order.typeDemenagement == 'Déménagement sur inventaire') {
        this.$refs.creneauDemenagement.value = order.creneauDemenagement;
      }
      if(order.typeDemenagement == 'Transport simple') {
        this.$refs.heureRdv.value = order.heureRdv;
      }

      this.$refs.commentsUser.value = order.comments;
      if(order.options !== undefined) {
        this.options = order.options;
      }
      else {
        this.options = [];
      }
      this.numberMovers = order.numberMovers;
      this.vrTotal = order.vrTotal;
      this.tarif = order.tarif;

      this.selectedOrder = order;
    },

    getPickupAddressData (addressData, placeResultData, id) {
      this.pickupCoor = placeResultData.geometry.location.lat()+","+placeResultData.geometry.location.lng();
      this.inputPickupAddress = placeResultData.formatted_address;
      this.pickupCp = addressData.postal_code;
      store.calculateDistance(this.pickupCoor, this.destinationCoor).then( (distance) => {
        this.distance = distance;
      });
      this.direction = store.getDirection(this.pickupCoor, this.destinationCoor);
    },

    getDestinationAddressData (addressData, placeResultData, id) {
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
      rootRef.child('orders').child(key).update({
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
        }
        else {
          alert("Une demande a été modifiée : "+key+'');
        }
      });

      // vérifier si la date est modifiée
      if(this.currentDateDemenagement[0] !== this.dateDemenagement.getDate() || this.currentDateDemenagement[1] !== this.dateDemenagement.getMonth() || this.currentDateDemenagement[2] !== this.dateDemenagement.getFullYear()) {
        rootRef.child('agenda/datesReservees').child(this.currentDateDemenagement[1]+'/'+this.currentDateDemenagement[0]+'/'+this.currentDateDemenagement[2]+'/'+key).remove();
        rootRef.child('agenda/datesReservees').child(this.dateDemenagement.getMonth()+'/'+this.dateDemenagement.getDate()+'/'+this.dateDemenagement.getFullYear()).update({
          [key]: key
        },
        function(error) {
          if (error) {
            alert(error.message);
            console.log(error.message);
          }
        });
      }
    },

    deleteOrder(order) {
      store.deleteOrder(order);
      this.selectedOrder = [];
    },

    downloadOrderPdf() {
      let key = this.selectedClient.prenom+'-'+this.selectedClient.nom+'-'+this.selectedOrder.orderNumber;
      let pdfName = 'CP_DEM_'+key;
      if(this.selectedOrder.typeDemenagement == 'Transport simple') {
        pdfName = 'CP_TRA_'+key;
      }
      var doc = new jsPDF();

      var img = new Image();
      img.src = this.logoCp;
      //console.log(img);
      doc.addImage(img, 'PNG', 8, 10, 70, 15);

      doc.setLineWidth(0.5);
      doc.line(200, 25, 10, 25);

      doc.setFontSize(20);
      doc.setFontType('bold');
      doc.text(10, 40, 'Récapitulatif du déménagement (#'+this.selectedOrder.orderNumber+')');

      doc.setFontSize(11);
      doc.text('Adresse de départ :', 12, 55);
      doc.text('Adresse de destination :', 12, 70);
      doc.text('Distance :', 12, 85);
      doc.text('Type de prestation :', 12, 95);
      doc.text('Date de déménagement :', 12, 105);
      doc.text('Inventaire :', 12, 115);

      doc.setFontType('normal');
      doc.text(this.selectedOrder.pickupAddress.adresse, 70, 55);
      doc.text('Étage : '+this.selectedOrder.pickupAddress.etage+', Ascenseur : '+this.selectedOrder.pickupAddress.ascenseur+', Cave : '+this.selectedOrder.pickupAddress.cave, 70, 60);
      doc.text(this.selectedOrder.destinationAddress.adresse, 70, 70);
      doc.text('Étage : '+this.selectedOrder.destinationAddress.etage+', Ascenseur : '+this.selectedOrder.destinationAddress.ascenseur+', Cave : '+this.selectedOrder.destinationAddress.cave, 70, 75);
      doc.text(this.selectedOrder.distance.text, 70, 85);
      doc.text(this.selectedOrder.typeDemenagement, 70, 95);
      if(this.selectedOrder.typeDemenagement == 'Transport simple') {
        doc.text(this.selectedOrder.dateDemenagement[0]+'/'+(this.selectedOrder.dateDemenagement[1]+1)+'/'+this.selectedOrder.dateDemenagement[2]+' (RDV à '+this.selectedOrder.heureRdv+'h)', 70, 105);
      }
      if(this.selectedOrder.typeDemenagement == 'Déménagement sur inventaire') {
        doc.text(this.selectedOrder.dateDemenagement[0]+'/'+(this.selectedOrder.dateDemenagement[1]+1)+'/'+this.selectedOrder.dateDemenagement[2]+' ('+this.selectedOrder.creneauDemenagement+')', 70, 105);
      }

      let p=0;
      for(var i=0; i<this.selectedOrder.inventaire.length; i++) {
        if(this.selectedOrder.inventaire[i].quantity > 0) {
          p = 115+(5*i);
          doc.text(this.selectedOrder.inventaire[i].name+' x'+this.selectedOrder.inventaire[i].quantity, 70, p);
          doc.text('(Démontage/remontage: x'+this.selectedOrder.inventaire[i].quantityDemonter+', Évacuation: x'+this.selectedOrder.inventaire[i].quantityEvacuer+')', 120, p);
        }
      }

      if(this.options.length !== 0) {
        doc.setFontType('bold');
        doc.text('Cartons :', 12, p+10);
        doc.setFontType('normal');
        for(var i=0; i<this.options.length; i++) {
          doc.text(this.options[i].name+' x'+this.options[i].quantity, 70, (p+10)+(5*i));
        }
      }

      doc.setFontSize(15);
      doc.setFontType('bold');
      doc.text(10, p+15, 'Contact :');

      doc.setFontSize(11);
      doc.text('Prénom/Nom :', 12, p+25);
      doc.text('Numéro de téléphone :', 12, p+30);
      doc.text('Email', 12, p+35);

      doc.setFontType('normal');
      doc.text(this.selectedOrder.contact.prenom+' '+this.selectedOrder.contact.nom, 70, p+25);
      doc.text(this.selectedOrder.contact.telephone, 70, p+30);
      doc.text(this.selectedOrder.contact.email, 70, p+35);

      doc.line(200, 270, 10, 270);
      doc.setFontSize(15);
      doc.setFontType('bold');
      doc.text('Tarif : '+this.selectedOrder.tarif+'€', 10, 277);
      doc.line(200, 280, 10, 280);

      doc.save(pdfName + '.pdf');
    }

  },
  computed: {
    filteredList1() {
      return this.orders1.filter(order => {
        return order.contact.nom.toLowerCase().includes(this.searchClient.toLowerCase()) ||
              order.contact.prenom.toLowerCase().includes(this.searchClient.toLowerCase())
      });
    },
    filteredList2() {
      return this.orders2.filter(order => {
        return order.contact.nom.toLowerCase().includes(this.searchClient.toLowerCase()) ||
              order.contact.prenom.toLowerCase().includes(this.searchClient.toLowerCase())
      });
    },
    filteredList3() {
      return this.orders3.filter(order => {
        return order.contact.nom.toLowerCase().includes(this.searchClient.toLowerCase()) ||
              order.contact.prenom.toLowerCase().includes(this.searchClient.toLowerCase())
      });
    }
  },
}
</script>

<style lang="scss" scoped>

#demandes {

  .main {
    width: 100%;
    //border: 3px solid red;
    height: 100vh;

    .left-pane {
      width: 60%; border: 2px solid gray; border-radius: 10px; height: 90%; margin-left: 10px; float: left;
    }

    .right-pane {
      width: 35%; border: 2px solid gray; border-radius: 10px; padding: 5px; height: 90%; margin-right: 10px; float: right;
    }

    legend {
      font-weight: bold;
    }

    .list-orders {
      border: 2px solid gray;
      width: 32%;
      height: 88%;
      overflow-y: scroll;
      margin: 5px 5px 5px 0;
      padding: 5px;
      float: left;
    }

    #input-search-bar {
      margin: 5px auto;
      padding: 10px;
      width: 100%;
      font-size: 12px;
    }

    .element-order {
      margin: 10px auto;
      padding: 10px;
      text-align: left;
      width: 100%;
      color: white;
      font-size: 13px;
    }

    .element-transport {
      background: #7222B1;
      &:hover {cursor: pointer; background-color: #320853}
    }

    .element-dem {
      background: #2C78DE;
      &:hover {cursor: pointer; background-color: #0E4185}
    }

    #display-demande {
      //border: 2px solid gray;
      border-radius: 10px;
      width: 100%;
      height: 85%;
      padding: 20px;
      margin: auto;
      overflow-y: scroll;
      //position: relative;
    }

    input[type=text] {
      padding: 5px 5px;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      width: 45%;
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
      width: 45%;
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
      width: 45%;
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

    .save-button {
      padding: 3px;
      font-size: 12px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: #fff;
      background-color:  #4CAF50;
      border: none;
      border-radius: 5px;
      width: 100px;
      height: 40px;
      margin: 10px 10px;
      &:active {
        transform: translateY(4px);
      }
    }

    .delete-button {
      padding: 3px;
      font-size: 12px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: #fff;
      background-color: #ff0000ff;
      border: none;
      border-radius: 5px;
      width: 100px;
      height: 40px;
      margin: 10px 10px;
      &:active {
        transform: translateY(4px);
      }
    }

    #download-pdf-button {
      color: black;
      border: 1px solid lightgray;
      background-color: #FFF;
      width: 160px;
      background-image: url('../assets/logo-pdf.png');
      background-size: 16% 70%;
      background-position: 5% 50%;
      background-repeat: no-repeat;
      padding-left: 20px;
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
