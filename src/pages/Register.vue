<template>
  <v-container class="d-flex justify-center align-center" style="height: 80vh;">
    <v-card width="400">
      <v-card-title class="text-h5">Register</v-card-title>
      <v-card-text>
        <v-form ref="registerForm" @submit.prevent="registerUser">

          <!-- Email field -->
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :class="{'field-invalid': email && !isEmailValid}"
            required
          />

          <!-- Password field -->
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :class="{'field-invalid': password && !isPasswordValid}"
            required
          />

          <!-- Confirm Password field -->
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            :class="{'field-invalid': confirmPassword && !doPasswordsMatch}"
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
  computed: {
    // Basic email validation
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    // Password validation
    isPasswordValid() {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      return passwordRegex.test(this.password);
    },
    // Confirm password matches
    doPasswordsMatch() {
      return this.password === this.confirmPassword;
    }
  },
  methods: {
    registerUser() {
      this.errorMessage = "";

      if (!this.isEmailValid) {
        this.errorMessage = "Invalid email format";
        return;
      }

      if (!this.isPasswordValid) {
        this.errorMessage =
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
        return;
      }

      if (!this.doPasswordsMatch) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }
};
</script>

<style>
/* Red background for invalid input fields */
.field-invalid input {
  background-color: #ffe6e6 !important;
}
</style>
