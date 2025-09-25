<template>
  <v-container class="d-flex justify-center align-center" style="height: 80vh;">
    <v-card width="400" class="pa-4">
      <v-card-title class="text-h5 justify-center">Login</v-card-title>
      <v-card-text>
        <v-form ref="loginForm" @submit.prevent="loginUser">
          <!-- Email -->
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :class="{'field-invalid': email && !isEmailValid}"
            required
          />
          <p v-if="email && !isEmailValid" class="field-error">
            Invalid email format
          </p>

          <!-- Password -->
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :class="{'field-invalid': password && !password}"
            required
          />
          <p v-if="password && !password" class="field-error">
            Password cannot be empty
          </p>

          <!-- Login button -->
          <v-btn type="submit" color="primary" block class="mt-4">Login</v-btn>

          <!-- Register button with message -->
          <div class="text-center mt-4">
            <p class="mb-2">Don't have an account?</p>
            <v-btn color="primary" block @click="$router.push('/register')">Register</v-btn>
          </div>

          <!-- Back to Home button -->
          <div class="text-center mt-3">
            <v-btn color="primary" block @click="$router.push('/')">Back to Home</v-btn>
          </div>

          <!-- General error message -->
          <p v-if="errorMessage" class="red--text mt-3 text-center">{{ errorMessage }}</p>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    }
  },
  methods: {
    loginUser() {
      this.errorMessage = "";

      if (!this.isEmailValid) return;
      if (!this.password) return;

      signInWithEmailAndPassword(auth, this.email, this.password)
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
/* Red background for invalid input */
.field-invalid input {
  background-color: #ffe6e6 !important;
}

/* Field-specific error messages */
.field-error {
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}

/* Optional: make all buttons same height */
.v-btn {
  height: 40px;
}
</style>
