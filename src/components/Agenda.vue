<template>
    <div id="agenda">
      <NavigationBar />
      <div class="main">
        <div class="row">

          <fieldset class="calendar">
            <legend>Agenda</legend>
            <table id="table-dates">
              <tr id="row-month">
                <th id="month-display" colspan="7">
                  <div class="container month-banner has-text-centered has-text-black">
                    <i class="arrow" @click="setActivePreviousMonth(getActiveMonth().number)" v-bind:class="{ 'left': true, 'leftInactive': getActiveMonth().number == currentMonth && getActiveMonth().currentYear == currentYear }"></i>
                    <span style="font-size: 25px"><b>{{ getActiveMonth().name }} {{ titleOfActiveYear }}</b></span>
                    <i class="arrow right" @click="setActiveNextMonth(getActiveMonth().number)"></i>
                  </div>
                </th>
              </tr>

              <tr id="days-display">
                <th scope="col" v-for="dayName in dayNames" :key="dayName">{{ dayName }}</th>
              </tr>

              <tr id="days-row-one">
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= 1 && day.number <= getLastDateByWeek(1) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
              </tr>

              <tr id="days-row-two">
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(2)  && day.number <= getLastDateByWeek(2) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(2) && day.number <= getLastDateByWeek(2) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
              </tr>

              <tr id="days-row-three">
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(3) && day.number <= getLastDateByWeek(3) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
              </tr>

              <tr id="days-row-four">
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(4) && day.number <= getLastDateByWeek(4) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
              </tr>

              <tr id="days-row-five">
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Lun' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Mar' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Mer' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Jeu' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Ven' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Sam' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(5) && day.number <= getLastDateByWeek(5) && day.name == 'Dim' && day.number <= getNumberDaysInActiveMonth()"
                    :key="day.number"
                    :day="day" />
                </td>
              </tr>

              <tr id="days-row-six">
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Lun'"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Mar'"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Mer'"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Jeu'"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Ven'"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Sam'"
                    :key="day.number"
                    :day="day" />
                </td>
                <td>
                  <PanelDay v-for="day in days" v-if="day.number >= getFirstDateByWeek(6) && day.number <= getLastDateByWeek(6) && day.name == 'Dim'"
                    :key="day.number"
                    :day="day" />
                </td>
              </tr>

            </table>
          </fieldset>

          <fieldset class="list-orders" v-show="ordersByDate.length !== 0">
            <legend>Liste de prestations du jour</legend>
            <div :class="{ 'order': true, 'order-transport': order.typeDemenagement == 'Transport simple', 'order-demenagement': order.typeDemenagement == 'Déménagement sur inventaire' }" v-for="order in ordersByDate">
              <b>{{ order.typeDemenagement }}</b>
              <ul>
                <li><img src="../assets/contact-person.png" />{{ order.contact.prenom }} {{ order.contact.nom }}</li>
                <li><img src="../assets/contact-tel.png" />{{ order.contact.telephone }}</li>
                <li><img src="../assets/order-vr.png" />{{ order.vrTotal }} VR</li>
                <li><img src="../assets/contact-pickup-address.png" />{{ order.pickupAddress.adresse }}</li>
                <li><img src="../assets/contact-dest-address.png" />{{ order.destinationAddress.adresse }}</li>
                <li>
                  <img src="../assets/order-hour.png" />
                  <span v-show="order.typeDemenagement == 'Transport simple'">{{ order.heureRdv }}</span>
                  <span v-show="order.typeDemenagement == 'Déménagement sur inventaire'">{{ order.creneauDemenagement }}</span>
                </li>
              </ul>
            </div>
          </fieldset>

        </div>

        <div class="row">
          <fieldset class="forms">
            <legend>Tarification et disponibilité (disponible/fermé) des dates</legend>
            <div class="form-dates" :class="{ 'disableForm': isDateSelected }">
              <div style="margin-top: 20px; position: relative">
                <label for="tarif-date">Modifier le tarif par défaut :</label>
                <input type="number" id="tarif-date" v-model.number="tarifParDefaut"></input>
                <span class="unit">€</span>
              </div>
              <div style="margin-top: 10px">
                <button id="save-button" @click="updateDefaultTarif">Modifier</button>
              </div>
            </div>

            <div class="form-dates" :class="{ 'disableForm': !isDateSelected }">
              <div class="row">
                <div class="cell" style="padding: 0px">
                  <label for="selected-start-date">Date de début :</label>
                  <input id="selected-start-date" placeholder="" type="text" disabled></input>
                </div>
                <div class="cell" style="padding: 0px">
                  <label for="selected-end-date">Date de fin :</label>
                  <input id="selected-end-date" placeholder="" type="text" disabled></input>
                </div>
              </div>
              <div style="margin-top: 20px">
                <label for="choice-for-dates">Disponibilité :</label>
                <select id="choice-for-dates" ref="choiceForDates" @change="selectOptionAvailability">
                  <option value="" disabled hidden>Selectionner un choix</option>
                  <option value="dispo">Disponible</option>
                  <option value="closed">Fermé</option>
                  <!--<option value="reserved-before">Réservé - Avant-midi</option>
                  <option value="reserved-after">Réservé - Après-midi</option>
                  <option value="reserved-full">Réservé - Toute la journée</option>-->
                </select>
              </div>

              <div style="margin-top: 20px; position: relative">
                <label for="tarif-date">Tarif par date :</label>
                <input type="number" id="tarif-date" v-model.number="tarifDate"></input>
                <span class="unit">€</span>
              </div>
              <div style="margin-top: 5px">
                <input id="tarif-defaut" type="checkbox" ref="tarifDefaut" style="color: black; float: left; margin-left: 5px; font-size: 12px" @click="disableTarifInput">
                <label for="tarif-defaut" style="font-weight: normal; margin-left: 3px; margin-top: 1px; font-size: 13px">Tarif par défaut</label>
              </div>

              <div style="margin-top: 40px">
                <button id="save-button" @click="saveModifications">Enregistrer</button>
              </div>
            </div>
          </fieldset>

        </div>
      </div>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import PanelDay from './PanelDay.vue';

import { store } from '../store.js';
import { db, rootRef } from '../db/firebaseConfig.js';

    export default {
        name: 'Agenda',
        data () {
          return {
            displayDatesKey: 0,
            dayNames: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            currentDay: new Date().getDate(),
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            tarifDate: null,
            tarifParDefaut: null,

            days: store.state.seedDay,
            reservedDates: {0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}},
            closedDates: {0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}},

            isDateSelected: false,

            ordersByDate: []
          };
        },
        components: {
          NavigationBar,
          PanelDay
        },
        created: function () {
          this.setActiveDay(this.currentDay);
          this.setActiveMonth(this.currentMonth);
        },
        firebase: {
          heuresRdv: rootRef.child('agenda/heureRdv'),
          creneauxDem: rootRef.child('agenda/creneauDemenagement')
        },
        mounted: function () {
          this.initCurrentMonthCurrentYear(this.currentMonth, this.currentYear);
          this.initDayNames(this.currentYear, this.currentMonth);
          let agenda = this;
          rootRef.child('agenda').child('datesReservees').on('child_added', function(snapshot) {
            console.log(snapshot.val());
            agenda.reservedDates[snapshot.key] = snapshot.val();
          });
          rootRef.child('agenda').child('datesFermees').on('child_added', function(snapshot) {
            agenda.closedDates[snapshot.key] = snapshot.val();
          });
          rootRef.child('agenda').child('tarifParDate/tarifParDefaut').on('child_added', function(snapshot) {
            agenda.tarifParDefaut = snapshot.val();
          });

          console.log(agenda.reservedDates);
        },
        methods: {

          getDatesByDay(dayName) {
            return store.getDatesByDay(dayName);
          },

          getNumberDaysInActiveMonth () {
            var numberDaysInActiveMonth = store.getNumberDaysInMonth(this.getActiveMonth().number, this.currentYear);
            return numberDaysInActiveMonth;
          },

          getActiveMonth() {
            return store.getActiveMonth();
          },

          getActiveDay() {
            return store.getActiveDay();
          },

          initCurrentMonthCurrentYear(monthNumber, year) {
            store.initCurrentMonthCurrentYear(monthNumber, year);
            console.log("Aujourd'hui : "+this.currentDay+"/"+this.currentMonth+"/"+this.currentYear);
          },

          initDayNames(year, activeMonthNumber) {
            store.initDayNames(year, activeMonthNumber);
          },

          setActiveDay(dayNumber) {
            store.setActiveDay(dayNumber);
          },

          setActiveMonth(monthNumber) {
            //this.displayDatesKey += 1;
            store.setActiveMonth(monthNumber);
          },

          setActiveNextMonth(monthNumber) {
            monthNumber = monthNumber+1;
            if(monthNumber > 11) {
              monthNumber = 0;
              this.currentYear = this.currentYear + 1;
            }
            let agenda = this;
            this.setActiveMonth(monthNumber);
            this.initDayNames(this.currentYear, monthNumber);
            store.selectSelectedDates(monthNumber);
          },

          setActivePreviousMonth(monthNumber) {
            if(monthNumber >= 0) {
              monthNumber = monthNumber-1;
            }
            if(monthNumber < 0) {
              monthNumber = 11;
              this.currentYear = this.currentYear - 1;
            }
            this.setActiveMonth(monthNumber);
            this.initDayNames(this.currentYear, monthNumber);
            store.selectSelectedDates(monthNumber);
          },

          getLastDateByWeek(week) {
            let lastDateByWeek = 7;

            if(store.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Mar') { lastDateByWeek = 6; }
            if(store.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Mer') { lastDateByWeek = 5; }
            if(store.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Jeu') { lastDateByWeek = 4; }
            if(store.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Ven') { lastDateByWeek = 3; }
            if(store.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Sam') { lastDateByWeek = 2; }
            if(store.getDayName(this.currentYear, this.getActiveMonth().number, 1) == 'Dim') { lastDateByWeek = 1; }

            if(week == 1) { return lastDateByWeek; }
            if(week == 2) { return lastDateByWeek + 7; }
            if(week == 3) { return lastDateByWeek + 14; }
            if(week == 4) { return lastDateByWeek + 21; }
            if(week == 5) { return lastDateByWeek + 28; }
            if(week == 6) { return this.getNumberDaysInActiveMonth(); }
          },

          getFirstDateByWeek(week) {

            if(week == 2) { return this.getLastDateByWeek(1) + 1; }
            if(week == 3) { return this.getLastDateByWeek(2) + 1; }
            if(week == 4) { return this.getLastDateByWeek(3) + 1; }
            if(week == 5) { return this.getLastDateByWeek(4) + 1; }
            if(week == 6) { return this.getLastDateByWeek(5) + 1; }

          },

          updateStartEndDates () {
            //console.log(store.getSelectedStartDate(), store.getSelectedEndDate());
            document.getElementById('selected-start-date').value = store.getSelectedStartDate();
            document.getElementById('selected-end-date').value = store.getSelectedEndDate();
          },

          disableTarifInput() {
            let agenda = this;
            rootRef.child('agenda').child('tarifParDate/tarifParDefaut').on('child_added', function(snapshot) {
              agenda.tarifDate = snapshot.val();
            });
            document.getElementById('tarif-date').disabled = !document.getElementById('tarif-date').disabled;
            if(document.getElementById('tarif-date').disabled == false) {
              agenda.tarifDate = null;
            }
          },

          selectOptionAvailability() {
            if(this.$refs.choiceForDates.value == "reserved-before" || this.$refs.choiceForDates.value == "reserved-after") {
              this.isAvailabilityReserved = true;
            }
            else {
              this.isAvailabilityReserved = false;
            }
          },

          saveModifications() {
            /* Sauvegarder les modifs dans la BD */
            /*
            if(this.$refs.choiceForDates.value == "reserved-full") {
              store.saveReservedDates(this.currentYear, '', '');
              if(this.tarifDate !== null) {
                store.saveTarifsParDate(this.$refs.tarifDefaut.checked, this.tarifDate, this.currentYear);
              }
            }
            if(this.$refs.choiceForDates.value == "reserved-before") {
              store.saveReservedDates(this.currentYear, );
              if(this.tarifDate !== null) {
                store.saveTarifsParDate(this.$refs.tarifDefaut.checked, this.tarifDate, this.currentYear);
              }
            }
            if(this.$refs.choiceForDates.value == "reserved-after") {
              store.saveReservedDates(this.currentYear);
              if(this.tarifDate !== null) {
                store.saveTarifsParDate(this.$refs.tarifDefaut.checked, this.tarifDate, this.currentYear);
              }
            }*/
            if(this.$refs.choiceForDates.value == "closed") {
              store.saveClosedDates(this.currentYear);
              if(this.tarifDate !== null) {
                store.saveTarifsParDate(this.$refs.tarifDefaut.checked, this.tarifDate, this.currentYear);
              }
            }
            if(this.$refs.choiceForDates.value == "dispo") {
              store.saveAvailableDates(this.currentYear);
              if(this.tarifDate !== null) {
                store.saveTarifsParDate(this.$refs.tarifDefaut.checked, this.tarifDate, this.currentYear);
              }
            }

            /* Mettre à jour l'agenda */
            let agenda = this;
            rootRef.child('agenda').child('datesReservees').on('child_added', function(snapshot) {
              agenda.reservedDates[snapshot.key] = snapshot.val();
            });
            rootRef.child('agenda').child('datesReservees').on('child_changed', function(snapshot) {
              agenda.reservedDates[snapshot.key] = snapshot.val();
            });
            rootRef.child('agenda').child('datesReservees').on('child_removed', function(snapshot) {
              //snapshot.forEach(function(child) {
              agenda.reservedDates[snapshot.key] = {};
              //});
            });
            rootRef.child('agenda').child('datesFermees').on('child_added', function(snapshot) {
              agenda.closedDates[snapshot.key] = snapshot.val();
            });
            rootRef.child('agenda').child('datesFermees').on('child_changed', function(snapshot) {
              agenda.closedDates[snapshot.key] = snapshot.val();
            });
            rootRef.child('agenda').child('datesFermees').on('child_removed', function(snapshot) {
              //snapshot.forEach(function(child) {
              agenda.closedDates[snapshot.key] = {};
              //});
            });

            /* Initialiser l'agenda et le formulaire */
            for(var i=0; i<12; i++) {
              store.state.selectedDates[i] = [];
            }
            this.tarifDate = null;
            this.$refs.tarifDefaut.checked = false;
            document.getElementById('tarif-date').disabled = false;
            store.state.startDate = { number: 0, month: 0, year: 0 };
            store.state.endDate = { number: 0, month: 0, year: 0 };
            this.updateStartEndDates();
          },

          updateDefaultTarif() {
            rootRef.child('agenda').child('tarifParDate/tarifParDefaut').update({
              tarif: this.tarifParDefaut
            });
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
          openPageGestionTarification () {
            this.$router.push('/tarification');
          },
          openDashboard () {
            this.$router.push('/dashboard');
          }

        },
        computed: {
          titleOfActiveYear () {
            return this.currentYear;
          },
        }


    }
</script>

<style lang="scss" scoped>

#agenda {

  .main {
    display: table;
    width: 100vw;
    //height: 100vh;

    legend {
      font-weight: bold;
    }

    .calendar {
      float: left;
      width: 64%;
      border: 3px solid black;
      margin: 30px 10px;
      padding: 20px;
    }

    .list-orders {
      float: right;
      width: 32%;
      height: 630px;
      border: 3px solid black;
      margin: 30px 10px;
      padding: 20px;
      overflow-y: scroll;

      .order {
        margin: 5px auto;
        border: 2px solid black;
        padding: 10px 3px 3px 15px;
        text-align: justify;
        color: white;
        font-size: 13px;

        ul {
          list-style: none;
          padding: 0;
          li {
            margin: 2px;
            img {
              width: 25px;
              margin-right: 5px;
              vertical-align: middle;
            }
          }
        }
      }
      .order-transport {
        background: #7222B1;
      }
      .order-demenagement {
        background: #2C78DE;
      }
    }

    .forms {
      float: left;
      width: 50%;
      border: 3px solid black;
      margin: 30px 10px;
      padding: 20px;
    }

    .row {
      display: table-row;
      .cell {
        display: table-cell;
        padding: 20px;
      }
    }


    #table-dates {
      border-collapse: collapse;
      border: 1px solid rgb(100, 100, 100);
      letter-spacing: 1px;
      margin: auto;
      //float: left;
      //width: 0%;
      //height: 100%;
    }

    #month-display, #days-display {
        border: 1px solid rgb(100, 100, 100);
        padding: 10px 10px;
    }

    th {
        //border: 1px solid rgb(100, 100, 100);
        //padding: 10px 10px;
    }
    td {
        text-align: justify;
    }

    #month-display {

      position: relative;

      i {
        border: solid black;
        border-width: 0 4px 4px 0;
        display: inline-block;
        padding: 3px;
        position: absolute;

      }

      .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        right: 100px;
        top: 20px;
        &:hover {
          cursor: pointer;
          border: solid red;
          border-width: 0 5px 5px 0;
        }
      }

      .left {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        left: 100px;
        top: 20px;
        &:hover {
          cursor: pointer;
          border: solid red;
          border-width: 0 5px 5px 0;

        }
      }

      .leftInactive {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        pointer-events: none;
        opacity: 0.5;
      }

    }

    .form-dates {
      border: 1px solid rgb(100, 100, 100);
      padding: 20px;
      margin: 20px auto;
      width: 80%;
      height: 100%;

      #selected-start-date {
        width: 95%;
        float: left;
      }

      #selected-end-date, {
        width: 95%;
        float: right;
      }

      #tarif-date {
        width: 100%;
      }

      .unit {
        position: absolute; display: block; left: 15px; top: 34px; z-index: 9; color: grey;
      }

      input[type=text] {
        padding: 10px 10px;
        margin: 5px 5px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
      }

      input[type=number]  {
        padding: 10px 10px;
        padding-left: 25px;
        margin: 5px 5px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 15px;
      }

      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      select {
        width: 100%;
        padding: 10px 10px;
        margin: 5px 5px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }

      label {
        float: left; color: black; font-size: 15px; font-weight: bold;
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

        &:hover {background-color: #3e8e41}

        &:active {
          background-color: #3e8e41;
          box-shadow: 0 5px #666;
          transform: translateY(4px);
        }
      }

    }
  }

  .disableForm {
    opacity: 0.3;
    pointer-events: none;
  }

}

</style>
