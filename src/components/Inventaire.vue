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
                <div id="element-meuble" v-for="meuble in filteredList" :key="meuble.number" @click="selectAndDisplayElement(meuble)">{{ meuble.name }}</div>
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
              <!--<div style="margin-bottom: 5px; height: 10%; position: relative">
                <label for="tarif-meuble">Tarif :</label>
                <input id="tarif-meuble" type="number" v-model.number="elementTarif"></input>
                <span class="unit">€</span>
              </div>-->
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label for="vr-meuble">Équivalent vélo-remorque :</label>
                <input id="vr-meuble" type="number" v-model.number="elementVr"></input>
                <span class="unit">VR</span>
              </div>
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label for="demont-meuble">Démontage possible?</label>
                <input ref="demontOui" name="demont-meuble" type="radio"><span class="labelTick">Oui</span></input>
                <input ref="demontNon" name="demont-meuble" type="radio" checked><span class="labelTick">Non</span></input>
              </div>
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label for="piece-meuble">Pièce :</label>
                <input ref="pieceSalon" name="piece-meuble" type="checkbox"><span class="labelTick">Salon</span></input>
                <input ref="pieceBureau" name="piece-meuble" type="checkbox"><span class="labelTick">Bureau</span></input>
                <input ref="pieceChambre" name="piece-meuble" type="checkbox"><span class="labelTick">Chambre</span><br></input>
                <input ref="pieceCuisine" name="piece-meuble" type="checkbox"><span class="labelTick">Cuisine</span></input>
                <input ref="pieceCellier" name="piece-meuble" type="checkbox"><span class="labelTick">Cellier</span></input>
                <input ref="pieceDivers" name="piece-meuble" type="checkbox"><span class="labelTick">Divers</span></input>
              </div>
              <button id="reset-button" @click="resetFormInventaire">Réinitialiser</button>
              <div class="row">
                <div class="cell" style="width: 50%">
                  <button id="save-button" @click="saveElementInventaire(selectedElement, elementName, elementVolume, elementImage, elementVr)">Enregistrer</button>
                </div>
                <div class="cell" style="width: 50%">
                  <button id="delete-button" @click="deleteElementInventaire(selectedElement)" v-bind:class="{ 'disableButton': !isElementSelected }">Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="cell" style="width: 60%">
            <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Réglage des paramètres de calcul du tarif (Transport simple)</div>
            <div style="width: 100%; border: 2px solid gray; border-radius: 10px; height: 600px">
              <table id="buttonsTab">
                <tr>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(0)" v-bind:class="{ 'tabActive': tabs[0] }">Accessibilité (étage)</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(1)" v-bind:class="{ 'tabActive': tabs[1] }">Approche</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(2)" v-bind:class="{ 'tabActive': tabs[2] }">Manutention</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(3)" v-bind:class="{ 'tabActive': tabs[3] }">Trajet</td>
                </tr>
              </table>
              <div class="form-parametres-calcul" v-if="tabs[0]">
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Dernier étage sans frais :</label>
                  <input type="number" style="width: 60%" v-model.number="etageMaxGratuit"></input>
                </div>
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Tarif par étage :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifEtage"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(1)">Enregistrer</button>
              </div>
              <div class="form-parametres-calcul" v-if="tabs[1]">
                <table style="width: 100%">
                  <td class="reglageCpTab">
                    <b>Approche niveau 1</b>
                    <div style="margin-top: 10px; height: 60%; position: relative;">
                      <label>Codes postaux :</label>
                      <div v-for="cp in cps" style="width: 50%; font-size: 12px; float: left">
                        <input type="checkbox" :value="cp" v-model="cps1"> {{ cp }}
                      </div>
                    </div>
                    <div style="margin-top: 10px; height: 20%; position: relative;">
                      <label>Durée d'approche :</label>
                      <input type="number" style="width: 100%" v-model.number="dureeApproche1"></input>
                      <span class="unit" style="top: 32px;">heure</span>
                    </div>
                  </td>
                  <td class="reglageCpTab">
                    <b>Approche niveau 2</b>
                    <div style="margin-top: 10px; height: 60%; position: relative;">
                      <label>Codes postaux :</label>
                      <div v-for="cp in cps" style="width: 50%; font-size: 12px; float: left">
                        <input type="checkbox" :value="cp" v-model="cps2"> {{ cp }}
                      </div>
                    </div>
                    <div style="margin-top: 10px; height: 20%; position: relative;">
                      <label>Durée d'approche :</label>
                      <input type="number" style="width: 100%" v-model.number="dureeApproche2"></input>
                      <span class="unit" style="top: 32px;">heure</span>
                    </div>
                  </td>
                  <td class="reglageCpTab">
                    <b>Approche niveau 3</b>
                    <div style="margin-top: 10px; height: 60%; position: relative;">
                      <label>Codes postaux :</label>
                      <div v-for="cp in cps" style="width: 50%; font-size: 12px; float: left">
                        <input type="checkbox" :value="cp" v-model="cps3"> {{ cp }}
                      </div>
                    </div>
                    <div style="margin-top: 10px; height: 20%; position: relative">
                      <label>Durée d'approche :</label>
                      <input type="number" style="width: 100%" v-model.number="dureeApproche3"></input>
                      <span class="unit" style="top: 32px;">heure</span>
                    </div>
                  </td>
                </table>
                <div style="margin-top: 20px; height: 10%; position: relative">
                  <label>Tarif approche :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifApproche"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(2)">Enregistrer</button>
              </div>
              <div class="form-parametres-calcul" v-if="tabs[2]">
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Durée de manutention :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManut"></input>
                </div>
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Tarif :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifManut"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(3)">Enregistrer</button>
              </div>
              <div class="form-parametres-calcul" v-if="tabs[3]">
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Vitesse 1 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="vitesse1"></input>
                  <span class="unit">km/h</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Vitesse 2 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="vitesse2"></input>
                  <span class="unit">km/h</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Vitesse 3 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="vitesse3"></input>
                  <span class="unit">km/h</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Vitesse 4 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="vitesse4"></input>
                  <span class="unit">km/h</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Tarif trajet :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifTrajet"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(4)">Enregistrer</button>
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
      elementVr: 0,
      elementVolume: 0,
      //elementTarif: 0,
      elementImage: '',
      selectedElement: {},

      tabs: [true, false, false, false],

      etageMaxGratuit: 0,
      tarifEtage: 0,

      cps: ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010',
            '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020' ],
      cps1: [],
      cps2: [],
      cps3: [],
      tarifApproche: 0,
      dureeApproche1: 0,
      dureeApproche2: 0,
      dureeApproche3: 0,

      dureeManut: 0,
      tarifManut: 0,

      vitesse1: 0,
      vitesse2: 0,
      vitesse3: 0,
      vitesse4: 0,
      tarifTrajet: 0
    };
  },
  firebase: {
    meubles: fb.inventaireRef.child('meubles'),
  },
  mounted() {
    this.getAccessibilityFloorData();
    this.getApproachData();
    this.getManutentionData();
    this.getTrajetData();
  },
  methods: {
    openTab(tab) {
      this.tabs = [false, false, false, false];
      this.tabs[tab] = true;
    },

    getAccessibilityFloorData() {
      let inventaire = this;
      fb.inventaireRef.child('calculs').child('accessibiliteEtage').on('child_added', function(snapshot) {
        if(snapshot.key == 'etageMaxGratuit') {
          inventaire.etageMaxGratuit = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifEtage = snapshot.val();
        }
      });
      fb.inventaireRef.child('calculs').child('accessibiliteEtage').on('child_changed', function(snapshot) {
        if(snapshot.key == 'etageMaxGratuit') {
          inventaire.etageMaxGratuit = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifEtage = snapshot.val();
        }
      });
    },

    getApproachData() {
      let inventaire = this;
      fb.inventaireRef.child('calculs').child('approche').on('child_added', function(snapshot) {
        if(snapshot.key == 1) {
          inventaire.dureeApproche1 = snapshot.val().heure;
          inventaire.cps1 = snapshot.val().codesPostaux;
        }
        if(snapshot.key == 2) {
          inventaire.dureeApproche2 = snapshot.val().heure;
          inventaire.cps2 = snapshot.val().codesPostaux;
        }
        if(snapshot.key == 3) {
          inventaire.dureeApproche3 = snapshot.val().heure;
          inventaire.cps3 = snapshot.val().codesPostaux;
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifApproche = snapshot.val();
        }
      });
      fb.inventaireRef.child('calculs').child('approche').on('child_changed', function(snapshot) {
        if(snapshot.key == 1) {
          inventaire.dureeApproche1 = snapshot.val().heure;
          inventaire.cps1 = snapshot.val().codesPostaux;
        }
        if(snapshot.key == 2) {
          inventaire.dureeApproche2 = snapshot.val().heure;
          inventaire.cps2 = snapshot.val().codesPostaux;
        }
        if(snapshot.key == 3) {
          inventaire.dureeApproche3 = snapshot.val().heure;
          inventaire.cps3 = snapshot.val().codesPostaux;
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifApproche = snapshot.val();
        }
      });
    },

    getManutentionData() {
      let inventaire = this;
      fb.inventaireRef.child('calculs').child('manutention').on('child_added', function(snapshot) {
        if(snapshot.key == 'heure') {
          inventaire.dureeManut = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifManut = snapshot.val();
        }
      });
      fb.inventaireRef.child('calculs').child('manutention').on('child_changed', function(snapshot) {
        if(snapshot.key == 'heure') {
          inventaire.dureeManut = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifManut = snapshot.val();
        }
      });
    },

    getTrajetData() {
      let inventaire = this;
      fb.inventaireRef.child('calculs').child('trajet').on('child_added', function(snapshot) {
        if(snapshot.key == 1) {
          inventaire.vitesse1 = snapshot.val().vitesse;
        }
        if(snapshot.key == 2) {
          inventaire.vitesse2 = snapshot.val().vitesse;
        }
        if(snapshot.key == 3) {
          inventaire.vitesse3 = snapshot.val().vitesse;
        }
        if(snapshot.key == 4) {
          inventaire.vitesse4 = snapshot.val().vitesse;
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifTrajet = snapshot.val();
        }
      });
      fb.inventaireRef.child('calculs').child('trajet').on('child_changed', function(snapshot) {
        if(snapshot.key == 1) {
          inventaire.vitesse1 = snapshot.val().vitesse;
        }
        if(snapshot.key == 2) {
          inventaire.vitesse2 = snapshot.val().vitesse;
        }
        if(snapshot.key == 3) {
          inventaire.vitesse3 = snapshot.val().vitesse;
        }
        if(snapshot.key == 4) {
          inventaire.vitesse4 = snapshot.val().vitesse;
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifTrajet = snapshot.val();
        }
      });
    },


    selectAndDisplayElement(element) {

        this.elementName = element.name;
        this.elementVolume = element.volume;
        //this.elementTarif = element.tarif;
        this.elementVr = element.vr;
        this.$refs.demontOui.checked = element.canDisassemble;
        this.$refs.demontNon.checked = !element.canDisassemble;
        this.$refs.pieceSalon.checked = element.isSalon;
        this.$refs.pieceBureau.checked = element.isBureau;
        this.$refs.pieceChambre.checked = element.isChambre;
        this.$refs.pieceCuisine.checked = element.isCuisine;
        this.$refs.pieceCellier.checked = element.isCellier;
        this.$refs.pieceDivers.checked = element.isDivers;

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

    saveElementInventaire(element, elementName, elementVolume, elementImage, elementVr) {
      let pieces = [this.$refs.pieceSalon.checked, this.$refs.pieceBureau.checked, this.$refs.pieceChambre.checked, this.$refs.pieceCuisine.checked, this.$refs.pieceCellier.checked, this.$refs.pieceDivers.checked];
      store.saveElementInventaire(element, elementName, elementVolume, elementImage, elementVr, this.$refs.demontOui.checked, pieces);
      this.resetFormInventaire();
    },

    saveSettingsTransportSimple(settingNumber) {
      if(settingNumber == 1) {
        store.saveAccessibilityFloorData(this.etageMaxGratuit, this.tarifEtage);
      }
      if(settingNumber == 2) {
        store.saveApproachData(this.cps1, this.cps2, this.cps3, this.dureeApproche1, this.dureeApproche2, this.dureeApproche3, this.tarifApproche);
      }
      if(settingNumber == 3) {
        store.saveHandlingData(this.dureeManut, this.tarifManut);
      }
      if(settingNumber == 4) {
        store.saveTripData(this.vitesse1, this.vitesse2, this.vitesse3, this.vitesse4, this.tarifTrajet);
      }
    },

    deleteElementInventaire(element) {
      store.deleteElementInventaire(element);
      this.resetFormInventaire();
    },

    resetFormInventaire() {
      this.elementName = '';
      this.elementVolume = 0;
      this.elementVr = 0;
      //this.elementTarif = 0;
      this.elementImage = '';
      this.$refs.demontNon.checked = true;
      this.$refs.pieceSalon.checked = false;
      this.$refs.pieceBureau.checked = false;
      this.$refs.pieceChambre.checked = false;
      this.$refs.pieceCuisine.checked = false;
      this.$refs.pieceCellier.checked = false;
      this.$refs.pieceDivers.checked = false;
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
    },
    filteredListTarifs() {
      return this.tarifs.filter(tarif => {
        return tarif.name.toLowerCase().includes(this.searchTarif.toLowerCase())
      });
    }
  }
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
    z-index: 999;
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
      font-size: 14px;
      float: left;
      text-align: center;
      width: 120px;
      height: 120px;
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

    #buttonsTab {
      width: 100%;
      border-bottom: 2px solid gray;
    }

    .buttonTab {
      width: 25%;
      background: #FFF;
      font-size: 15px;
      border: 2px solid gray;
      padding: 5px;
      cursor: pointer;
    }

    .tabActive {
      color: white;
      font-weight: bold;
      background: gray;
    }

    .form-parametres-calcul {
      width: 100%;
      max-width: 100%;
      height: 90%;
      overflow: hidden;
      padding: 20px;
    }

    .reglageCpTab {
      width: 30%;
      border: 2px solid gray;
      padding: 10px;
      height: 380px;
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

    input[type=radio] {
      margin-top: 8px;
    }

    #vr-meuble {
      width: 30%;
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

    .labelTick {
      font-size: 13px;
      margin-right: 8px;
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
