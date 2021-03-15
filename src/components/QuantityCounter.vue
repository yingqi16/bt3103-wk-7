<template>
  <div>
    <button v-on:click="decrement()">-</button>
    {{ counter }}
    <button v-on:click="increment()">+</button>
  </div>
</template>

<script>
export default {
  name: "QtyCounter",
  data() {
    return {
      counter: 0,
    };
  },

  props: {
    item: {
      type: Object,
    },
  },

  methods: {
    increment: function () {
      if (this.counter == 10) {
        alert("You cannot buy more than 10 items.");
      } else {
        this.counter++;
      }
      this.$emit("counter", this.item, this.counter);
    },

    decrement: function () {
      if (this.counter > 0) {
        this.counter--;
        this.$emit("counter", this.item, this.counter);
      }
    },
  },
};
</script>

<style scoped>
button {
  background-color: lightblue;
  height: 50px;
  width: 50px;
  border-radius: 6px;
  font-size: 25px;
}

div {
  font-size: 30px;
}
</style>