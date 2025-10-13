<template>
  <div class="p-4 w-full mx-auto max-w-4xl">
    <v-row justify="center" class="mb-4">
      <v-col cols="12">
        <v-card outlined class="profile-card hover-card">
          <v-card-title class="profile-title">User Profile</v-card-title>

          <v-card-text class="p-6">
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

          <v-card-actions class="px-6 pb-4 justify-between">
            <v-btn color="primary" variant="text" @click="$router.push('/home')">
              Back to Home
            </v-btn>
            <v-btn color="error" variant="text" @click="logout">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
      if (user) {
        this.user = user;
      } else {
        this.$router.push("/login");
      }
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
.profile-card {
  padding: 6px;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
}

.hover-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.profile-title {
  font-weight: bold;
  font-size: 1.2rem !important;
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #1976d2, #004ba0);
  border-radius: 6px;
  padding: 0.6rem 0;
  margin-bottom: 0.5rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-field {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fafafa;
  transition: background-color 0.3s ease;
}

.profile-field:hover {
  background-color: #f0f7ff;
}

.label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
  display: block;
}

.value {
  color: #1976d2;
  font-weight: 500;
  word-break: break-all;
}

@media (max-width: 768px) {
  .profile-card {
    font-size: 0.9rem;
  }
}
</style>
