<template>
  <div>
    <div v-for="[index, item] in datapacket.entries()" v-bind:key="index">
      {{ item[0] }}: {{ item[1] }}
      <br />
      <input type="number" v-bind:id="index" placeholder="0" min="0" />
      <br /><br />
    </div>
    <button v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      datapacket: [],
    };
  },
  methods: {
    fetchItems: function () {
      //there's diff between route and router (referring to route in orders.vue)
      const id = this.$route.params.id;
      database
        .collection("orders")
        .doc(id)
        .get()
        .then((snapshot) =>
          Object.entries(snapshot.data()).forEach((item) =>
            this.datapacket.push(item)
          )
        );
    },
    updateOrder: function () {
      let copy = new Object();
      for (let i = 0; i < this.datapacket.length; i++) {
        var item = this.datapacket[i];
        const newCount = document.getElementById(i).value;
        if (newCount === "") {
          copy[item[0]] = item[1];
        } else {
          copy[item[0]] = Number(newCount);
        }
      }

      console.log(copy);
      database
        .collection("orders")
        .doc(this.$route.params.id)
        .set(copy)
        .then(this.$router.push({ path: "/orders" }));
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
button {
  width: 100px;
  height: 30px;
  background-color: lightblue;
  border-radius: 10px;
  border-width: 1px;
}
</style>