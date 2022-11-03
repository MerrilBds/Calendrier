//variable nav de valeur 0.
let nav = 0;
//variable clique de valeur null.
let clicked = null;
//variable événements : initialisation d'un tableau vide dont les données seront stockées.
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
//variable weekdays : initialisation de la variable semaineJour regroupant un tableau de caractères représentant les jour de la semaines
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//variable calendar : récupère la valeur de l'ID calendar
const calendar = document.getElementById('calendar');

//fonction qui récupère la date et l'heure actuelle .
function load(){
    const dt = new Date();
    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }
    //récupère le jour courant du mois(en temps local)
    const day = dt.getDate();
    //récupère le mois courant (en temps local)
    const month = dt.getMonth();
    //récupère l'année courante (en temps local)
    const  year= dt.getFullYear();
    //invocation du constructeur New Date() qui renvoi le premier jour du mois de l'année courante
    const firstDayOfMonth = new Date(year, month, 1);
    //invocation du constucteur New Date() qui renvoi le dernier jour   du mois de l'année courante.
    const daysInMonth = new Date(year,month + 1, 0).getDate();
    //affiche le premier jour du mois de l'année courante
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    // variable paddingDays qui retourne le nombre de jour dans une semaine sans compter les weekend
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

    //parcours le calendrier pour afficher le chiffre exacte à son jour correspondant en fonction du mois 
    for(let i =1; i <= paddingDays + daysInMonth; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if(i > paddingDays){
            daySquare.innerText = i - paddingDays;

            daySquare.addEventListener('click', () => console.log('click'));
        }else{
            daySquare.classList.add('padding');
        }
          calendar.appendChild(daySquare);
        }
    }
    function initButtons() {
        document.getElementById('nextButton').addEventListener('click', () => {
          nav++;
          load();
        });
      
        document.getElementById('backButton').addEventListener('click', () => {
          nav--;
          load();
        });
    }
//appelle la fonction load
load();
initButtons();
