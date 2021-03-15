<template>
  <div>
    Menu:
    <ul>
      <li v-for="item in filter(itemsSelected)" v-bind:key="item[0]">
        {{ item[0] }} x {{ item[1] }}
      </li>
    </ul>
    <button
      v-on:click="
        findTotal();
        sendOrder();
      "
    >
      Add Order
    </button>
    <p v-show="check()">
      Subtotal: ${{ subTotal }} <br /><br />
      Grand Total: ${{ grandTotal }}
    </p>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      subTotal: 0,
      grandTotal: 0,
      clicked: false,
    };
  },
  props: {
    itemsSelected: {
      type: Array,
    },
  },

  methods: {
    findTotal: function () {
      this.subTotal = 0;
      this.clicked = true;
      for (let i = 0; i < this.itemsSelected.length; i++) {
        const item = this.itemsSelected[i];
        this.subTotal += item[2] * item[1];
      }
    },
    check: function () {
      return this.clicked;
    },
    sendOrder: function () {
      let selectedMap = new Object();
      this.itemsSelected.forEach((item) => (selectedMap[item[0]] = item[1]));
      database
        .collection("orders")
        .add(selectedMap)
        .then(() => location.reload());
    },
    filter: function (items) {
      var selected = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item[1] != 0) {
          selected.push(item);
        }
      }
      return selected;
    },
  },
  watch: {
    subTotal: function () {
      this.grandTotal = (this.subTotal * 1.07).toFixed(2);
    },
  },
};
</script>

<style scoped>
button {
  background-color: lightblue;
  border-radius: 6px;
  font-size: 15px;
  width: 100px;
}

div {
  font-size: 20px;
}

li {
  padding: 5px;
}
</style>