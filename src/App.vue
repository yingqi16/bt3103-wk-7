<template>
  <div>
    <h1>Best Zi Char</h1>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>
h1 {
  text-align: center;
  color: darkblue;
}

nav ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
nav ul li {
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
}
</style>
