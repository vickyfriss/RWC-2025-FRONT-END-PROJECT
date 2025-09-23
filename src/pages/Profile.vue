<template>
    <v-container>
      <v-row justify="center" class="my-6">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <span class="text-h5 font-weight-bold">User Profile</span>
            </v-card-title>
  
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Email:</v-list-item-title>
                    <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>User ID:</v-list-item-title>
                    <v-list-item-subtitle>{{ user.uid }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
  
            <v-card-actions>
              <v-btn color="primary" @click="$router.push('/home')">Back to Home</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="logout">Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { auth } from "../firebase";
  import { onAuthStateChanged, signOut } from "firebase/auth";
  
  export default {
    name: "Profile",
    data() {
      return {
        user: {}
      };
    },
    mounted() {
      // Redirect if no user logged in
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        } else {
          this.$router.push("/login");
        }
      });
    },
    methods: {
      logout() {
        signOut(auth).then(() => {
          this.$router.push("/login");
        });
      }
    }
  };
  </script>
  