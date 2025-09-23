<template>
  <v-container class="d-flex justify-center align-center" style="height: 80vh;">
    <v-card width="400">
      <v-card-title class="text-h5">Register</v-card-title>
      <v-card-text>
        <v-form ref="registerForm" @submit.prevent="registerUser">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          />
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />
          <v-btn type="submit" color="primary" class="mt-4" block>Register</v-btn>
        </v-form>

        <!-- Link to Login -->
        <p class="mt-2">
          Already have an account?
          <v-btn text color="primary" @click="$router.push('/login')">Login</v-btn>
        </p>

        <!-- Back to Home -->
        <p class="mt-2">
          <v-btn text color="secondary" @click="$router.push('/')">Back to Home</v-btn>
        </p>

        <!-- Error message -->
        <p v-if="errorMessage" class="red--text mt-2">{{ errorMessage }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    };
  },
  methods: {
    registerUser() {
      this.errorMessage = "";

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // Redirect to home after successful registration
          this.$router.push("/");
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }
};
</script>
