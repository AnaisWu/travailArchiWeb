<template>
  <div>
    <Navigateur />
    <div class="element"><router-view></router-view></div>
  </div>
</template>

<script>
import Navigateur from "./components/Navigateur";

export default {
  name: "App",
  components: {
    Navigateur,
  },
};
</script>

<style lang="scss">
html {
  font-family: "Gill Sans", sans-serif;
  background-color: whitesmoke;
}
.element {
  padding-top: 100px;
}
</style>
