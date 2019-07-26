import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { config } from './db/firebaseConfig.js'
import { seedMonth, seedDay } from './db/seed.js';

const db = require('./db/firebaseConfig.js');

Vue.use(Vuex)

export const store = {
    state: {
      seedMonth,
      seedDay,
      startDate: { number: 0, month: 0, year: 0 },
      endDate: { number: 0, month: 0, year: 0 },
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
      if(this.state.startDate.number != 0) {
        return this.state.startDate.number+"/"+this.state.startDate.month+"/"+this.state.startDate.year;
      }
      else {
        return null;
      }
    },

    getSelectedEndDate () {
      if(this.state.endDate.number != 0) {
        return this.state.endDate.number+"/"+this.state.endDate.month+"/"+this.state.endDate.year;
      }
      else {
        return null;
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
      let reservedDatesRef = db.agendaRef.child('datesReservees');
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
      let closedDatesRef = db.agendaRef.child('datesFermees');
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
      let reservedDatesRef = db.agendaRef.child('datesReservees');
      let closedDatesRef = db.agendaRef.child('datesFermees');

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
      let tarifsRef = db.agendaRef.child('tarifParDate/tarifSpecial');

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

    saveElementInventaire(element, elementName, elementImage, elementVr, elementDisass, pieces) {
      if(elementImage !== '') {
        const name = elementName;
        var metadata = {
          contentType: 'image/jpeg',
        };

        db.storage.ref().child('imagesMeubles/' + name).getDownloadURL().then(onResolve, onReject);

        function onResolve() {
          db.storage.ref().child('imagesMeubles/'+ name).delete().then(function() {
            console.log("Image de l'élément supprimée de la BD");
          }).catch(function(error) {
            console.log(error.message);
          });
        }

        function onReject() {
          console.log("Image de l'élément n'existe pas dans la BD");
        }

        const uploadTask = db.storage.ref().child('imagesMeubles/' + name).put(elementImage, metadata);
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
            store.updateElementInventaire(element, elementName, downloadURL, elementVr, elementDisass, pieces);
          });
        });
      }
      else {
        this.updateElementInventaire(element, elementName, element.image, elementVr, elementDisass, pieces);
      }
    },


    updateElementInventaire(element, elementName, imageURL, elementVr, elementDisass, pieces) {

      if(!(Object.entries(element).length === 0 && element.constructor === Object)) {
        if(element.name !== elementName) {
          db.inventaireRef.child('meubles').child(elementName).update({
            name: elementName,
            //volume: elementVolume,
            //tarif: elementTarif,
            image: imageURL,
            vr: elementVr,
            canDisassemble: elementDisass,
            isSalon: pieces[0],
            isBureau: pieces[1],
            isChambre: pieces[2],
            isCuisine: pieces[3],
            isCellier: pieces[4],
            isDivers: pieces[5]
          },
          function(error) {
            if (error) {
              alert(error.message);
              console.log(error.message);
            } else {
              console.log("Un élément a été modifié : "+elementName+'');
            }
          });
          db.inventaireRef.child('meubles').child(element.name).remove().then(function() {
            console.log("Un élément a été supprimé : "+element.name+'');
          })
          .catch(function(error) {
            alert(error.message);
            console.log(error.message);
          });
        }
        else {
          db.inventaireRef.child('meubles').child(element.name).update({
            name: elementName,
            //volume: elementVolume,
            //tarif: elementTarif,
            image: imageURL,
            vr: elementVr,
            canDisassemble: elementDisass,
            isSalon: pieces[0],
            isBureau: pieces[1],
            isChambre: pieces[2],
            isCuisine: pieces[3],
            isCellier: pieces[4],
            isDivers: pieces[5]
          },
          function(error) {
            if (error) {
              alert(error.message);
              console.log(error.message);
            } else {
              console.log("Un élément a été modifié : "+elementName+'');
            }
          });
        }
      }
      else {
        if(imageURL == null) {
          imageURL = '';
        }/*
        let elementNumber = 1;
        db.inventaireRef.child('meubles').on('child_added', function(snapshot) {
          if(elementNumber == snapshot.key) {
            elementNumber++;
          }
          else {
          }
        });*/
        db.inventaireRef.child('meubles').child(elementName).update({
          name: elementName,
          //volume: elementVolume,
          //tarif: elementTarif,
          image: imageURL,
          vr: elementVr,
          canDisassemble: elementDisass,
          isSalon: pieces[0],
          isBureau: pieces[1],
          isChambre: pieces[2],
          isCuisine: pieces[3],
          isCellier: pieces[4],
          isDivers: pieces[5],
          //number: elementNumber
        },
        function(error) {
          if (error) {
            alert(error.message);
            console.log(error.message);
          } else {
            console.log("Un élément a été ajouté : "+elementName+'');
          }
        });
      }
    },

    saveAccessibilityFloorData(etageMaxGratuit, tarif) {
      if(etageMaxGratuit !== '' && tarif !== '') {
        db.tarificationRef.child('accessibiliteEtage').update({
          etageMaxGratuit: etageMaxGratuit,
          tarif: tarif,
        },
        function(error) {
          if (error) {
            alert(error.message);
            console.log(error.message);
          } else {
            alert("Modification réussie : Accessibilité (étage)");
          }
        });
      }
      else {
        alert("Formulaire incomplet !");
      }
    },

    saveApproachData(vitesse, tarif) {
      if(vitesse !== '' && tarif != '') {
        db.tarificationRef.child('approche').update({
          vitesse: vitesse,
          tarif: tarif,
        },
        function(error) {
          if (error) {
            alert(error.message);
            console.log(error.message);
          } else {
            alert("Modification réussie : Approche");
          }
        });
      }
      else {
        alert("Formulaire incomplet !");
      }
    },

    saveHandlingData(dureeManut1, dureeManut2, dureeManut3, dureeManut4, tarif) {
      if(dureeManut1 !== '' && dureeManut2 !== '' && dureeManut3 !== '' && dureeManut4 !== '' && tarif !== '') {
        db.tarificationRef.child('manutention').update({
          1: dureeManut1,
          2: dureeManut2,
          3: dureeManut3,
          4: dureeManut4,
          tarif: tarif,
        },
        function(error) {
          if (error) {
            alert(error.message);
            console.log(error.message);
          } else {
            alert("Modification réussie : Manutention");
          }
        });
      }
      else {
        alert("Formulaire incomplet !");
      }
    },

    saveTransportData(vitesse, tarif) {
      if(vitesse !== '' && tarif !== '') {
        db.tarificationRef.child('transport').update({
          vitesse: vitesse,
          tarif: tarif,
        },
        function(error) {
          if (error) {
            alert(error.message);
            console.log(error.message);
          } else {
            alert("Modification réussie : Transport");
          }
        });
      }
      else {
        alert("Formulaire incomplet !");
      }
    },

    deleteElementInventaire(element) {
      let meublesRef = db.inventaireRef.child('meubles');
      if(!(Object.entries(element).length === 0 && element.constructor === Object)) {
        meublesRef.child(element.name).remove().then(function() {
          console.log("Un élément a été supprimé : "+element.name+'');
        })
        .catch(function(error) {
          alert(error.message);
          console.log(error.message);
        });

        if(element.image !== '') {
          var imageName = element.name;
          // Create a reference to the file to delete
          var imageRef = db.storage.ref().child('imagesMeubles/'+imageName);
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
    },

    deleteOrder(order) {
      let orderRef = db.orderRef;
      if(!(Object.entries(order).length === 0 && order.constructor === Object)) {
        orderRef.child(order.contact.prenom+'-'+order.contact.nom+'-'+order.orderNumber).remove().then(function() {
          console.log("Une demande a été supprimée : "+order.contact.prenom+'-'+order.contact.nom+'-'+order.orderNumber+'');
        })
        .catch(function(error) {
          alert(error.message);
          console.log(error.message);
        });
      }
    },

    calculateDistance (origin, destination) {
      var distanceService = new google.maps.DistanceMatrixService();
      return new Promise((resolve, reject) => {
        distanceService.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'BICYCLING'
        }, (response, status) => {
          if(status === 'OK') {
            resolve(response.rows[0].elements[0].distance);
          } else {
            reject(new Error('Retrieve Distance Google : Not OK'));
          }
        });
      });
    },

    getDirection (origin, destination) {
      return "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBcc_IiK7JtWDhD9jm20HHjDaduqKHkcNg&origin="+origin+"&destination="+destination+"&mode=bicycling";
    },

    camalizeString(str) {
      str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
}
