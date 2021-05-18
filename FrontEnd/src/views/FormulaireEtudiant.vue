<template>
  <div class="body">
    <div class="container">
      <!-- @submit = à l'envoie -->
      <form @submit="editerEtudiant" class="btnAjouter">
        <div class="champs">
          <label>Matricule</label>
          <input
            class="desactive"
            type="text"
            v-model="matricule"
            name="text"
            placeholder="Matricule"
            disabled="true"
          />
          <!-- disabled = non-modifiable -->
        </div>
        <div class="champs">
          <label>Nom</label>
          <input type="text" v-model="nom" name="nom" placeholder="Nom" />
          <p class="erreur">{{ erreurNom }}</p>
        </div>
        <div class="champs">
          <label>Sexe</label>
          <select class="ListeDeroul" name="sexe" v-model="sexe">
            <option value="M">Homme</option>
            <option value="F">Femme</option>
          </select>
        </div>
        <div class="champs">
          <label>Diplome</label>
          <select
            class="ListeDeroul"
            v-model="diplome.id"
            name="diplome"
            placeholder="Diplome"
          >
            <option
              :key="chaqueDiplome.id"
              v-for="chaqueDiplome in diplomes"
              :value="chaqueDiplome.id"
            >
              {{ chaqueDiplome.NomDiplome }}
            </option>
          </select>
        </div>
        <div class="champs">
          <label>Telephone</label>
          <input
            type="text"
            v-model="telephone"
            name="telephone"
            placeholder="Telephone"
          />
          <p class="erreur">{{ erreurTelephone }}</p>
        </div>
        <div class="champs">
          <label>Date de Naissance (Format : dd/mm/yyyy)</label>
          <input
            type="text"
            v-model="naissance"
            name="date de naissance"
            placeholder="Birthday"
          />
        </div>
        <p class="erreur">{{ erreurDateNaissance }}</p>
        <div class="group-button">
          <button @click="goBack()" class="btn btn-block first">Annuler</button>
          <button class="btn btn-block second">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "FormulaireEtudiant",
  data() {
    return {
      matricule: "",
      nom: "",
      sexe: "",
      diplome: {},
      telephone: "",
      naissance: "",


      diplomes: [],

      //erreur
      erreurNom: "",
      erreurTelephone: "",
      erreurDateNaissance: "",
    };
  },
  methods: {
    goBack(e) {
      this.$router.push("/");
    },
    getDiplome() {
      fetch("http://localhost:3000/diplome")
        .then((res) => res.json())
        .then((data) => {
          this.diplomes = data;
        });
    },
    getEtudiant() {
      fetch("http://localhost:3000/etudiants/" + this.$route.params.id)
        .then((res) => res.json())
        .then((data) => {
          this.matricule = data[0].MatriculeEtudiant;
          this.nom = data[0].Nom;
          this.telephone = data[0].NumTelephone;
          this.naissance = moment(data[0].dateNaissance).format("DD/MM/yyyy");
          this.sexe = data[0].Sexe;
          fetch("http://localhost:3000/diplome/" + data[0].Diplome) //recherche id diplome ds tableau diplome
            .then((res) => res.json())
            .then((data) => {
              this.diplome = data[0];
            });
        });
    },
    editerEtudiant(e) {
      e.preventDefault();
      var dateséparé = this.naissance.split("/");
      var dateFinale = dateséparé[2] + dateséparé[1] + dateséparé[0];
      var reg = /^\d+$/;
      if (this.nom == "") {
        return (this.erreurNom = "Veuillez entrer le Nom");
      }
      if (this.telephone.length != 10) {
        return (this.erreurTelephone = "Il faut 10 numéro");
      }
      if (reg.test(this.telephone) == false) {
        return (this.erreurTelephone = "Que des numéros svp");
      }
      var étudiant = {
        Nom: this.nom,
        Sexe: this.sexe,
        Diplome: this.diplome.id,
        dateNaissance: dateFinale,
        NumTelephone: this.telephone,
      };
      axios
        .put("http://localhost:3000/etudiants/" + this.matricule, étudiant)
        .then((res) => this.$router.push("/"))
        .catch((err) => {
          if (err) {
            if (err.response.data.sqlMessage.includes("Incorrect date value")) {
              this.erreurDateNaissance =
                "Format incorrect , exemple 01/01/1990";
            }
          }
        });
    },
  },
  created() {
    this.getDiplome();
    this.getEtudiant();
  },
};
</script>

<style scoped>

/* La page du site */
.container {
  max-width: 450px;
  margin: 0px auto;
  min-height: 300px;
  padding: 30px;
  border-radius: 5px;
}

/* Les boutons */
.btn {
  display: inline-block;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}

.btnAjouter {
  margin-bottom: 40px;
}

/* Les champs formulaire */
.champs {
  margin: 20px 0;
}
.champs label {
  display: block;
}
.champs input,
.ListeDeroul {
  width: 100%;
  height: 30px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.ListeDeroul {
  width: 104% !important;
}

.group-button {
  display: flex;
  justify-content: center;
  margin-left: 2rem;
}

.first, .second {
  background: #000;
}

/* Messages de réussite/ erreur */
.ajout {
  display: flex;
  justify-content: center;
}
.erreur {
  color: red;
  margin-left: 10px;
}
</style>