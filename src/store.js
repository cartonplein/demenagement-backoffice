import Vue from 'vue'
import Vuex from 'vuex'
import { config } from './db/firebaseConfig.js'
import { seedMonth, seedDay } from './db/seed.js';

const fb = require('./db/firebaseConfig.js')

Vue.use(Vuex)

export const store = {
    state: {
      seedMonth,
      seedDay,
      startDate: { number: '', month: '', year: '' },
      endDate: { number: '', month: '', year: '' },
      selectedDates: [[], [], [], [], [], [], [], [], [], [], [], []],
      reservedDates: {}
    },

    getNumberCurrentMonth () {
      return new Date().getMonth();
    },

    getDayName (year, month, day) {
      var days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      var d = new Date(year, month, day);
      return days[d.getDay()];
    },

    getNumberDaysInMonth (month, year) {
      return new Date(year, month+1, 0).getDate();
    },

    initDayNames(year, activeMonthNumber) {
      let days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      this.state.seedDay.map((dayObj) => {
        let d = new Date(year, activeMonthNumber, dayObj.number);
        dayObj.name = days[d.getDay()];
      });
    },

    initCurrentMonthCurrentYear(monthNumber, year) {
      this.state.seedDay.map((dayObj) => {
        dayObj.currentMonth = monthNumber;
        dayObj.currentYear = year;
      });
      this.state.seedMonth.map((monthObj) => {
        monthObj.currentYear = year;
      });
      /*
      seedMonth.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          seedMonth.child(child.key).update({currentYear: year});
        });
      });
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          seedDay.child(child.key).update({currentMonth: monthNumber});
          seedDay.child(child.key).update({currentYear: year});
        });
      });
      */
    },

    setActiveMonth (monthNumber) {
      this.state.seedMonth.map((monthObj) => {
        monthObj.number === monthNumber ? monthObj.active = true : monthObj.active = false;
      });
      /*
      let seedMonth = this.state.seedMonth;
      seedMonth.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          seedMonth.child(child.key).update({active: false});
          if(child.key == monthNumber+1) {
            seedMonth.child(child.key).update({active: true});
          }
        });
      });
      */
    },

    getActiveMonth () {
      return this.state.seedMonth.find((month) => month.active);
      /*
      let seedMonth = this.state.seedMonth;
      var activeMonth = { title: '', number: '', currentYear: '' };
      seedMonth.orderByChild('active').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        activeMonth.title = data.title;
        activeMonth.number = data.number;
        activeMonth.currentYear = data.currentYear;
      });
      return activeMonth;
      */
    },

    setSelectedDay (dayNumber) {
      this.state.seedDay.map((dayObj) => {
        if(dayObj.number == dayNumber) { dayObj.selected = true; }
      });
      /*
      let seedDay = this.state.seedDay;
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          if(child.key == dayNumber) {
            seedDay.child(child.key).update({selected: true});
          }
        });
      });
      */
    },

    /*
    setSelectedStartMonth (monthNumber) {
      let seedMonth = this.state.seedMonth;
      seedMonth.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          seedMonth.child(child.key).update({selectedStart: false});
          if(child.key == monthNumber+1) {
            seedMonth.child(child.key).update({selectedStart: true});
          }
        });
      });
    },

    getSelectedStartMonth () {
      let seedMonth = this.state.seedMonth;
      var selectedStartMonth = { title: '', number: '', currentYear: '' };
      seedMonth.orderByChild('selectedStart').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        selectedStartMonth.title = data.title;
        selectedStartMonth.number = data.number;
        selectedStartMonth.currentYear = data.currentYear;
      });
      return selectedStartMonth;
    },

    setSelectedEndMonth (monthNumber) {
      let seedMonth = this.state.seedMonth;
      seedMonth.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          seedMonth.child(child.key).update({selectedEnd: false});
          if(child.key == monthNumber+1) {
            seedMonth.child(child.key).update({selectedEnd: true});
          }
        });
      });
    },

    getSelectedEndMonth () {
      let seedMonth = this.state.seedMonth;
      var selectedEndMonth = { title: '', number: '', currentYear: '' };
      seedMonth.orderByChild('selectedEnd').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        selectedEndMonth.title = data.title;
        selectedEndMonth.number = data.number;
        selectedEndMonth.currentYear = data.currentYear;
      });
      return selectedEndMonth;
    },
    */

    unselectAllDays () {
      this.state.seedDay.map((dayObj) => {
        dayObj.selected = false;
      });
      /*
      let seedDay = this.state.seedDay;
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
          seedDay.child(child.key).update({selected: false});
        });
      });
      */
    },

    unselectDay (dayNumber) {
      this.state.seedDay.map((dayObj) => {
        if(dayObj.number == dayNumber && dayObj.selected == true) { dayObj.selected = false; }
      });
      /*
      let seedDay = this.state.seedDay;
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          if(child.key == dayNumber) {
            seedDay.child(child.key).update({selected: false});
          }
        });
      });
      */
    },

    setSelectedDates (day, month, year) {
      console.log(month);
      if(!day.selected) {
        if(this.state.startDate.number == '') {
          //day.startMonth = month.number+1;
          this.state.startDate.number = day.number;
          this.state.startDate.month = month.number+1;
          this.state.startDate.year = year;
          this.state.endDate.number = day.number;
          this.state.endDate.month = month.number+1;
          this.state.endDate.year = year;
        }
        else {
          if(day.number >= this.state.startDate.number) {
            if(month.number+1 >= this.state.startDate.month) {
              this.emptySelectedDays(); //this.state.selectedDates = [];
              this.state.endDate.number = day.number;
              this.state.endDate.month = month.number+1;
              this.state.endDate.year = year;
            }
            else {
              this.emptySelectedDays();  //this.state.selectedDates = [];
              this.unselectDays(this.state.startDate.number, this.state.endDate.number);
              this.state.startDate.number = day.number;
              this.state.startDate.month = month.number+1;
              this.state.startDate.year = year;
              this.state.endDate.number = day.number;
              this.state.endDate.month = month.number+1;
              this.state.endDate.year = year;
            }
          }
          else {
            if(month.number+1 > this.state.startDate.month) {
              this.emptySelectedDays(); //this.state.selectedDates = [];
              this.state.endDate.number = day.number;
              this.state.endDate.month = month.number+1;
              this.state.endDate.year = year;
            }
            else {
              this.emptySelectedDays();  //this.state.selectedDates = [];
              this.unselectDays(this.state.startDate.number, this.state.endDate.number);
              this.state.startDate.number = day.number;
              this.state.startDate.month = month.number+1;
              this.state.startDate.year = year;
              this.state.endDate.number = day.number;
              this.state.endDate.month = month.number+1;
              this.state.endDate.year = year;
            }
          }
        }
      }
      else {
        this.unselectDay(day.number);
        if(day.number == this.state.endDate.number && month.number+1 == this.state.endDate.month) {
          this.state.selectedDates[month.number].pop();
          this.state.endDate.number = this.state.selectedDates[month.number][this.state.selectedDates[month.number].length-1];
          //this.emptySelectedDays();  //this.state.selectedDates = [];
        }
        if(day.number == this.state.startDate.number && month.number+1 == this.state.startDate.month) {
          this.state.selectedDates[month.number].shift();
          this.state.startDate.number = this.state.selectedDates[month.number][0];
          //this.emptySelectedDays();  //this.state.selectedDates = [];
        }
        if(day.number > this.state.selectedDates[month.number][0] && day.number < this.state.selectedDates[month.number][this.state.selectedDates[month.number].length-1]) {
          if(month.number+1 >= this.state.startDate.month) {
            this.emptySelectedDays();
            this.unselectDays(1, day.number);
            this.state.startDate.number = day.number + 1;
            this.state.startDate.month = month.number + 1;
            this.state.startDate.year = year;
          }
        }
        if(this.getSelectedDay() == null) {
          this.state.startDate = { number: '', month: '', year: '' };
          this.state.endDate = { number: '', month: '', year: '' };
          this.emptySelectedDays();  //this.state.selectedDates = [];
        }
      }
      //console.log(store.state.startDate+" "+this.$parent.activeMonth.title+" "+this.$parent.currentYear+" - "+store.state.endDate+" "+this.$parent.activeMonth.title+" "+this.$parent.currentYear);
      //this.setSelectedDates(this.state.startDate, this.state.endDate);
      this.emptySelectedDays();
      if(this.state.startDate.month == this.state.endDate.month && this.state.startDate.month != '') {
        for(var j=this.state.startDate.number; j<=this.state.endDate.number; j++) {
          this.state.selectedDates[this.state.startDate.month-1].push(j);
          //this.setSelectedDay (j);
        }
      }
      if(this.state.endDate.month > this.state.startDate.month) {
        var d = this.state.endDate.month - this.state.startDate.month;
        for(var j=this.state.startDate.number; j<=this.getNumberDaysInMonth(this.state.startDate.month-1, this.state.startDate.year); j++) {
          this.state.selectedDates[this.state.startDate.month-1].push(j);
          //this.setSelectedDay (j);
        }
        for(var i=1; i<d; i++) {
          for(var j=1; j<=this.getNumberDaysInMonth(this.state.startDate.month-1+i, this.state.startDate.year); j++) {
            this.state.selectedDates[this.state.startDate.month-1+i].push(j);
            //this.setSelectedDay (j);
          }
        }
        for(var j=1; j<=this.state.endDate.number; j++) {
          this.state.selectedDates[this.state.endDate.month-1].push(j);
          //this.setSelectedDay (j);
        }
      }

      this.selectSelectedDates(month.number);

      console.log(this.state.selectedDates);
      console.log(this.state.startDate);
      console.log(this.state.endDate);
    },

    emptySelectedDays() {
      for(var i=0; i<12; i++) {
        this.state.selectedDates[i] = [];
      }
    },

    /* changer la forme des cases de l'agenda */
    selectSelectedDates(monthNumber) {
      this.unselectAllDays();
      let selectedDatesMonth = this.state.selectedDates[monthNumber];
      for(var i = selectedDatesMonth[0]; i <= selectedDatesMonth[selectedDatesMonth.length-1]; i++) {
        this.setSelectedDay(i);
      }
    },

    isSelectedDaysEmpty() {
      var selectedDaysEmpty = false;
      for(var i=0; i<12; i++) {
        if(this.state.selectedDates[i] == []) {
          selectedDaysEmpty = true;
        }
        else {
          selectedDaysEmpty = false;
        }
      }
      return selectedDaysEmpty;
    },

    unselectDays (startDate, endDate) {
      for(var i=startDate; i<=endDate; i++) {
        this.unselectDay (i);
      }
      //console.log(this.state.selectedDates);
    },

    getSelectedStartDate () {
      return this.state.startDate.number+"/"+this.state.startDate.month+"/"+this.state.startDate.year;
    },

    getSelectedEndDate () {
      return this.state.endDate.number+"/"+this.state.endDate.month+"/"+this.state.endDate.year;
    },

    getSelectedDay () {
      return this.state.seedDay.find((day) => day.selected);
      /*
      let seedDay = this.state.seedDay;
      var selectedDay = { number: '' };
      seedDay.orderByChild('selected').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        selectedDay.number = data.number;
      });
      return selectedDay;
      */
    },

    setActiveDay (dayNumber) {
      this.state.seedDay.map((dayObj) => {
        dayObj.number === dayNumber ? dayObj.active = true : dayObj.active = false;
      });
      /*
      let seedDay = this.state.seedDay;
      seedDay.once('value', function(snapshot) {
        snapshot.forEach(function(child){
          seedDay.child(child.key).update({active: false});
          if(child.key == dayNumber) {
            seedDay.child(child.key).update({active: true});
          }
        });
      });
      */
    },

    getActiveDay () {
      return this.state.seedDay.find((day) => day.active);
      /*
      let seedDay = this.state.seedDay;
      var activeDay = { number: '', currentMonth: '', currentYear: '' };
      seedDay.orderByChild('active').equalTo(true).on('child_added', function(snapshot) {
        var data = snapshot.val();
        activeDay.number = data.number;
        activeDay.currentMonth = data.currentMonth;
        activeDay.currentYear = data.currentYear;
      });
      return activeDay;
      */
    },

    saveReservedDates() {
      let reservedDatesRef = fb.backOfficeRef.child('datesReservees');
      for(var i=0; i<12; i++) {
        if(this.state.selectedDates[i].length != 0) {
          for(var j=0; j<this.state.selectedDates[i].length; j++) {
            reservedDatesRef.child(i).update({
              [this.state.selectedDates[i][j]]: this.state.selectedDates[i][j]
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                store.unselectAllDays();
              }
            });
          }
        }
      }
    },

    saveClosedDates() {
      let closedDatesRef = fb.backOfficeRef.child('datesFermees');
      for(var i=0; i<12; i++) {
        if(this.state.selectedDates[i].length != 0) {
          for(var j=0; j<this.state.selectedDates[i].length; j++) {
            closedDatesRef.child(i).update({
              [this.state.selectedDates[i][j]]: this.state.selectedDates[i][j]
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                store.unselectAllDays();
              }
            });
          }
        }
      }
    },

    saveAvailableDates() {
      let reservedDatesRef = fb.backOfficeRef.child('datesReservees');
      let closedDatesRef = fb.backOfficeRef.child('datesFermees');

      for(var i=0; i<12; i++) {
        if(this.state.selectedDates[i].length != 0) {
          for(var j=0; j<this.state.selectedDates[i].length; j++) {
            reservedDatesRef.child(i).update({
              [this.state.selectedDates[i][j]]: null
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                store.unselectAllDays();
              }
            });
          }
        }
      }

      for(var i=0; i<12; i++) {
        if(this.state.selectedDates[i].length != 0) {
          for(var j=0; j<this.state.selectedDates[i].length; j++) {
            closedDatesRef.child(i).update({
              [this.state.selectedDates[i][j]]: null
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                store.unselectAllDays();
              }
            });
          }
        }
      }

    },




}
