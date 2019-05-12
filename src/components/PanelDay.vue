<template>
    <div id="panel-day" @click="selectDate"
      v-bind:class="{ 'styleInitial': true,
                      'styleWeekend' : (day.name == 'Sam' || day.name == 'Dim') && !(day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear),
                      'styleToday': day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear,
                      'styleSelected':  day.selected,
                      'styleUnselected': !day.selected,
                      'styleSelectedToday': (day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear) && day.selected,
                      'styleInactive': day.number < this.$parent.getActiveDay().number && day.currentMonth >= this.$parent.getActiveMonth().number && day.currentYear >= this.$parent.currentYear,
                      'styleSelectedWeekend' : (day.name == 'Sam' || day.name == 'Dim') && day.selected && !(day.active && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear),
       }"
      >
      <div class="day-banner has-text-justified has-text-black"><b>{{ day.number }}</b></div>
      <span class="signReservedDates" v-show="this.$parent.reservedDates &&
                                              this.$parent.reservedDates[this.$parent.getActiveMonth().number] &&
                                              this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number] &&
                                              this.$parent.reservedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear)"><b>Réservé</b></span>
      <span class="signClosedDates" v-show="this.$parent.reservedDates &&
                                              this.$parent.closedDates[this.$parent.getActiveMonth().number] &&
                                              this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number] &&
                                              this.$parent.closedDates[this.$parent.getActiveMonth().number][day.number].hasOwnProperty(this.$parent.currentYear)"><b>Fermé</b></span>
    </div>
</template>


<script>
import { store } from '../store.js';

export default {
    name: 'PanelDay',
    props: {
      day: Object
    },
    mounted() {
      console.log(this.day.active);
    },

    methods: {
      selectDate() {
        store.setSelectedDates(this.day, this.$parent.getActiveMonth(), this.$parent.currentYear);
        this.$parent.$options.methods.updateStartEndDates();
      }

    },

}

</script>


<style lang="scss" scoped>

.styleInitial {
  background: #f6b26bff;
  //border: 2px solid black;
  border-radius: 0;

  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  overflow: hidden;
  margin-top: 5px;

  height: 95px;
  max-height: 95px;
  width: 95px;
  max-width: 95px;

  position: relative;

  &:hover {
    background: darken(#e69138ff,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #e69138ff;
  }
}

.styleSelected {
  background-color: #e69138ff;
  border:  4px solid red;
}
.styleUnselected {
  background-color: #f6b26bff;
  //border:  2px solid black;
}

.styleToday {
  background-color: #F1875F;
  &:hover {
    background: darken(#E4612F,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #E4612F;
  }
}

.styleSelectedToday {
  background-color: #E4612F;
  border:  4px solid red;
}

.styleInactive {
  //background-color: #F4DDC3;
  pointer-events: none;
  opacity: 0.3;
}

.styleUnavailableDay {
  background-color: green;
}

.styleReservedDate {
  background-color: #5A94B8;
  &:hover {
    background: darken(#255B7C,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #255B7C;
  }
}

.styleClosedDate {
  background-color: #5AB897;
  &:hover {
    background: darken(#257C45,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #257C45;
  }
}

.styleSelectedReservedDate {
  background-color: #255B7C;
  border:  4px solid red;
}

.styleSelectedClosedDate {
  background-color: #257C45;
  border:  4px solid red;
}

.styleWeekend {
  background-color: #CFA87A;
  &:hover {
    background: darken(#BC8544,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #BC8544;
  }
}

.styleSelectedWeekend {
  background-color: #BC8544;
  border:  4px solid red;
}

.signClosedDates {
  height: 30px;
  width: 100%;
  background-color: #5AB897;
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
}

.signReservedDates {
  height: 30px;
  width: 100%;
  background-color: #5A94B8;
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
}


</style>
