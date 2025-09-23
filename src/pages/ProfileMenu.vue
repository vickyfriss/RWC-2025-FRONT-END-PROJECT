<template>
    <v-container class="pa-4">
      <v-card>
        <v-card-title>Bienvenido, {{ playerInfo.name }}</v-card-title>
        <v-card-text>
          <p><strong>Correo:</strong> {{ user.email }}</p>
          <p><strong>Posición:</strong> {{ playerInfo.position }}</p>
          <p><strong>Equipo:</strong> {{ playerInfo.team }}</p>
          <p><strong>Partidos jugados:</strong> {{ playerInfo.matchesPlayed }}</p>
          <p><strong>Puntos:</strong> {{ playerInfo.points }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { auth } from "../firebase";
  
  export default {
    props: ["user"],
    setup() {
      const playerInfo = {
        name: "Victoria Friss",
        position: "Fly-half",
        team: "Bath Rugby",
        matchesPlayed: 12,
        points: 45
      };
  
      const logout = () => {
        auth.signOut();
      };
  
      return { playerInfo, logout };
    }
  };
  </script>
  