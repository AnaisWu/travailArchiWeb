<template>
  <div class="page">
    <header class="search">
      <input
        class="input"
        v-on:input="BarreRecherche($event)"
        placeholder="Chercher le nom d'un étudiant ..."
      />
    </header>
    <div class="table">
      <table>
        <tr class="head">
          <th class="th1">Matricule</th>
          <th class="th2">Nom</th>
          <th class="th3">Diplôme</th>
          <th class="th4">Total crédits</th>
          <th class="th5"></th>
          <th class="th6"></th>
        </tr>
        <tr
          class="startTable"
          v-for="(chaqueétudiant, index) in TableauEtudiants"
          :key="chaqueétudiant.MatriculeEtudiant"
        >
          <td class="first">{{ chaqueétudiant.MatriculeEtudiant }}</td>
          <td class="second">{{ chaqueétudiant.Nom }}</td>
          <td class="third">{{ chaqueétudiant.NomDiplome }}</td>
          <td class="fourth">{{ chaqueétudiant.TotalCredit }}</td>
          <td class="fifth" @click="etudiantDetailles(TableauEtudiants[index])">
            <i class="details far fa-edit"></i>
          </td>
          <td class="sixth" @click="supprimerEtudiant(TableauEtudiants[index])">
            <i class="fas fa-times"></i>
          </td>
        </tr>
      </table>
    </div>

    <div class="FiltreDiplome">
      <select @change="filtre($event)" name="filtre" id="filtre">
        <option value="all">All</option>
        <option
          :value="chaqueDiplome.NomDiplome"
          v-for="chaqueDiplome in FiltreDiplomes"
          :key="chaqueDiplome.id"
        >
          {{ chaqueDiplome.NomDiplome }}
        </option>
      </select>
    </div>
    <router-link class="link" to="/etudiant/ajout">
      <div class="bouton">
        <button class="BoutonAjouter">Ajouter</button>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListeEtudiants",
  data() {
    return {
      TableauDBétudiants: [],
      TableauEtudiants: [],
      FiltreDiplomes: [],
    };
  },
  methods: {
    etudiantDetailles(etudiant) {
      this.$router.push(`/etudiant/${etudiant.MatriculeEtudiant}`);
    },
    getEtudiant() {
      fetch("http://localhost:3000/join")
        .then((res) => res.json())
        .then((data) => {
          this.TableauDBétudiants = data;
          this.TableauEtudiants = data;
        });
    },
    getDiplome() {
      fetch("http://localhost:3000/diplome")
        .then((res) => res.json())
        .then((data) => {
          this.FiltreDiplomes = data;
        });
    },
    supprimerEtudiant(etudiant) {
      if (confirm("Voulez-vous supprimer l'élève")) {
        axios
          .delete(
            "http://localhost:3000/etudiants/" + etudiant.MatriculeEtudiant
          )
          .then(
            (res) =>
              (this.TableauEtudiants = this.TableauEtudiants.filter(
                (donnéeTableau) =>
                  donnéeTableau.MatriculeEtudiant !== etudiant.MatriculeEtudiant
              ))
          )
          .catch((err) => console.log(err));
      }
    },
    filtre(event) {
      if (event.target.value == "all") {
        this.TableauEtudiants = this.TableauDBétudiants;
      } else {
        this.TableauEtudiants = this.TableauDBétudiants.filter(
          (etudiant) => etudiant.NomDiplome == event.target.value
        );
      }
    },
    BarreRecherche(input) {
      this.TableauEtudiants = this.TableauDBétudiants.filter((etudiant) =>
        etudiant.Nom.toLowerCase().includes(input.target.value.toLowerCase())
      );
    },
  },
  created() {
    this.getEtudiant();
    this.getDiplome();
  },
};
</script>

<style scoped>
:root {
  --main-color: rgba(245, 245, 245);
  --main-color-darker: rgba(245, 245, 245, 0.3);
}

/* Blocs grid */
.page {
  display: grid;
  width: 100%;
  grid-template-areas: 
            "head head"
            "tbl filtre"
            "tbl bouton";
  justify-content: center;
  margin-bottom: 10%;
}
.page > header {
  grid-area: head;
}
.page > .table {
  grid-area: tbl;
}
.page > .FiltreDiplome {
  grid-area: filtre;
  position: fixed;
}
.page > .link {
  grid-area: bouton;
}

.search {
  display: flex;
  justify-content: center;
  padding: 50px 0px 100px 0px;
  background: whitesmoke;
  position: fixed;
  width: 100%;
  margin-top: -55px;
}
.input {
  width: 80%;
  height: 30px;
}

/* Tableau */
.table {
  padding-top: 150px;
} 
table {
  padding-top: 5vh;
  width: 80vw;
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
  height: 25px;
}
tr:nth-child(even) {
  background: #dddddd;
}
/* Taille des colonnes */
.th1,
.first {
  width: 15%;
}
.th3,
.third {
  width: 30%;
}
.th4,
.fourth {
  width: 15%;
}
.fifth,
.sixth {
  text-align: center;
  cursor: pointer;
  width: auto;
  padding: 10px 0px;
  margin: 0px 10px;
}

/* Filtre */
.FiltreDiplome {
  background: whitesmoke;
  position: absolute;
  top: 25%;
  right: 10%;
}

/* Bouton Ajouter */
.link {
  color: black;
}
.BoutonAjouter {
  font-style: none;
  cursor: pointer; 
  padding: 8px 20px;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid gray;
}

/* Icones détails & suppression */
.details,
.fas {
  padding: 5px 10px;
}
.fas:hover {
  color: red;
}
.details:hover {
  color: blue;
}

@media (max-width: 650px) {
  .BoutonAjouter {
    max-width: 50px;
    padding: 3px 5px;
    font-size: smaller;
  }
  .th3, .third {
    width: 25%;
  }
}
</style>