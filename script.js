//variable nav de valeur 0
let nav = 0;
//variable clique de valeur null
let clicked = null;
//variable événements : initialisation d'un tableau vide dont les données seront stockées.
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
//variable weekdays : initialisation de la variable semaineJour regroupant un tableau de caractères représentant les jour de la semaines
const weekdays = ['Dimanche', 'Lundi', 'Mardi', 'Mecredi', 'Jeudi', 'Vendredi', 'Samedi'];
//variable calendar : récupère la valeur de l'ID calendar
const calendar = document.getElementById('calendar');

//fonction qui récupère la date et l'heure actuelle par la variable dt dont on a assigné la valeur de New Date() , le tout est vérifié sur la console.
function load(){
    const dt = new Date();
    console.log(dt)
}

load();