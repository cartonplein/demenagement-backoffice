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
              <td class="buttonTab has-text-centered" v-on:click="openTab(4)" v-bind:class="{ 'tabActive': tabs[4] }">Page Options de déménagement</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(5)" v-bind:class="{ 'tabActive': tabs[5] }">Page Date de déménagement</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(6)" v-bind:class="{ 'tabActive': tabs[6] }">Page Cartons</td>
              <td class="buttonTab has-text-centered" v-on:click="openTab(7)" v-bind:class="{ 'tabActive': tabs[7] }">Page Récapitulatif</td>
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
              <div style="margin-top: 25px; margin-bottom: 5px; height: 55%; position: relative">
                <label>Messages d'erreur (prestation impossible) :</label>
                <textarea v-model="errorPrestaImpossible"></textarea>
                <span style="float: right; font-size: 10px">*écrit en HTML</span>
              </div>
              <button class="save-button" @click="saveErrorMsgs('errorPrestaImpossible', errorPrestaImpossible)">Enregistrer</button>
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
              <div style="margin-top: 25px; margin-bottom: 5px; height: 55%; position: relative">
                <label>Astuce du déménageur à vélo :</label>
                <textarea v-model="astuceMsgsInventaire"></textarea>
                <span style="float: right; font-size: 10px">*écrit en HTML</span>
              </div>
              <button class="save-button" @click="savePageInventaireMsgsAstuce(astuceMsgsInventaire)">Enregistrer</button>
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
            <!--<iframe src="http://localhost:8080/options_demenagement"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageOptionsDem"></input>
              </div>
              <button class="save-button" @click="savePageTitle('optionsDem', titrePageOptionsDem)">Modifier titre</button>
              <div style="margin-top: 25px; margin-bottom: 5px; height: 55%; position: relative">
                <label>Astuce du déménageur à vélo :</label>
                <textarea v-model="astuceMsgsOptionsDem"></textarea>
                <span style="float: right; font-size: 10px">*écrit en HTML</span>
              </div>
              <button class="save-button" @click="savePageOptionsDemMsgsAstuce(astuceMsgsOptionsDem)">Enregistrer</button>
            </div>
          </div>

          <div class="form-reglage-interface" v-if="tabs[5]">
            <!--<iframe src="http://localhost:8080/date_demenagement"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageDateDem"></input>
              </div>
              <button class="save-button" @click="savePageTitle('dateDem', titrePageDateDem)">Modifier titre</button>
              <fieldset style="margin-top: 25px;">
                <legend><b>Créneaux de déménagement</b></legend>
                <div style="margin-bottom: 10px; height: 30px"><label>Créneau 1 :</label><input type="text" v-model="nameCreneauMatin" /></div>
                <div style="margin-bottom: 10px; height: 30px"><label>Créneau 2 :</label><input type="text" v-model="nameCreneauSoir" /></div>
                <div style="margin-bottom: 10px; height: 30px"><label>Créneau une journée :</label><input type="text" v-model="nameCreneauTouteJournee" /></div>
                <button class="save-button" @click="saveCreneauxDem(nameCreneauMatin, nameCreneauSoir, nameCreneauTouteJournee)">Enregistrer créneaux</button>
              </fieldset>
              <fieldset style="margin-top: 25px;">
                <legend><b>Horaires de RDV (Transport simple)</b></legend>
                <div v-for="heure in heuresRdv" style="border: 1px solid black; margin: 2px auto; width: 70%; padding: 5px">
                  {{ heure.val }}h  <div class="delete-button" @click="deleteHourRdv(heure)">x</div>
                </div>
                <div style="margin-bottom: 10px; height: 30px"><label>Ajouter une horaire :</label><input type="number" v-model="newHourRdv" /></div>
                <button class="save-button" @click="saveHeureRdv(newHourRdv)" :disabled="newHourRdv == ''" >Ajouter horaire</button>
              </fieldset>
              <div style="margin-top: 25px; margin-bottom: 5px; height: 55%; position: relative">
                <label>Astuce du déménageur à vélo :</label>
                <textarea v-model="astuceMsgsDateDem"></textarea>
                <span style="float: right; font-size: 10px">*écrit en HTML</span>
              </div>
              <button class="save-button" @click="savePageDateDemMsgsAstuce(astuceMsgsDateDem)">Enregistrer</button>
            </div>
          </div>

          <div class="form-reglage-interface" v-if="tabs[6]">
            <!--<iframe src="http://localhost:8080/options"></iframe>-->
            <div class="form-modif-interface">
              <div style="margin-bottom: 5px; height: 10%; position: relative">
                <label>Titre :</label>
                <input type="text" v-model="titrePageCartons"></input>
              </div>
              <button class="save-button" @click="savePageTitle('options', titrePageCartons)">Modifier titre</button>
              <div style="margin-top: 25px; margin-bottom: 5px; height: 55%; position: relative">
                <label>Information cartonesque :</label>
                <textarea v-model="astuceMsgsCartons"></textarea>
                <span style="float: right; font-size: 10px">*écrit en HTML</span>
              </div>
              <button class="save-button" @click="savePageCartonsMsgsAstuce(astuceMsgsCartons)">Enregistrer</button>
            </div>
          </div>
          <div class="form-reglage-interface" v-if="tabs[7]">
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
import { db, rootRef } from '../db/firebaseConfig.js';

export default {
  name: 'Interface',
  data () {
    return {
      tabs: [true, false, false, false, false, false, false, false],

      titrePageTypeDem: '',
      titrePageAdresses: '',
      titrePageInventaire: '',
      titrePageDemontage: '',
      titrePageOptionsDem: '',
      titrePageDateDem: '',
      titrePageCartons: '',
      titrePageRecapitulatif: '',

      typesDemenagement: [],
      warningMsgsAdresses: '',
      errorPrestaImpossible: '',
      warningMsgsInventaire: '',
      astuceMsgsInventaire: '',
      astuceMsgsOptionsDem: '',
      astuceMsgsDateDem: '',
      astuceMsgsCartons: '',

      nameCreneauMatin: '',
      nameCreneauSoir: '',
      nameCreneauTouteJournee: '',

      heuresRdv: [],
      newHourRdv: ''
    };
  },
  components: {
    NavigationBar
  },
  mounted() {
    this.getPageTitlesData();
    this.getWarningMsgsData();
    this.getAstuceMsgsData();
    this.getErrorMsgsData();
    this.getCreneauxDemData();
  },
  firebase: {
    typesDemenagement: rootRef.child('typesDemenagement'),
    heuresRdv: rootRef.child('agenda/heureRdv')
  },
  methods: {
    openTab(tab) {
      this.tabs = [false, false, false, false, false, false, false, false];
      this.tabs[tab] = true;
    },

    getPageTitlesData() {
      let interf = this;
      rootRef.child('interfaceGraphique').child('titrePage').on('child_added', function(snapshot) {
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
        if(snapshot.key == 'optionsDem') {
          interf.titrePageOptionsDem = snapshot.val();
        }
        if(snapshot.key == 'dateDem') {
          interf.titrePageDateDem = snapshot.val();
        }
        if(snapshot.key == 'options') {
          interf.titrePageCartons = snapshot.val();
        }
        if(snapshot.key == 'recapitulatif') {
          interf.titrePageRecapitulatif = snapshot.val();
        }
      });
      rootRef.child('interfaceGraphique').child('titrePage').on('child_changed', function(snapshot) {
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
        if(snapshot.key == 'optionsDem') {
          interf.titrePageOptionsDem = snapshot.val();
        }
        if(snapshot.key == 'dateDem') {
          interf.titrePageDateDem = snapshot.val();
        }
        if(snapshot.key == 'options') {
          interf.titrePageCartons = snapshot.val();
        }
        if(snapshot.key == 'recapitulatif') {
          interf.titrePageRecapitulatif = snapshot.val();
        }
      });
    },

    getWarningMsgsData() {
      let interf = this;
      rootRef.child('interfaceGraphique').child('msgsWarning').on('child_added', function(snapshot) {
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
        if(snapshot.key == 'optionsDem') {
        }
        if(snapshot.key == 'dateDem') {
        }
        if(snapshot.key == 'options') {
        }
        if(snapshot.key == 'recapitulatif') {
        }
      });
      rootRef.child('interfaceGraphique').child('msgsWarning').on('child_changed', function(snapshot) {
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
        if(snapshot.key == 'optionsDem') {
        }
        if(snapshot.key == 'dateDem') {
        }
        if(snapshot.key == 'options') {
        }
        if(snapshot.key == 'recapitulatif') {
        }
      });
    },

    getAstuceMsgsData() {
      let interf = this;
      rootRef.child('interfaceGraphique').child('msgsAstuce').on('child_added', function(snapshot) {
        if(snapshot.key == 'typeDem') {
        }
        if(snapshot.key == 'adresses') {
        }
        if(snapshot.key == 'inventaire') {
          interf.astuceMsgsInventaire = snapshot.val();
        }
        if(snapshot.key == 'demontage') {
        }
        if(snapshot.key == 'optionsDem') {
          interf.astuceMsgsOptionsDem = snapshot.val();
        }
        if(snapshot.key == 'dateDem') {
          interf.astuceMsgsDateDem = snapshot.val();
        }
        if(snapshot.key == 'cartons') {
          interf.astuceMsgsCartons = snapshot.val();
        }
        if(snapshot.key == 'recapitulatif') {
        }
      });
      rootRef.child('interfaceGraphique').child('msgsAstuce').on('child_changed', function(snapshot) {
        if(snapshot.key == 'typeDem') {
        }
        if(snapshot.key == 'adresses') {
        }
        if(snapshot.key == 'inventaire') {
          interf.astuceMsgsInventaire = snapshot.val();
        }
        if(snapshot.key == 'demontage') {
        }
        if(snapshot.key == 'optionsDem') {
          interf.astuceMsgsOptionsDem = snapshot.val();
        }
        if(snapshot.key == 'dateDem') {
          interf.astuceMsgsDateDem = snapshot.val();
        }
        if(snapshot.key == 'cartons') {
          interf.astuceMsgsCartons = snapshot.val();
        }
        if(snapshot.key == 'recapitulatif') {
        }
      });
    },

    getErrorMsgsData() {
      let interf = this;
      rootRef.child('interfaceGraphique').child('msgsAstuce').on('child_added', function(snapshot) {
        if(snapshot.key == 'errorPrestaImpossible') {
          interf.errorPrestaImpossible = snapshot.val();
        }
      });
      rootRef.child('interfaceGraphique').child('msgsAstuce').on('child_changed', function(snapshot) {
        if(snapshot.key == 'errorPrestaImpossible') {
          interf.errorPrestaImpossible = snapshot.val();
        }
      });
    },

    getCreneauxDemData() {
      let interf = this;
      rootRef.child('agenda').child('creneauDemenagement').on('child_added', function(snapshot) {
        if(snapshot.key == 'matin') {
          interf.nameCreneauMatin = snapshot.val().nom;
        }
        if(snapshot.key == 'soir') {
          interf.nameCreneauSoir = snapshot.val().nom;
        }
        if(snapshot.key == 'touteJournee') {
          interf.nameCreneauTouteJournee = snapshot.val().nom;
        }
      });
      rootRef.child('agenda').child('creneauDemenagement').on('child_changed', function(snapshot) {
        if(snapshot.key == 'matin') {
          interf.nameCreneauMatin = snapshot.val().nom;
        }
        if(snapshot.key == 'soir') {
          interf.nameCreneauSoir = snapshot.val().nom;
        }
        if(snapshot.key == 'touteJournee') {
          interf.nameCreneauTouteJournee = snapshot.val().nom;
        }
      });
    },

    savePageTitle(idPage, titrePage) {
      rootRef.child('interfaceGraphique').child('titrePage').update({
        [idPage]: titrePage
      });
    },

    savePageTypeDemPanel(typeDem, nom, description) {
      rootRef.child('typesDemenagement').child(Object.values(typeDem)[3]).update({
        nom: nom,
        description: description
      });
    },

    savePageAdressesMsgsWarning(warningMsgs) {
      rootRef.child('interfaceGraphique').child('msgsWarning').update({
        adresses: warningMsgs
      });
    },

    savePageInventaireMsgsWarning(warningMsgs) {
      rootRef.child('interfaceGraphique').child('msgsWarning').update({
        inventaire: warningMsgs
      });
    },

    savePageInventaireMsgsAstuce(astuceMsgs) {
      rootRef.child('interfaceGraphique').child('msgsAstuce').update({
        inventaire: astuceMsgs
      });
    },

    savePageOptionsDemMsgsAstuce(astuceMsgs) {
      rootRef.child('interfaceGraphique').child('msgsAstuce').update({
        optionsDem: astuceMsgs
      });
    },

    saveErrorMsgs(key, errorMsg) {
      rootRef.child('interfaceGraphique').child('msgsErreur').update({
        [key]: errorMsg
      });
    },

    saveCreneauxDem(nameCreneauMatin, nameCreneauSoir, nameCreneauTouteJournee) {
      rootRef.child('agenda').child('creneauDemenagement').update({
        matin: { nom: nameCreneauMatin },
        soir: { nom: nameCreneauSoir },
        touteJournee: { nom: nameCreneauTouteJournee }
      });
    },

    saveHeureRdv(heureVal) {
      let app = this;
      if(heureVal !== '') {
        let key = heureVal+'h';
        if(heureVal < 10) {
          key = '0'+heureVal+'h';
        }
        rootRef.child('agenda').child('heureRdv').update({
          [key]: { val: heureVal }
        },
        function(error) {
          if (error) {
            alert(error.message);
            console.log(error.message);
          } else {
            app.newHourRdv = '';
            alert("Une horaire ajoutée");
          }
        });
      }
    },

    deleteHourRdv(heureRdv) {
      if(!(Object.entries(heureRdv).length === 0 && heureRdv.constructor === Object)) {
        let key = heureRdv.val+'h';
        if(heureRdv.val < 10) {
          key = '0'+heureRdv.val+'h';
        }
        rootRef.child('agenda/heureRdv').child(key).remove().then(function() {
          alert("Un horaire a été supprimée : "+heureRdv.val+"h");
        })
        .catch(function(error) {
          alert(error.message);
          console.log(error.message);
        });
      }
    },

    savePageDateDemMsgsAstuce(astuceMsgs) {
      rootRef.child('interfaceGraphique').child('msgsAstuce').update({
        dateDem: astuceMsgs
      });
    },


    savePageCartonsMsgsAstuce(astuceMsgs) {
      rootRef.child('interfaceGraphique').child('msgsAstuce').update({
        cartons: astuceMsgs
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
      width: 12.5%;
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
      width: 150px;
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
      width: 100%;
      max-width: 80%;
      height: 500px;
      overflow-y: scroll;
      float: left;

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

  .delete-button {
    cursor: pointer;
    float: right;
    color: black;
    &:hover {
      font-weight: bold;
      color: red;
    }
  }


}

</style>
