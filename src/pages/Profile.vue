<template>
  <v-container class="profile-container" fluid>
    <v-card class="profile-card pa-6">
      <v-card-title class="text-h5 justify-center profile-title">
        User Profile
      </v-card-title>

      <v-card-text>
        <div class="profile-info">
          <div class="profile-field">
            <span class="label">Email:</span>
            <span class="value">{{ user.email }}</span>
          </div>

          <div class="profile-field">
            <span class="label">User ID:</span>
            <span class="value">{{ user.uid }}</span>
          </div>
        </div>
      </v-card-text>

      <!-- Buttons stacked exactly like Login page -->
      <div class="profile-actions">
        <v-btn color="primary" block class="profile-btn" @click="$router.push('/')">
          Back to Home
        </v-btn>
        <v-btn color="primary" block class="profile-btn" @click="logout">
          Logout
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "Profile",
  data() {
    return { user: {} };
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) this.user = user;
      else this.$router.push("/login");
    });
  },
  methods: {
    logout() {
      signOut(auth).then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style scoped>
/* Full-screen light blue background */
.profile-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6f0fa;
  padding: 20px;
}

/* Card styling */
.profile-card {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Card title */
.profile-title {
  font-weight: 700;
  color: #1976d2;
}

/* Profile info fields */
.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.profile-field {
  background-color: #fdfdfd;
  border-radius: 6px;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
}

.label {
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 0.25rem;
}

.value {
  font-weight: 500;
  color: #1976d2;
  word-break: break-all;
}

/* Buttons stacked exactly like Login page */
.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 1.5rem;
}

/* Buttons styling */
.profile-btn {
  width: 100%;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff !important;
  background-color: #1976d2 !important;
  border-radius: 6px;
  height: 42px;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  background-color: #1565c0 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(25, 118, 210, 0.3);
}
</style>
