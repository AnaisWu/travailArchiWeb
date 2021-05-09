import { createRouter, createWebHistory } from "vue-router";
import ListeEtudiants from "../views/ListeEtudiants";
import ListeCours from "../views/ListeCours";
import ListeDiplomes from "../views/ListeDiplomes";
import FormulaireEtudiant from "../views/FormulaireEtudiant";
import AjoutEtudiant from "../views/AjoutEtudiant";

const routes = [
    {
        path: "/",
        name: "ListeEtudiants",
        component: ListeEtudiants,
    },
    {
        path: "/etudiant/ajout",
        name: "AjoutEtudiant",
        component: AjoutEtudiant,
    },
    {
        path: "/diplome",
        name: "ListeDiplomes",
        component: ListeDiplomes,
    },
    {
        path: "/cours",
        name: "ListeCours",
        component: ListeCours,
    },
    {
        path: "/etudiant/:id",
        name: "FormulaireEtudiant",
        component: FormulaireEtudiant,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
