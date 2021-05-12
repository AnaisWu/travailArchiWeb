<template>
  <nav>
    <router-link class="link" to="/">Etudiant</router-link>
    <router-link class="link" to="/cours">Cours</router-link>
    <router-link class="link" to="/diplome">Diplôme</router-link>
  </nav>
</template>

<script>
export default {
  name: "Navigateur",
  component: {},
};
</script>

<style scoped>
nav {
  padding-left: 5%;
  background-color: #333333;
  height: 45px;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
}
.link {
  cursor: pointer;
  padding: 12px 1rem;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  color: whitesmoke;
}
.link:hover {
  background-color: #181818;
  color: white;
}

</style>