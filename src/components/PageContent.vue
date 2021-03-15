<template>
  <div id="itemsList">
    <nav>
      <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </ul>
    </nav>
    <ul>
      <li v-for="item in items" v-bind:key="item.id">
        <p id="itemName">
          {{ item.name }}
        </p>
        <img v-bind:src="'' + item.imageURL" />
        <p id="price">${{ item.price }}</p>
        <p>
          <QtyCounter v-bind:item="item" v-on:counter="onCounter"></QtyCounter>
        </p>
      </li>
    </ul>
    <Basket v-bind:itemsSelected="itemsSelected" id="shoppingBasket"></Basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter.vue";
import Basket from "./Basket.vue";
import database from "../firebase.js";
export default {
  components: {
    QtyCounter: QuantityCounter,
    Basket: Basket,
  },
  data() {
    return {
      items: [],
      itemsSelected: [],
    };
  },
  created: function () {
    this.fetchItems();
  },
  methods: {
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //initialise all to 0, except for item and its count
        database
          .collection("menu")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data().name === item.name) {
                this.itemsSelected.push([item.name, count, item.price]);
              } else {
                this.itemsSelected.push([doc.data().name, 0, doc.data().price]);
              }
            });
          });
      } else {
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          if (item_name === item.name) {
            this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
            break;
          }
        }
      }
      this.itemsSelected.sort(function(a, b) {
        if (a < b) {
          return -1
        } else {
          return 1
        }
      })
    },
    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.items.push(doc.data());
          });
        });
    },
  },
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>