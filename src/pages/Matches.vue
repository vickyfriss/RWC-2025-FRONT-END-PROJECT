<template>
    <div class="matches-grid">
      <div class="match">
        <h3>Semi-final 1</h3>
        <p>New Zealand vs Canada</p>
        <p>19:00, Ashton Gate Stadium</p>
      </div>
      <div class="match">
        <h3>Semi-final 2</h3>
        <p>France vs England</p>
        <p>15:30, Ashton Gate Stadium</p>
      </div>
  
      <!-- Bronze and Final side by side -->
      <div class="match">
        <h3>Bronze Final</h3>
        <p>Runner-Up SF1 vs Runner-Up SF2</p>
        <p>12:30, Allianz Stadium</p>
      </div>
      <div class="match">
        <h3>Final</h3>
        <p>Winner SF1 vs Winner SF2</p>
        <p>16:00, Allianz Stadium</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Matches'
  }
  </script>
  
  <style>
  .matches-grid { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 20px; 
    max-width: 600px; 
    margin: 20px auto; 
  }
  .match { 
    text-align: center; 
    padding: 10px; 
    border-radius: 8px; 
    font-weight: bold; 
    background-color: #007bff; /* Blue for all matches */
    color: white;
  }
  </style>
  