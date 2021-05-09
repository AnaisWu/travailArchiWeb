<template>
  <div class="body">
    <div class="container">
      <form @submit="ajouterEtudiant" class="add-form">
        <div class="form-control">
          <label>Nom</label>
          <input type="text" name="nom" placeholder="Nom" v-model="nom" />
          <p class="erreur">{{ erreurNom }}</p>
        </div>
        <div class="form-control">
          <label>Sexe</label>
          <select class="liste" name="sexe" v-model="sexe">
            <option value="M">Homme</option>
            <option value="F">Femme</option>
          </select>
          <p class="erreur">{{ erreurSexe }}</p>
        </div>
        <div class="form-control">
          <label>Diplome</label>
          <select class="liste" name="diplome" v-model="diplome">
            <option
              :key="chaqueDiplome.id"
              v-for="chaqueDiplome in diplomes"
              :value="chaqueDiplome.id"
            >
              {{ chaqueDiplome.NomDiplome }}
            </option>
          </select>
          <p class="erreur">{{ erreurDiplome }}</p>
        </div>
        <div class="form-control">
          <label>Telephone</label>
          <input
            type="text"
            name="telephone"
            placeholder="Telephone"
            v-model="numTelephone"
          />
          <p class="erreur">{{ erreurTelephone }}</p>
        </div>
        <div class="form-control">
          <label>Date de Naissance (Format : dd/mm/yyyy)</label>
          <input
            type="text"
            name="date de naissance"
            placeholder="Birthday"
            v-model="dateNaissance"
          />
        </div>
        <p class="erreur">{{ erreurDateNaissance }}</p>
        <div class="group-button">
          <button @click="goBack()" class="btn btn-block first">Annuler</button>
          <button type="submit" class="btn btn-block second">
            Enregistrer
          </button>
        </div>
      </form>
      <h3 class="ajout">{{ réussi }}</h3>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "FormulaireEtudiant",
  data() {
    return {
      nom: "",
      sexe: "",
      dateNaissance: "",
      numTelephone: "",
      diplome: "",
      diplomes: [],
      réussi: "",

      //erreur
      erreurNom: "",
      erreurTelephone: "",
      erreurSexe: "",
      erreurDiplome: "",
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
          console.log(data);
          this.diplomes = data;
        });
    },
    ajouterEtudiant(e) {
      e.preventDefault();

      var dateséparé = this.dateNaissance.split("/");
      var dateFinale = dateséparé[2] + dateséparé[1] + dateséparé[0];
      var reg = /^\d+$/;
      if (this.nom == "") {
        return (this.erreurNom = "Veuillez entrer le Nom");
      }
      if (this.sexe == "") {
        return (this.erreurSexe = "Veuillez entrer le sexe");
      }
      if (this.diplome == "") {
        return (this.erreurDiplome = "Choisissez un diplome");
      }
      if (this.numTelephone.length != 10) {
        return (this.erreurTelephone = "Il faut 10 numéro");
      }
      if (reg.test(this.numTelephone) == false) {
        return (this.erreurTelephone = "Que des numéros svp");
      }
      var étudiant = {
        Nom: this.nom,
        Sexe: this.sexe,
        Diplome: this.diplome,
        dateNaissance: dateFinale,
        NumTelephone: this.numTelephone,
      };
      axios
        .post("http://localhost:3000/etudiants", étudiant)
        .then(() => {
          this.nom = "";
          this.sexe = "";
          this.diplome = "";
          this.dateNaissance = "";
          this.numTelephone = "";
          this.réussi = "Etudiant Ajouté";
          //erreur
          this.erreurNom = "";
          this.erreurTelephone = "";
          this.erreurSexe == "";
          this.erreurDiplome = "";
          this.erreurDateNaissance = "";

          setTimeout(() => {
            this.réussi = "";
          }, 2000);
        })
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
  },
};
</script>
<style scoped>

.container {
  max-width: 500px;
  margin: 0px auto;
  min-height: 300px;
  padding: 30px;
  border-radius: 5px;
}
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

.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input,
.liste {
  width: 100%;
  height: 30px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
.liste {
  width: 104% !important;
}

.group-button {
  display: flex;
  justify-content: center;
  margin-left: 2rem;
}

.first {
  background: #000;
}

.second {
  background: #000;
}

.ajout {
  display: flex;
  justify-content: center;
}

.erreur {
  color: red;
  margin-left: 10px;
}
</style>