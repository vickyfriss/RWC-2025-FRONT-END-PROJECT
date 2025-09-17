<!-- MatchCard.vue -->
<template>
    <div class="match">
      <h3>{{ match.name }}</h3>
      <p>{{ match.teams }}</p>
      <p>{{ match.time }}</p>
      <p>{{ match.stadium }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MatchCard',
    props: {
      match: Object
    }
  }
  </script>
  
  <style>
  .match { 
    text-align: center; 
    padding: 10px; 
    border-radius: 8px; 
    font-weight: bold; 
    background-color: #007bff;
    color: white;
  }
  </style>
  