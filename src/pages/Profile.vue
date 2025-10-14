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

          <v-card-actions class="profile-actions">
            <v-btn
              small
              color="primary"
              class="profile-btn"
              @click="$router.push('/home')"
            >
              BACK TO HOME
            </v-btn>
            <v-btn
              small
              color="primary"
              class="profile-btn"
              @click="logout"
            >
              LOGOUT
            </v-btn>
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
.profile-card {
  padding: 6px;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
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
  gap: 1.2rem;
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

/* Buttons styled like "VIEW DETAILS" */
.profile-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 1rem;
}

.profile-btn {
  text-transform: uppercase;
  font-weight: 600;
  color: white !important;
  background-color: #1976d2 !important;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 8px 18px;
}

.profile-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(25, 118, 210, 0.3);
  background-color: #1565c0 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-card {
    font-size: 0.9rem;
  }

  .profile-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
