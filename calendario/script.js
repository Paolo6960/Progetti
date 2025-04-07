//manipolazione DOM, selezione degli elementi html
const monthName = document.querySelector("#month-name");
const dates = document.querySelector("#dates");
const daysContainer = document.querySelector(".days");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

//oggetto Date, rappresenta la data corrente e servirà per calcolare il mese e l'anno
let currentDate = new Date();

function generateCalendar() {
  const month = currentDate.getMonth(); //restituisce mese corrente (numerato da 0 a 11, 0 = gennaio, 1 = febbraio...)
  const year = currentDate.getFullYear(); //restituisce l'anno corrente

  const firstDay = new Date(year, month, 1).getDay(); //new Date(year, month, 1) rappresenta il primo giorno del mese, mentre getDay() restituisce il giorno della settimana del primo giorno del mese (0 = domenica, 1 = lunedì)
  const lastDate = new Date(year, month + 1, 0).getDate(); //new Date(year, month + 1, 0) rappresenta l'ultimo giorno del mese

  //array dei giorni della settimana
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

  //restituisce una stringa formatta con il nome del mese e l'anno utilizzando la localizzazione italiana
  monthName.textContent = currentDate.toLocaleDateString("it-IT", {
    month: "long",
    year: "numeric",
  });

  //ciclo che crea i giorni della settimana, iterando l'array daysOfWeek crea un div per ogni giorno e l'aggiunge al container
  daysContainer.innerHTML = ""; //svuota il container ponendo stringa vuota
  for (const day of daysOfWeek) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    daysContainer.appendChild(dayElement);
  }

  //ciclo che crea i div vuoti per rappresentare i giorni antecedenti al primo giorno effettivo del mese
  dates.innerHTML = ""; //svuota il container ponendo stringa vuota
  for (let i = 0; i < firstDay; i++) {
    const emptyElement = document.createElement("div");
    emptyElement.classList.add("empty");
    dates.appendChild(emptyElement);
  }

  //ciclo che crea div per ogni giorno del mese (da 1 a lastDate)
  for (let day = 1; day <= lastDate; day++) {
    const dateElement = document.createElement("div");
    dateElement.textContent = day;
    dates.appendChild(dateElement);
  }
}

//navigation mesi
//precedente
previous.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
});

//successivo
next.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
});

//init function
generateCalendar();
