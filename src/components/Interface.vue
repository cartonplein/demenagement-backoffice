<template>
    <div id="interface">
      <NavigationBar />
      <div class="main">
        <div style="width: 100%; font-weight: bold; margin-bottom: 10px;">Réglage de l'interface graphique du site front-office (affichage des textes aux clients)</div>
        <div style="width: 100%; border-collapse:collapse; border: 2px solid gray; height: 600px">
          <table id="buttonsTab">
            <tr>
              <td class="buttonTab has-text-centered" v-on:click="openTab(0)" v-bind:class="{ 'tabActive': tabs[0] }">Page Type de déménagement</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(1)" v-bind:class="{ 'tabActive': tabs[1] }">Page Adresses</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(2)" v-bind:class="{ 'tabActive': tabs[2] }">Page Inventaire</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(3)" v-bind:class="{ 'tabActive': tabs[3] }">Page Démontage</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(4)" v-bind:class="{ 'tabActive': tabs[4] }">Page Date de déménagement</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(5)" v-bind:class="{ 'tabActive': tabs[5] }">Page Options</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(6)" v-bind:class="{ 'tabActive': tabs[6] }">Page Récapitulatif</td>
            </tr>
          </table>
          <div class="form-reglage-interface" v-if="tabs[0]">
          <!--<iframe src="http://localhost:8080/type_demenagement"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageTypeDem"></input>
              </div>
              <button class="save-button" @click="savePageTitle('typeDem', titrePageTypeDem)">Modifier titre</button>
              <div class="types-dem" v-for="typeDem in typesDemenagement" :key="typeDem.nom">
                <input type="text" v-model.lazy="typeDem.nom" />
                <textarea v-model="typeDem.description" />
                <button class="save-button" @click="savePageTypeDemPanel(typeDem, typeDem.nom, typeDem.description)">Modifier panneau</button>
              </div>
            </div>
          </div>
          <div class="form-reglage-interface" v-if="tabs[1]">
            <!--<iframe src="http://localhost:8080/adresses"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageAdresses"></input>
              </div>
              <button class="save-button" @click="savePageTitle('adresses', titrePageAdresses)">Modifier titre</button>
              <div style="margin-top: 25px; margin-bottom: 5px; height: 55%; position: relative">
                <label>Messages warning :</label>
                <textarea v-model="warningMsgsAdresses"></textarea>
                <span style="float: right; font-size: 10px">*écrit en HTML</span>
              </div>
              <button class="save-button" @click="savePageAdressesMsgsWarning(warningMsgsAdresses)">Enregistrer</button>
            </div>
          </div>
          <div class="form-reglage-interface" v-if="tabs[2]">
            <!--<iframe src="http://localhost:8080/inventaire"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageInventaire"></input>
              </div>
              <button class="save-button" @click="savePageTitle('inventaire', titrePageInventaire)">Modifier titre</button>
              <div style="margin-top: 25px; margin-bottom: 5px; height: 55%; position: relative">
                <label>Messages warning :</label>
                <textarea v-model="warningMsgsInventaire"></textarea>
                <span style="float: right; font-size: 10px">*écrit en HTML</span>
              </div>
              <button class="save-button" @click="savePageInventaireMsgsWarning(warningMsgsInventaire)">Enregistrer</button>
            </div>
          </div>
          <div class="form-reglage-interface" v-if="tabs[3]">
            <!--<iframe src="http://localhost:8080/demontage"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageDemontage"></input>
              </div>
              <button class="save-button" @click="savePageTitle('demontage', titrePageDemontage)">Modifier titre</button>
            </div>
          </div>
          <div class="form-reglage-interface" v-if="tabs[4]">
            <!--<iframe src="http://localhost:8080/date_demenagement"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageDateDem"></input>
              </div>
              <button class="save-button" @click="savePageTitle('dateDem', titrePageDateDem)">Modifier titre</button>
            </div>
          </div>
          <div class="form-reglage-interface" v-if="tabs[5]">
            <!--<iframe src="http://localhost:8080/options"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageOptions"></input>
              </div>
              <button class="save-button" @click="savePageTitle('options', titrePageOptions)">Modifier titre</button>
            </div>
          </div>
          <div class="form-reglage-interface" v-if="tabs[6]">
            <!--<iframe src="http://localhost:8080/recapitulatif"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageRecapitulatif"></input>
              </div>
              <button class="save-button" @click="savePageTitle('recapitulatif', titrePageRecapitulatif)">Modifier titre</button>
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
  name: 'Interface',
  data () {
    return {
      tabs: [true, false, false, false, false, false, false],

      titrePageTypeDem: '',
      titrePageAdresses: '',
      titrePageInventaire: '',
      titrePageDemontage: '',
      titrePageDateDem: '',
      titrePageOptions: '',
      titrePageRecapitulatif: '',

      typesDemenagement: [],
      warningMsgsAdresses: '',
      warningMsgsInventaire: ''
    };
  },
  components: {
    NavigationBar
  },
  mounted() {
    this.getPageTitlesData();
    this.getWarningMsgsData();
  },
  firebase: {
    typesDemenagement: db.ref('typesDemenagement'),
  },
  methods: {
    openTab(tab) {
      this.tabs = [false, false, false, false, false, false, false];
      this.tabs[tab] = true;
    },

    getPageTitlesData() {
      let interf = this;
      db.ref('interfaceGraphique').child('titrePage').on('child_added', function(snapshot) {
        if(snapshot.key == 'typeDem') {
          interf.titrePageTypeDem = snapshot.val();
        }
        if(snapshot.key == 'adresses') {
          interf.titrePageAdresses = snapshot.val();
        }
        if(snapshot.key == 'inventaire') {
          interf.titrePageInventaire = snapshot.val();
        }
        if(snapshot.key == 'demontage') {
          interf.titrePageDemontage = snapshot.val();
        }
        if(snapshot.key == 'dateDem') {
          interf.titrePageDateDem = snapshot.val();
        }
        if(snapshot.key == 'options') {
          interf.titrePageOptions = snapshot.val();
        }
        if(snapshot.key == 'recapitulatif') {
          interf.titrePageRecapitulatif = snapshot.val();
        }
      });
      db.ref('interfaceGraphique').child('titrePage').on('child_changed', function(snapshot) {
        if(snapshot.key == 'typeDem') {
          interf.titrePageTypeDem = snapshot.val();
        }
        if(snapshot.key == 'adresses') {
          interf.titrePageAdresses = snapshot.val();
        }
        if(snapshot.key == 'inventaire') {
          interf.titrePageInventaire = snapshot.val();
        }
        if(snapshot.key == 'demontage') {
          interf.titrePageDemontage = snapshot.val();
        }
        if(snapshot.key == 'dateDem') {
          interf.titrePageDateDem = snapshot.val();
        }
        if(snapshot.key == 'options') {
          interf.titrePageOptions = snapshot.val();
        }
        if(snapshot.key == 'recapitulatif') {
          interf.titrePageRecapitulatif = snapshot.val();
        }
      });
    },

    getWarningMsgsData() {
      let interf = this;
      db.ref('interfaceGraphique').child('msgsWarning').on('child_added', function(snapshot) {
        if(snapshot.key == 'typeDem') {
        }
        if(snapshot.key == 'adresses') {
          interf.warningMsgsAdresses = snapshot.val();
        }
        if(snapshot.key == 'inventaire') {
          interf.warningMsgsInventaire = snapshot.val();
        }
        if(snapshot.key == 'demontage') {
        }
        if(snapshot.key == 'dateDem') {
        }
        if(snapshot.key == 'options') {
        }
        if(snapshot.key == 'recapitulatif') {
        }
      });
      db.ref('interfaceGraphique').child('msgsWarning').on('child_changed', function(snapshot) {
        if(snapshot.key == 'typeDem') {
        }
        if(snapshot.key == 'adresses') {
          interf.warningMsgsAdresses = snapshot.val();
        }
        if(snapshot.key == 'inventaire') {
          interf.warningMsgsInventaire = snapshot.val();
        }
        if(snapshot.key == 'demontage') {
        }
        if(snapshot.key == 'dateDem') {
        }
        if(snapshot.key == 'options') {
        }
        if(snapshot.key == 'recapitulatif') {
        }
      });
    },

    savePageTitle(idPage, titrePage) {
      db.ref('interfaceGraphique').child('titrePage').update({
        [idPage]: titrePage
      });
    },

    savePageTypeDemPanel(typeDem, nom, description) {
      db.ref('typesDemenagement').child(Object.values(typeDem)[3]).update({
        nom: nom,
        description: description
      });
    },

    savePageAdressesMsgsWarning(warningMsgs) {
      db.ref('interfaceGraphique').child('msgsWarning').update({
        adresses: warningMsgs
      });
    },

    savePageInventaireMsgsWarning(warningMsgs) {
      db.ref('interfaceGraphique').child('msgsWarning').update({
        inventaire: warningMsgs
      });
    }

  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>

#interface {

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
      width: 14%;
      background: gray;
      color: #FFF;
      font-size: 15px;
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
      box-shadow: 0 5px #999;
      width: 120px;
      height: 25px;
      margin: auto;

      &:hover {background-color: #3e8e41}

      &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }
    }

    .form-reglage-interface {
      width: 100%;
      height: 90%;
      overflow: hidden;
      padding: 20px;
    }

    iframe {
      width: 60%;
      height: 500px;
      float: left;
      pointer-events: none;
    }

    .form-modif-interface {
      padding: 20px;
      border: 2px solid gray;
      border-radius: 10px;
      width: 35%;
      max-width: 80%;
      height: 500px;
      overflow: hidden;
      float: right;

      input[type=text] {
        padding: 5px 5px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        float: right;
        width: 70%;
      }
    }

    .types-dem {
      margin: 40px auto 10px auto;
      height: 150px;
      padding: 10px;
      background: #E85029;

      input[type=text] {
        margin: auto;
        float: none;
        text-align: center;
      }
      textarea {
        width: 100%;
        height: 50%;
        margin-top: 2px;
        text-align: center;
      }
    }

    textarea {
      width: 100%;
      height: 200px;
    }

  }


}

</style>
