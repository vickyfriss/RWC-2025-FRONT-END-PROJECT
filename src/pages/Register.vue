<template>
  <v-container class="d-flex justify-center align-center" style="height: 80vh;">
    <v-card width="400" class="pa-4">
      <v-card-title class="text-h5 justify-center">Register</v-card-title>
      <v-card-text>
        <v-form ref="registerForm" @submit.prevent="registerUser">
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
            :class="{'field-invalid': password && !isPasswordValid}"
            required
          />
          <p v-if="password && !isPasswordValid" class="field-error">
            Password must be at least 8 characters and include uppercase, lowercase, number, and special character
          </p>

          <!-- Confirm Password -->
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            :class="{'field-invalid': confirmPassword && !doPasswordsMatch}"
            required
          />
          <p v-if="confirmPassword && !doPasswordsMatch" class="field-error">
            Passwords do not match
          </p>

          <!-- Register button -->
          <v-btn type="submit" color="primary" block class="mt-4">Register</v-btn>

          <!-- Login button with message -->
          <div class="text-center mt-4">
            <p class="mb-2">Already have an account?</p>
            <v-btn color="primary" block @click="$router.push('/login')">Login</v-btn>
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
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    isPasswordValid() {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      return passwordRegex.test(this.password);
    },
    doPasswordsMatch() {
      return this.password === this.confirmPassword;
    }
  },
  methods: {
    registerUser() {
      this.errorMessage = "";

      if (!this.isEmailValid) return;
      if (!this.isPasswordValid) return;
      if (!this.doPasswordsMatch) return;

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
