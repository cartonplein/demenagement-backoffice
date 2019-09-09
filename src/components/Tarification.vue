<template>
    <div id="tarification">
      <NavigationBar />
      <div class="main">
        <div class="row">
          <div class="cell" style="width: 60%">
            <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Réglage des paramètres de tarification</div>
            <div style="width: 100%; border-collapse:collapse; border: 2px solid gray; height: 600px">
              <table id="buttonsTab">
                <tr>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(0)" v-bind:class="{ 'tabActive': tabs[0] }">Accessibilité (étage)</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(1)" v-bind:class="{ 'tabActive': tabs[1] }">Approche aller/retour</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(2)" v-bind:class="{ 'tabActive': tabs[2] }">Manutention départ</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(3)" v-bind:class="{ 'tabActive': tabs[3] }">Transport</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(4)" v-bind:class="{ 'tabActive': tabs[4] }">Manutention arrivée</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(5)" v-bind:class="{ 'tabActive': tabs[5] }">Approche retour</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(6)" v-bind:class="{ 'tabActive': tabs[6] }">Emballage cartons</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(7)" v-bind:class="{ 'tabActive': tabs[7] }">Démontage/remontage</td>
                  <td class="buttonTab has-text-centered" v-on:click="openTab(8)" v-bind:class="{ 'tabActive': tabs[8] }">Évacuation meubles</td>
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
                <button id="save-button" @click="saveSettingsTransportSimple(0)">Enregistrer</button>
              </div>

              <div class="form-parametres-tarification" v-if="tabs[1]">
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
                <button id="save-button" @click="saveSettingsTransportSimple(1)">Enregistrer</button>
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
                <button id="save-button" @click="saveSettingsTransportSimple(2)">Enregistrer</button>
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
                <button id="save-button" @click="saveSettingsTransportSimple(3)">Enregistrer</button>
              </div>

              <div class="form-parametres-tarification" v-if="tabs[4]">
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de manutention pour 1 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManutArr1"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de manutention pour 2 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManutArr2"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de manutention pour 3 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManutArr3"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de manutention pour 4 VR :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeManutArr4"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Taux manutention :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifManutArr"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(4)">Enregistrer</button>
              </div>

              <div class="form-parametres-tarification" v-if="tabs[5]">
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Vitesse approche :</label>
                  <input type="number" style="width: 60%" v-model.number="vitesseApprocheRetour"></input>
                  <span class="unit">km/h</span>
                </div>
                <div style="margin-bottom: 5px; height: 20%; position: relative">
                  <label>Taux d'approche :</label>
                  <input type="number" style="width: 60%" v-model.number="tarifApprocheRetour"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(5)">Enregistrer</button>
              </div>

              <div class="form-parametres-tarification" v-if="tabs[6]">
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée forfait demi-journée (Volume &lt; 4VR) :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeEmballage1"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée forfait une journée (4VR &lt; Volume &lt; 8VR) :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeEmballage2"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Nombre de personnes :</label>
                  <input type="number" style="width: 60%" v-model.number="nombreRhEmballage"></input>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Taux emballage cartons :</label>
                  <input type="number" style="width: 60%" v-model.number="tauxEmballage"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(6)">Enregistrer</button>
              </div>

              <div class="form-parametres-tarification" v-if="tabs[7]">
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Durée de démontage/remontage par meuble :</label>
                  <input type="number" style="width: 60%" v-model.number="dureeDemontage"></input>
                  <span class="unit">heure</span>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Nombre de personnes :</label>
                  <input type="number" style="width: 60%" v-model.number="nombreRhDemontage"></input>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Taux démontage/remontage par meuble :</label>
                  <input type="number" style="width: 60%" v-model.number="tauxDemontage"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(7)">Enregistrer</button>
              </div>

              <div class="form-parametres-tarification" v-if="tabs[8]">
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Vitesse de transport :</label>
                  <input type="number" style="width: 60%" v-model.number="vitesseEvacuation"></input>
                </div>
                <div style="margin-bottom: 5px; height: 10%; position: relative">
                  <label>Taux évacuation par meuble :</label>
                  <input type="number" style="width: 60%" v-model.number="tauxEvacuation"></input>
                  <span class="unit">€</span>
                </div>
                <button id="save-button" @click="saveSettingsTransportSimple(8)">Enregistrer</button>
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
import { db, rootRef } from '../db/firebaseConfig.js';

export default {
  name: 'Tarification',
  data () {
    return {
      tabs: [true, false, false, false, false, false, false, false, false],

      etageMaxGratuit: 0,
      tarifEtage: 0,

      vitesseApproche: 0,
      tarifApproche: 0,

      vitesseApprocheRetour: 0,
      tarifApprocheRetour: 0,

      dureeManut1: 0,
      dureeManut2: 0,
      dureeManut3: 0,
      dureeManut4: 0,
      tarifManut: 0,

      dureeManutArr1: 0,
      dureeManutArr2: 0,
      dureeManutArr3: 0,
      dureeManutArr4: 0,
      tarifManutArr: 0,

      vitesseTransport: 0,
      tarifTransport: 0,

      dureeEmballage1: 0,
      dureeEmballage2: 0,
      nombreRhEmballage: 0,
      tauxEmballage: 0,

      dureeDemontage: 0,
      nombreRhDemontage: 0,
      tauxDemontage: 0,

      vitesseEvacuation: 0,
      tauxEvacuation: 0
    };
  },
  components: {
    NavigationBar
  },
  mounted() {
    this.getAccessibilityFloorData();
    this.getApproachData();
    this.getApproachEndData();
    this.getManutentionData();
    this.getManutentionArrData();
    this.getTransportData();
    this.getOptionsDemData();
  },
  methods: {
    openTab(tab) {
      this.tabs = [false, false, false, false, false, false, false, false, false];
      this.tabs[tab] = true;
    },

    getAccessibilityFloorData() {
      let app = this;
      rootRef.child('tarification').child('accessibiliteEtage').on('child_added', function(snapshot) {
        if(snapshot.key == 'etageMaxGratuit') {
          app.etageMaxGratuit = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifEtage = snapshot.val();
        }
      });
      rootRef.child('tarification').child('accessibiliteEtage').on('child_changed', function(snapshot) {
        if(snapshot.key == 'etageMaxGratuit') {
          app.etageMaxGratuit = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifEtage = snapshot.val();
        }
      });
    },

    getApproachData() {
      let app = this;
      rootRef.child('tarification').child('approche').on('child_added', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          app.vitesseApproche = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifApproche = snapshot.val();
        }
      });
      rootRef.child('tarification').child('approche').on('child_changed', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          app.vitesseApproche = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifApproche = snapshot.val();
        }
      });
    },

    getApproachEndData() {
      let app = this;
      rootRef.child('tarification').child('approcheRetour').on('child_added', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          app.vitesseApprocheRetour = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifApprocheRetour = snapshot.val();
        }
      });
      rootRef.child('tarification').child('approche').on('child_changed', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          app.vitesseApprocheRetour = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifApprocheRetour = snapshot.val();
        }
      });
    },

    getManutentionData() {
      let app = this;
      rootRef.child('tarification').child('manutention').on('child_added', function(snapshot) {
        if(snapshot.key == 1) {
          app.dureeManut1 = snapshot.val();
        }
        if(snapshot.key == 2) {
          app.dureeManut2 = snapshot.val();
        }
        if(snapshot.key == 3) {
          app.dureeManut3 = snapshot.val();
        }
        if(snapshot.key == 4) {
          app.dureeManut4 = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifManut = snapshot.val();
        }
      });
      rootRef.child('tarification').child('manutention').on('child_changed', function(snapshot) {
        if(snapshot.key == 1) {
          app.dureeManut1 = snapshot.val();
        }
        if(snapshot.key == 2) {
          app.dureeManut2 = snapshot.val();
        }
        if(snapshot.key == 3) {
          app.dureeManut3 = snapshot.val();
        }
        if(snapshot.key == 4) {
          app.dureeManut4 = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifManut = snapshot.val();
        }
      });
    },

    getManutentionArrData() {
      let app = this;
      rootRef.child('tarification').child('manutentionArr').on('child_added', function(snapshot) {
        if(snapshot.key == 1) {
          app.dureeManutArr1 = snapshot.val();
        }
        if(snapshot.key == 2) {
          app.dureeManutArr2 = snapshot.val();
        }
        if(snapshot.key == 3) {
          app.dureeManutArr3 = snapshot.val();
        }
        if(snapshot.key == 4) {
          app.dureeManutArr4 = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifManutArr = snapshot.val();
        }
      });
      rootRef.child('tarification').child('manutentionArr').on('child_changed', function(snapshot) {
        if(snapshot.key == 1) {
          app.dureeManutArr1 = snapshot.val();
        }
        if(snapshot.key == 2) {
          app.dureeManutArr2 = snapshot.val();
        }
        if(snapshot.key == 3) {
          app.dureeManutArr3 = snapshot.val();
        }
        if(snapshot.key == 4) {
          app.dureeManutArr4 = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifManutArr = snapshot.val();
        }
      });
    },

    getTransportData() {
      let app = this;
      rootRef.child('tarification').child('transport').on('child_added', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          app.vitesseTransport = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifTransport = snapshot.val();
        }
      });
      rootRef.child('tarification').child('transport').on('child_changed', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          app.vitesseTransport = snapshot.val();
        }
        if(snapshot.key == 'tarif') {
          app.tarifTransport = snapshot.val();
        }
      });
    },

    getOptionsDemData() {
      let app = this;
      rootRef.child('tarification').child('optionsDemenagement/emballageCartons').on('child_added', function(snapshot) {
        if(snapshot.key == 'duree') {
          app.dureeEmballage1 = snapshot.val().demiJournee;
          app.dureeEmballage2 = snapshot.val().uneJournee;
        }
        if(snapshot.key == 'nombreRh') {
          app.nombreRhEmballage = snapshot.val();
        }
        if(snapshot.key == 'taux') {
          app.tauxEmballage = snapshot.val();
        }
      });
      rootRef.child('tarification').child('optionsDemenagement/emballageCartons').on('child_changed', function(snapshot) {
        if(snapshot.key == 'duree') {
          app.dureeEmballage1 = snapshot.val().demiJournee;
          app.dureeEmballage2 = snapshot.val().uneJournee;
        }
        if(snapshot.key == 'nombreRh') {
          app.nombreRhEmballage = snapshot.val();
        }
        if(snapshot.key == 'taux') {
          app.tauxEmballage = snapshot.val();
        }
      });

      rootRef.child('tarification').child('optionsDemenagement/demontage').on('child_added', function(snapshot) {
        if(snapshot.key == 'duree') {
          app.dureeDemontage= snapshot.val();
        }
        if(snapshot.key == 'nombreRh') {
          app.nombreRhDemontage = snapshot.val();
        }
        if(snapshot.key == 'taux') {
          app.tauxDemontage = snapshot.val();
        }
      });
      rootRef.child('tarification').child('optionsDemenagement/demontage').on('child_changed', function(snapshot) {
        if(snapshot.key == 'duree') {
          app.dureeDemontage= snapshot.val();
        }
        if(snapshot.key == 'nombreRh') {
          app.nombreRhDemontage = snapshot.val();
        }
        if(snapshot.key == 'taux') {
          app.tauxDemontage = snapshot.val();
        }
      });

      rootRef.child('tarification').child('optionsDemenagement/evacuation').on('child_added', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          app.vitesseEvacuation = snapshot.val();
        }
        if(snapshot.key == 'taux') {
          app.tauxEvacuation = snapshot.val();
        }
      });
      rootRef.child('tarification').child('optionsDemenagement/evacuation').on('child_changed', function(snapshot) {
        if(snapshot.key == 'vitesse') {
          app.vitesseEvacuation = snapshot.val();
        }
        if(snapshot.key == 'taux') {
          app.tauxEvacuation = snapshot.val();
        }
      });
    },

    saveSettingsTransportSimple(settingNumber) {
      if(settingNumber == 0) {
        store.saveAccessibilityFloorData(this.etageMaxGratuit, this.tarifEtage);
      }
      if(settingNumber == 1) {
        store.saveApproachData(this.vitesseApproche, this.tarifApproche);
      }
      if(settingNumber == 2) {
        store.saveHandlingData(this.dureeManut1, this.dureeManut2, this.dureeManut3, this.dureeManut4, this.tarifManut);
      }
      if(settingNumber == 3) {
        store.saveTransportData(this.vitesseTransport, this.tarifTransport);
      }
      if(settingNumber == 4) {
        store.saveHandlingEndData(this.dureeManutArr1, this.dureeManutArr2, this.dureeManutArr3, this.dureeManutArr4, this.tarifManutArr);
      }
      if(settingNumber == 5) {
        store.saveApproachEndData(this.vitesseApprocheRetour, this.tarifApprocheRetour);
      }
      if(settingNumber == 6) {
        store.saveEmballageData(this.dureeEmballage1, this.dureeEmballage2, this.nombreRhEmballage, this.tauxEmballage);
      }
      if(settingNumber == 7) {
        store.saveDemontageData(this.dureeDemontage, this.nombreRhDemontage, this.tauxDemontage);
      }
      if(settingNumber == 8) {
        store.saveEvacuationData(this.vitesseEvacuation, this.tauxEvacuation);
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
      width: 11%;
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
