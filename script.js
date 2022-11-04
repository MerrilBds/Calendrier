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
//variable newEventModal : récupère la valeur de l'ID newEventModal.
const newEventModal = document.getElementById('newEventModal');
//variable deleteEventModal : récupère la valeur de l'ID deleteEventModal.
const deleteEventModal = document.getElementById('deleteEventModal');
//variable backDrop : récupère la valeur de l'ID modalBackDrop.'
const backDrop = document.getElementById('modalBackDrop');
//variable eventTitleInput : récupère la valeur de l'ID eventTitleInput'.
const eventTitleInput = document.getElementById('eventTitleInput');


//fonction qui récupère la date et l'heure actuelle .
function load(){
    const dt = new Date();
    if (nav !== 0) {
      dt.setDate(1) ;
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
    `${dt.toLocaleDateString('fr-fr', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

    //parcours le calendrier pour afficher le chiffre exacte à son jour correspondant en fonction du mois 
    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
    
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    
        if (i > paddingDays) {
          daySquare.innerText = i - paddingDays;
          const eventForDay = events.find(e => e.date === dayString);
    
          if (i - paddingDays === day && nav === 0) {
            daySquare.id = 'currentDay';
          }
    
          if (eventForDay) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = eventForDay.title;
            daySquare.appendChild(eventDiv);
          }
    
          daySquare.addEventListener('click', () => openModal(dayString));
        } else {
          daySquare.classList.add('padding');
        }
    
        calendar.appendChild(daySquare);    
      }
    }

    //fonction qui rentre pour arguments la date qui lie la date à son évènements
    function openModal(date) {
        clicked = date;
      
        const eventForDay = events.find(e => e.date === clicked);
      
        if (eventForDay) {
          document.getElementById('eventText').innerText = eventForDay.title;
          deleteEventModal.style.display = 'block';
        } else {
          newEventModal.style.display = 'block';
        }
      
        backDrop.style.display = 'block';
      }

    function closeModal() {
        eventTitleInput.classList.remove('error');
        newEventModal.style.display = 'none';
        deleteEventModal.style.display = 'none';
        backDrop.style.display = 'none';
        eventTitleInput.value = '';
        clicked = null;
        load();
      }
      //fonction qui sauvegarde la valeur des événements
      function saveEvent() {
        if (eventTitleInput.value) {
          eventTitleInput.classList.remove('error');
      
          events.push({
            date: clicked,
            title: eventTitleInput.value,
          });
      
          localStorage.setItem('events', JSON.stringify(events));
          closeModal();
        } else {
          eventTitleInput.classList.add('error');
        }
      }
      //fonction qui supprime l'évènement
      function deleteEvent() {
        events = events.filter(e => e.date !== clicked);
        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
      }

       //fonction qui instancie les boutons back et next
       function initButtons() {
        document.getElementById('nextButton').addEventListener('click', () => {
          nav++;
          load();
        });
      
        document.getElementById('backButton').addEventListener('click', () => {
          nav--;
          load();
        });
      
        document.getElementById('saveButton').addEventListener('click', saveEvent);
        document.getElementById('cancelButton').addEventListener('click', closeModal);
        document.getElementById('deleteButton').addEventListener('click', deleteEvent);
        document.getElementById('closeButton').addEventListener('click', closeModal);
      }
   
//appelle la fonction load
load();
initButtons();
