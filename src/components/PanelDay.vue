<template>
    <div id="panel-day" @click="selectDate"
      v-bind:class="{ 'styleInitialPanel': true,
                      'styleTodayPanel': day.number == this.$parent.currentDay && day.currentMonth == this.$parent.getActiveMonth().number && day.currentYear == this.$parent.currentYear,
                      'styleSelectedPanel':  day.selected,
                      'styleUnselectedPanel': day.selected,
                      'styleSelectedTodayPanel': day.active && day.selected,
                      'styleInactivePanel': day.number < this.$parent.getActiveDay().number && day.currentMonth >= this.$parent.getActiveMonth().number && day.currentYear >= this.$parent.currentYear,
                      'styleReservedDatePanel': reservedDates.includes(day.number),
                      'styleClosedDatePanel' : isClosed,
                      'styleSelectedReservedDatePanel' : reservedDates.includes(day.number) && day.selected,
                      'styleSelectedClosedDatePanel': isClosed && day.selected
                      }"
      >
      <div class="day-banner has-text-justified has-text-black"><b>{{ day.number }}</b></div>
      <div class="day-banner has-text-centered has-text-danger" v-show="isClosed"></br><b>FERMÉ</b></div>
      <div class="day-banner has-text-centered has-text-danger" v-show="reservedDates.includes(day.number)"></br><b>RÉSERVÉ</b></div>
    </div>
</template>


<script>
import { store } from '../store.js';
import { config } from '../db/firebaseConfig.js'

const fb = require('../db/firebaseConfig.js')

export default {
    name: 'PanelDay',
    data () {
      return {
        reservedDates: [],
        isClosed: false
      };
    },
    props: {
      day: Object
    },
    firebase() {
      this.reservedDates = store.getReservedDatesByMonth(this.$parent.getActiveMonth().number);
    },
    mounted() {
      console.log(this.isReserved);
    },

    methods: {
      selectDate() {
        store.setSelectedDates(this.day, this.$parent.getActiveMonth(), this.$parent.currentYear);
        this.$parent.$options.methods.updateStartEndDates();
      },

    },

}

</script>


<style lang="scss" scoped>

.styleInitialPanel {
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

  &:hover {
    background: darken(#e69138ff,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #e69138ff;
  }
}

.styleSelectedPanel {
  background-color: #e69138ff;
  border:  4px solid red;
}
.styleUnselectedPanel {
  background-color: #f6b26bff;
  //border:  2px solid black;
}

.styleTodayPanel {
  background-color: #E2C96A;
  //border:  3px solid black;
}

.styleSelectedTodayPanel {
  background-color: #e69138ff;
  border:  4px solid red;
}

.styleInactivePanel {
  background-color: #F4DDC3;
  pointer-events: none;
  opacity: 0.6;
}

.styleUnavailableDayPanel {
  background-color: green;
}

.styleReservedDatePanel {
  background-color: #5A94B8;
  &:hover {
    background: darken(#255B7C,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #255B7C;
  }
}

.styleClosedDatePanel {
  background-color: #5AB897;
  &:hover {
    background: darken(#257C45,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #257C45;
  }
}

.styleSelectedReservedDatePanel {
  background-color: #255B7C;
  border:  4px solid red;
}

.styleSelectedClosedDatePanel {
  background-color: #257C45;
  border:  4px solid red;
}

</style>
