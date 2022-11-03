//variable nav de valeur 0.
let nav = 0;
//variable clique de valeur null.
let clicked = null;
//variable événements : initialisation d'un tableau vide dont les données seront stockées.
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
//variable weekdays : initialisation de la variable semaineJour regroupant un tableau de caractères représentant les jour de la semaines
const weekdays = ['Dimanche', 'Lundi', 'Mardi', 'Mecredi', 'Jeudi', 'Vendredi', 'Samedi'];
//variable calendar : récupère la valeur de l'ID calendar
const calendar = document.getElementById('calendar');

//fonction qui récupère la date et l'heure actuelle .
function load(){
    //invocation du constructeur New Date() qui renvoi un objet Date.
    const dt = new Date();
    //récupère le jour courant du mois(en temps local)
    const day= dt.getDate();
    //récupère le mois courant (en temps local)
    const month = dt.getMonth();
    //récupère l'année courante (en temps local)
    const  year= dt.getFullYear();
    //affiche le jour/mois/date en valeur numérique dans la console
    console.log(day,'/',month,'/',year);


}
//appelle la fonction load
load();