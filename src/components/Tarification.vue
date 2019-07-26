<template>
    <div id="tarification">
      <NavigationBar />
      <div class="main">
        <div class="row">
          <div class="cell" style="width: 60%">
            <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Réglage des paramètres de calcul du tarif (Transport simple)</div>
            <div style="width: 100%; border-collapse:collapse; border: 2px solid gray; height: 600px">
              <table id="buttonsTab">
                <tr>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(0)" v-bind:class="{ 'tabActive': tabs[0] }">Accessibilité (étage)</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(1)" v-bind:class="{ 'tabActive': tabs[1] }">Approche (aller/retour)</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(2)" v-bind:class="{ 'tabActive': tabs[2] }">Manutention</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(3)" v-bind:class="{ 'tabActive': tabs[3] }">Transport</td>
                </tr>
              </table>
              <div class="form-parametres-tarification" v-if="tabs[0]">
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Dernier étage sans frais :</label>
                  <input type="number" style="width: 60%" v-model.number="etageMaxGratuit"></input>
                </div>
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Taux par étage :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifEtage"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(1)">Enregistrer</button>
              </div>
              <div class="form-parametres-tarification" v-if="tabs[1]">
                <!--<table style="width: 100%">
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
                </table>-->
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Vitesse approche :</label>
                  <input type="number" style="width: 60%" v-model.number="vitesseApproche"></input>
                  <span class="unit">km/h</span>
                </div>
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Taux d'approche :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifApproche"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(2)">Enregistrer</button>
              </div>
              <div class="form-parametres-tarification" v-if="tabs[2]">
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de manutention pour 1 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManut1"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de manutention pour 2 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManut2"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de manutention pour 3 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManut3"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de manutention pour 4 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManut4"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Taux manutention :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifManut"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(3)">Enregistrer</button>
              </div>
              <div class="form-parametres-tarification" v-if="tabs[3]">
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Vitesse transport :</label>
                  <input type="number" style="width: 60%" v-model.number="vitesseTransport"></input>
                  <span class="unit">km/h</span>
                </div>
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Taux transport :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifTransport"></input>
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
import NavigationBar from './NavigationBar.vue';

import { store } from '../store.js';
import { db } from '../db/firebaseConfig.js';

export default {
  name: 'Tarification',
  data () {
    return {
      tabs: [true, false, false, false],

      etageMaxGratuit: 0,
      tarifEtage: 0,

      /*cps: ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010',
            '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020' ],
      cps1: [],
      cps2: [],
      cps3: [],*/
      vitesseApproche: 0,
      tarifApproche: 0,
      //dureeApproche1: 0,
      //dureeApproche2: 0,
      //dureeApproche3: 0,

      dureeManut1: 0,
      dureeManut2: 0,
      dureeManut3: 0,
      dureeManut4: 0,
      tarifManut: 0,

      vitesseTransport: 0,
      tarifTransport: 0
    };
  },
  components: {
    NavigationBar
  },
  mounted() {
    this.getAccessibilityFloorData();
    this.getApproachData();
    this.getManutentionData();
    this.getTransportData();
  },
  methods: {
    openTab(tab) {
      this.tabs = [false, false, false, false];
      this.tabs[tab] = true;
    },

    getAccessibilityFloorData() {
      let inventaire = this;
      db.ref('tarification').child('accessibiliteEtage').on('child_added', function(snapshot) {
        if(snapshot.key == 'etageMaxGratuit') {
          inventaire.etageMaxGratuit = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifEtage = snapshot.val();
        }
      });
      db.ref('tarification').child('accessibiliteEtage').on('child_changed', function(snapshot) {
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
      db.ref('tarification').child('approche').on('child_added', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          inventaire.vitesseApproche = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifApproche = snapshot.val();
        }
      });
      db.ref('tarification').child('approche').on('child_changed', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          inventaire.vitesseApproche = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifApproche = snapshot.val();
        }
      });
    },

    getManutentionData() {
      let inventaire = this;
      db.ref('tarification').child('manutention').on('child_added', function(snapshot) {
        if(snapshot.key == 1) {
          inventaire.dureeManut1 = snapshot.val();
        }
        if(snapshot.key == 2) {
          inventaire.dureeManut2 = snapshot.val();
        }
        if(snapshot.key == 3) {
          inventaire.dureeManut3 = snapshot.val();
        }
        if(snapshot.key == 4) {
          inventaire.dureeManut4 = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifManut = snapshot.val();
        }
      });
      db.ref('tarification').child('manutention').on('child_changed', function(snapshot) {
        if(snapshot.key == 1) {
          inventaire.dureeManut1 = snapshot.val();
        }
        if(snapshot.key == 2) {
          inventaire.dureeManut2 = snapshot.val();
        }
        if(snapshot.key == 3) {
          inventaire.dureeManut3 = snapshot.val();
        }
        if(snapshot.key == 4) {
          inventaire.dureeManut4 = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifManut = snapshot.val();
        }
      });
    },

    getTransportData() {
      let inventaire = this;
      db.ref('tarification').child('transport').on('child_added', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          inventaire.vitesseTransport = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifTransport = snapshot.val();
        }
      });
      db.ref('tarification').child('transport').on('child_changed', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          inventaire.vitesseTransport = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          inventaire.tarifTransport = snapshot.val();
        }
      });
    },

    saveSettingsTransportSimple(settingNumber) {
      if(settingNumber == 1) {
        store.saveAccessibilityFloorData(this.etageMaxGratuit, this.tarifEtage);
      }
      if(settingNumber == 2) {
        store.saveApproachData(this.vitesseApproche, this.tarifApproche);
      }
      if(settingNumber == 3) {
        store.saveHandlingData(this.dureeManut1, this.dureeManut2, this.dureeManut3, this.dureeManut4, this.tarifManut);
      }
      if(settingNumber == 4) {
        store.saveTransportData(this.vitesseTransport, this.tarifTransport);
      }
    },

  },
  computed: {
    filteredList() {
      return this.meubles.filter(element => {
        return element.name.toLowerCase().includes(this.searchElement.toLowerCase())
      });
    }
  }
}
</script>

<style lang="scss" scoped>

#tarification {

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

    table, tr, td, th {
      border-collapse: collapse;
    }

    #buttonsTab {
      width: 100%;
      //border-bottom: 2px solid gray;
      border-collapse: collapse;
    }

    .buttonTab {
      width: 25%;
      background: gray;
      color: #FFF;
      font-size: 18px;
      border: 2px solid #FFF;
      border-top: 1px solid transparent;
      padding: 10px;
      cursor: pointer;
    }

    .tabActive {
      color: gray;
      font-weight: bold;
      background: #FFF;
    }

    .form-parametres-tarification {
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
