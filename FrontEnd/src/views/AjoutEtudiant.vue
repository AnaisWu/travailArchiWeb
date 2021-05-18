<template>
  <div class="body">
    <div class="container">
      <form @submit="ajouterEtudiant" class="btnAjouter">
        <div class="champs">
          <label>Nom</label>
          <input type="text" name="nom" placeholder="Nom" v-model="nom" />
          <p class="erreur">{{ erreurNom }}</p>
        </div>
        <div class="champs">
          <label>Sexe</label>
          <select class="ListeDeroul" name="sexe" v-model="sexe">
            <option value="M">Homme</option>
            <option value="F">Femme</option>
          </select>
          <p class="erreur">{{ erreurSexe }}</p>
        </div>
        <div class="champs">
          <label>Diplôme</label>
          <select class="ListeDeroul" name="diplome" v-model="diplome">
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
        <div class="champs">
          <label>Numéro de téléphone</label>
          <input
            type="text"
            name="telephone"
            placeholder="10 chiffres"
            v-model="numTelephone"
          />
          <p class="erreur">{{ erreurTelephone }}</p>
        </div>
        <div class="champs">
          <label>Date de Naissance</label>
          <input
            type="text"
            name="date de naissance"
            placeholder="dd/mm/yyyy"
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
import axios from "axios";
export default {
  name: "FormulaireEtudiant",
  data() {
    return {
      //Objet étudiant
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
    goBack() {
      // bouton annuler pour repasser sur la page /
      this.$router.push("/");
    },
    getDiplome() {
      fetch("http://localhost:3000/diplome")
        .then((res) => res.json())
        .then((data) => {
          this.diplomes = data;
        });
    },
    ajouterEtudiant(e) {
      e.preventDefault(); // supprimer 'ajout?nom=&telephone=&date+de+naissance=' dans le lien lorsque ajout

      var dateséparé = this.dateNaissance.split("/"); //séparer pour obtenir un tableau
      var dateFinale = dateséparé[2] + dateséparé[1] + dateséparé[0]; // transformer date pour SQL sous format yyyymmdd
      var reg = /^\d+$/; //input que des numéro -> check condition true/ false ligne 122
      if (this.nom == "") {
        return (this.erreurNom = "Veuillez entrer le nom");
      }
      if (this.sexe == "") {
        return (this.erreurSexe = "Veuillez entrer le sexe");
      }
      if (this.diplome == "") {
        return (this.erreurDiplome = "Choisissez un diplôme");
      }
      if (this.numTelephone.length != 10 && this.numTelephone.length !== 0) {
        return (this.erreurTelephone =
          "Le numéro doit être composé de 10 chiffres");
      }
      if (this.numTelephone) {
        if (reg.test(this.numTelephone) == false) {
          return (this.erreurTelephone = "Que des numéros svp");
        }
      }
      var étudiant = {
        Nom: this.nom, // v-model dans html
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
          }, 2000); // disparaitre après 2 sec
        })
        .catch((err) => {
          //rejetée sur base de la condition 'date' et toutes autres erreurs ds SQL
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
/* rslt après clique -> bordure plus gras -> none */
.btn:focus {
  outline: none;
}
/* active = au clique, scale = échelle 1 à 0.98 */
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

.first,
.second {
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
