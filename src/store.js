import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
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
    },

    setActiveMonth (monthNumber) {
      this.state.seedMonth.map((monthObj) => {
        monthObj.number === monthNumber ? monthObj.active = true : monthObj.active = false;
      });
    },

    getActiveMonth () {
      return this.state.seedMonth.find((month) => month.active);
    },

    setSelectedDay (dayNumber) {
      this.state.seedDay.map((dayObj) => {
        if(dayObj.number == dayNumber) { dayObj.selected = true; }
      });
    },


    unselectAllDays () {
      this.state.seedDay.map((dayObj) => {
        dayObj.selected = false;
      });
    },

    unselectDay (dayNumber) {
      this.state.seedDay.map((dayObj) => {
        if(dayObj.number == dayNumber && dayObj.selected == true) { dayObj.selected = false; }
      });
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
    },

    getSelectedStartDate () {
      if(this.state.startDate.number != "") {
        return this.state.startDate.number+"/"+this.state.startDate.month+"/"+this.state.startDate.year;
      }
      else {
        return "";
      }
    },

    getSelectedEndDate () {
      if(this.state.endDate.number != "") {
        return this.state.endDate.number+"/"+this.state.endDate.month+"/"+this.state.endDate.year;
      }
      else {
        return "";
      }
    },

    getSelectedDay () {
      return this.state.seedDay.find((day) => day.selected);
    },

    setActiveDay (dayNumber) {
      this.state.seedDay.map((dayObj) => {
        dayObj.number === dayNumber ? dayObj.active = true : dayObj.active = false;
      });
    },

    getActiveDay () {
      return this.state.seedDay.find((day) => day.active);
    },

    saveReservedDates(year) {
      let reservedDatesRef = fb.agendaRef.child('datesReservees');
      for(var i=0; i<12; i++) {
        if(this.state.selectedDates[i].length != 0) {
          for(var j=0; j<this.state.selectedDates[i].length; j++) {
            reservedDatesRef.child(i).child(this.state.selectedDates[i][j]).update({
              [year]: year
            },
            function(error) {
              if (error) {
                alert(error.message);
                console.log(error.message);
              } else {
                store.unselectAllDays();
              }
            });
          }
        }
      }
    },

    saveClosedDates(year) {
      let closedDatesRef = fb.agendaRef.child('datesFermees');
      for(var i=0; i<12; i++) {
        if(this.state.selectedDates[i].length != 0) {
          for(var j=0; j<this.state.selectedDates[i].length; j++) {
            closedDatesRef.child(i).child(this.state.selectedDates[i][j]).update({
              [year]: year
            },
            function(error) {
              if (error) {
                alert(error.message);
                console.log(error.message);
              } else {
                store.unselectAllDays();
              }
            });
          }
        }
      }
    },

    saveAvailableDates(year) {
      let reservedDatesRef = fb.agendaRef.child('datesReservees');
      let closedDatesRef = fb.agendaRef.child('datesFermees');

      for(var i=0; i<12; i++) {
        if(this.state.selectedDates[i].length != 0) {
          for(var j=0; j<this.state.selectedDates[i].length; j++) {
            reservedDatesRef.child(i).child(this.state.selectedDates[i][j]).update({
              [year]: null
            },
            function(error) {
              if (error) {
                alert(error.message);
                console.log(error.message);
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
            closedDatesRef.child(i).child(this.state.selectedDates[i][j]).update({
              [year]: null
            },
            function(error) {
              if (error) {
                alert(error.message);
                console.log(error.message);
              } else {
                store.unselectAllDays();
              }
            });
          }
        }
      }

    },

    saveTarifsParDate(isDefaultTarif, tarifVal, year) {
      let tarifsRef = fb.agendaRef.child('tarifParDate/tarifSpecial');

      if (isDefaultTarif) {
        for(var i=0; i<12; i++) {
          if(this.state.selectedDates[i].length != 0) {
            for(var j=0; j<this.state.selectedDates[i].length; j++) {
              tarifsRef.child(i).child(year).child(this.state.selectedDates[i][j]).update({
                tarif: null
              },
              function(error) {
                if (error) {
                  alert(error.message);
                  console.log(error.message);
                } else {
                  store.unselectAllDays();
                }
              });
            }
          }
        }
      }
      else {
        for(var i=0; i<12; i++) {
          if(this.state.selectedDates[i].length != 0) {
            for(var j=0; j<this.state.selectedDates[i].length; j++) {
              tarifsRef.child(i).child(year).child(this.state.selectedDates[i][j]).update({
                tarif: tarifVal
              },
              function(error) {
                if (error) {
                  alert(error.message);
                  console.log(error.message);
                } else {
                  store.unselectAllDays();
                }
              });
            }
          }
        }
      }
    },

    saveElementInventaire(element, elementName, elementVolume, elementTarif, elementImage) {
      if(elementImage !== null) {
        const name = elementName;
        var metadata = {
          contentType: 'image/jpeg',
        };

        fb.storage.ref().child('imagesMeubles/' + name).getDownloadURL().then(onResolve, onReject);

        function onResolve() {
          fb.storage.ref().child('imagesMeubles/'+ name).delete().then(function() {
            console.log("Image de l'élément supprimée de la BD");
          }).catch(function(error) {
            console.log(error.message);
          });
        }

        function onReject() {
          console.log("Image de l'élément n'existe pas dans la BD");
        }

        const uploadTask = fb.storage.ref().child('imagesMeubles/' + name).put(elementImage, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            //console.log(downloadURL);
            store.updateElementInventaire(element, elementName, elementVolume, elementTarif, downloadURL);
          });
        });
      }
      else {
        this.updateElementInventaire(element, elementName, elementVolume, elementTarif, element.image);
      }
    },


    updateElementInventaire(element, elementName, elementVolume, elementTarif, imageURL) {

      if(!(Object.entries(element).length === 0 && element.constructor === Object)) {
          fb.inventaireRef.child('meubles').child(element.number).update({
            name: elementName,
            volume: elementVolume,
            tarif: elementTarif,
            image: imageURL,
          },
          function(error) {
            if (error) {
              alert(error.message);
              console.log(error.message);
            } else {
              alert("Un élément a été modifié : "+elementName+"");
            }
          });
        }
        else {
          if(imageURL == null) {
            imageURL = '';
          }
          let elementNumber = 1;
          fb.inventaireRef.child('meubles').on('child_added', function(snapshot) {
            if(elementNumber == snapshot.key) {
              elementNumber++;
            }
            else {
            }
          });

          fb.inventaireRef.child('meubles').child(elementNumber).update({
            name: elementName,
            volume: elementVolume,
            tarif: elementTarif,
            image: imageURL,
            number: elementNumber
          },
          function(error) {
            if (error) {
              alert(error.message);
              console.log(error.message);
            } else {
              alert("Un élément a été ajouté : "+elementName+"");
            }
          });
        }
    },

    deleteElementInventaire(element) {
      let meublesRef = fb.inventaireRef.child('meubles');
      if(!(Object.entries(element).length === 0 && element.constructor === Object)) {
        meublesRef.child(element.number).remove().then(function() {
          alert("Un élément a été supprimé : "+element.name+"");
        })
        .catch(function(error) {
          alert(error.message);
          console.log(error.message);
        });

        if(element.image !== '') {
          var imageName = element.name;
          // Create a reference to the file to delete
          var imageRef = fb.storage.ref().child('imagesMeubles/'+imageName);
          // Delete the file
          imageRef.delete().then(function() {
            console.log("Image de l'élément supprimée de la BD");
            // File deleted successfully
          }).catch(function(error) {
            console.log(error.message);
            // Uh-oh, an error occurred!
          });
        }
      }
    }






}
