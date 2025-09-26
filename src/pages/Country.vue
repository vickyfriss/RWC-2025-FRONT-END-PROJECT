<!-- src/pages/Country.vue -->
<template>
  <div>
    <h2>{{ country }} Page</h2>
    <p>Welcome to the {{ country }} rugby info page!</p>
    <button @click="$router.push('/')">Back to Home</button>
  </div>
</template>

<script>
export default {
  name: 'Country',
  props: ['country'], // receives the country name from the URL
}
</script>

<style>
h2 {
  text-align: center;
  color: #42b983;
}
p {
  text-align: center;
}
button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
