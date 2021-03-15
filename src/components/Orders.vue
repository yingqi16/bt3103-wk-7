<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </ul>
    </nav>
    <ul id="ulStyle">
      <li v-for="items in orders" :key="items[0]" id="liStyle">
        <button v-bind:id="items[0]" v-on:click="route($event)">Modify</button>
        <button v-bind:id="items[0]" v-on:click="deleteItem($event)">
          Delete
        </button>
        <ul style="list-style: none; float: left">
          <li v-for="(values, key) in items[1]" :key="key">
            {{ key }}: {{ values }}
            <br />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.orders.push([doc.id, doc.data()]);
          });
        });
    },
    deleteItem: function (event) {
      let doc_id = event.target.getAttribute("id");
      database
        .collection("orders")
        .doc(doc_id)
        .delete()
        .then(() => location.reload());
    },
    route: function (event) {
      this.$router.push({
        name: "modify",
        params: { id: event.target.getAttribute("id") },
      });
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
#ulStyle {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#liStyle {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: lightblue;
  border-radius: 10px;
  border-width: 1px;
  float: right;
}
</style>