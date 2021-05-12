<template>
  <div>
    <header class="search"></header>
    <div class="table">
      <table>
        <tr class="head">
          <th class="th1">Numéro</th>
          <th class="th2">Nom</th>
          <th class="th3">Crédits</th>
          <th class="th4">Diplôme</th>
        </tr>
        <tr v-for="cours in TableauDBcours" :key="cours.id">
          <td class="first">{{ cours.id }}</td>
          <td class="second">{{ cours.Nom }}</td>
          <td class="third">{{ cours.Credit }}</td>
          <td class="fourth">{{ cours.NomDiplome }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListeCours",
  data() {
    return {
      TableauDBcours: [],
    };
  },
  methods: {
    getCours() {
      fetch("http://localhost:3000/join/coursdiplome")
        .then((res) => res.json())
        .then((data) => {
          this.TableauDBcours = data;
        });
    },
  },

  created() {
    this.getCours();
  },
};
</script>
<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  border-collapse: collapse;
}
/* Toutes les cases du tableau */
th, td {
  border: 1px solid black;
}
/* Les champs du tableau */
th {
  margin-left: 1rem;
  text-align: center;
  height: 35px;
}
td {
  text-align: left;
  padding-left: 10px;
  border-bottom: 1px solid grey;
  height: 40px;
}
tr:nth-child(even) {
  background: #dddddd;
}
/* Les colonnes du tableau */
.th1,
.first {
  width: 15%;
}
.th3,
.third {
  width: 15%;
}
.th4,
.fourth {
  width: 25%;
}
</style>