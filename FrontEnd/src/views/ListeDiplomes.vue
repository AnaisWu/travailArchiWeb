<template>
  <div>
    <header class="search"></header>
    <div class="table">
      <table>
        <tr class="head">
          <th class="th1">Numéro</th>
          <th class="th2">Nom</th>
          <th class="th4">Crédits</th>
        </tr>
        <tr :key="diplome.id" v-for="diplome in TableauDBdiplome">
          <td class="first">{{ diplome.id }}</td>
          <td class="second">{{ diplome.NomDiplome }}</td>
          <td class="third">{{ diplome.TotalCredit }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListeDiplomes",
  data() {
    return {
      TableauDBdiplome: [],
    };
  },
  methods: {
    getDiplome() {
      fetch("http://localhost:3000/diplome")
        .then((res) => res.json())
        .then((data) => {
          this.TableauDBdiplome = data;
        });
    },
  },
  created() {
    this.getDiplome();
  },
};
</script>
<style scoped>
table {
  width: 80%;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
/* Toutes les cases du tableau */
th,
td {
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

.th1,
.first {
  width: 15%;
}
.th3,
.third {
  width: 20%;
}

</style>