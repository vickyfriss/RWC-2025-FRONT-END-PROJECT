<template>
    <v-container class="d-flex flex-column align-center justify-center" style="height: 100vh;">
      <v-card class="pa-4" max-width="400">
        <v-card-title>Registrar nuevo jugador</v-card-title>
        <v-card-text>
          <v-text-field label="Correo electrónico" v-model="email"></v-text-field>
          <v-text-field label="Contraseña" type="password" v-model="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="register">Registrarse</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref } from "vue";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";
  
  export default {
    props: ["setUser"],
    setup(props) {
      const email = ref("");
      const password = ref("");
  
      const register = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
          props.setUser(userCredential.user);
        } catch (error) {
          alert("Error al registrarse: " + error.message);
        }
      };
  
      return { email, password, register };
    }
  };
  </script>
  