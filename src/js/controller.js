// f1 api https://documenter.getpostman.com/view/11586746/SztEa7bL#0ea5c425-c116-47e5-a83f-64f0a39a10db
import { moreDataConstructors, moreDataCircuits } from './data';
import * as model from './model.js';
import constructorsView from './Views/constructorsView';
import standingsView from './Views/standingsView';
import circuitView from './Views/circuitView';
import progress from './Views/circuitViewProgressBar';
import NewWindowView from './Views/circuitWindowView';
const btnSlideRight = document.querySelector('.slider__btn--right');
const btnSlideLeft = document.querySelector('.slider__btn--left');
const arrowLeft = document.querySelector('.paginate.left ');
const arrowRight = document.querySelector('.paginate.right');
let curSlide = 0;
let maxSlides;
let sortedColumn = null;
let allDriversPodiumData = [];

//// SECTION 2 - STANDINGS

//Control Drivers and Standings Data

const controlStandings = async function (data = model.state.driversData) {
  const dataStandings = await model.getStandingsData(data);
  standingsView.clear();
  dataStandings.sort((a, b) => b[0] - a[0]);
  // console.log(dataStandings);
  dataStandings.forEach(data => standingsView.render(data));
};

//Control Constructors Data
const controlConstructors = async function (
  data = model.state.constructorData
) {
  const dataConstructors = await model.getConstructorsData(data);
  console.log(dataConstructors);

  dataConstructors.forEach(data => constructorsView.render(data));
  model.state.constructorsSlides = constructorsView.allElements;
};

//Control SlideDisplay
const controlNextSlide = function () {
  maxSlides = model.state.constructorsSlides.length - 1;
  constructorsView.parentElement.removeChild(
    model.state.constructorsSlides[curSlide]
  );
  if (curSlide === maxSlides) {
    curSlide = 0;
  } else curSlide++;
  constructorsView.parentElement.append(
    model.state.constructorsSlides[curSlide]
  );
};
const controlPreviousSlide = function () {
  maxSlides = model.state.constructorsSlides.length - 1;
  constructorsView.parentElement.removeChild(
    model.state.constructorsSlides[curSlide]
  );
  if (curSlide === 0) {
    curSlide = maxSlides;
  } else curSlide--;
  constructorsView.parentElement.append(
    model.state.constructorsSlides[curSlide]
  );
};

//Control Circuits Data + Display Circuits

const controlCircuits = async function () {
  model.state.circuitData.data = await model.getCircuits();
  circuitView.render(model.getCircuitPage());
  console.log(model.state);
  circuitView.renderProgressBar(model.state);
  circuitView.renderFirstArrow(model);
  controlCircuitAddEvents();
};
const controlCircuitAddEvents = function () {
  arrowRight.addEventListener('click', function () {
    circuitView.renderNextCircuits(model);
  });
  arrowLeft.addEventListener('click', function () {
    circuitView.renderPreviousCircuits(model);
  });
};

// const controlCircuitWindow = function () {
//   NewWindowView.render(model.state.circuitData[1]);
//   console.log(model.state);
//   const moreCircuitData = model.moreDataCircuits.find(
//     element => element.circuitId === model.state.circuitData.circuitId
//   );
//   console.log(moreCircuitData);
// };
// document
//   .querySelector('.section__3--title')
//   .addEventListener('click', function () {
//     controlCircuitWindow();
//   });
const init = function () {
  window.onload = model.getConstructors();
  standingsView.addHandlerStandings(controlStandings);
  constructorsView.addHandlerConstructors(controlConstructors);
  btnSlideRight.addEventListener('click', controlNextSlide);
  btnSlideLeft.addEventListener('click', controlPreviousSlide);
  circuitView.addHandlerCircuits(controlCircuits);
};
init();

// //// SECTION 3 - CIRCUITS AND  RESULTS

// //Fetch CIRCUITS DATA
// //Fetch RESULTS FOR ALL RACES IN CURRENT YEAR

// const getResults = async function () {
//   const response = await fetch(RESULTS_URL);
//   const dataResult = await response.json();
//   const results = dataResult.MRData.RaceTable;
//   return results;
// };

// //POP NEW WINDOW WITH RESULTS AND INFORAMTIONS ABOUT SPECIFIC CIRCUIT

// const displayCircuits = function (parm) {
//   // console.log(parm);
//   setTimeout(() => {
//     setRaceResults(parm);
//   }, 500);
// };

// //SETTING RACE RESULTS

// const getResultsData = function (circuit) {
//   const results = getResults();
//   const currentRound = results.then(data => {
//     const allRaces = data.Races;
//     const element = allRaces.find(
//       element => element.Circuit.circuitId === circuit.circuitId
//     );
//     // console.log(element);
//     return element;
//   });
//   const thisR = currentRound;
//   return thisR;
// };

// //DISPLAY RESULTS

// const displayResults = function (circuit) {
//   const data = getResultsData(circuit);
//   return data;
// };

// //IMPLEMENT RACE RESULTS IN THE NEW PAGE

// const setRaceResults = function (circuit) {
//   let raceResults = [];
//   const thisRaceData = displayResults(circuit);
//   thisRaceData.then(data => {
//     raceResults = data.Results;
//     // console.log(raceResults);
//     if (raceResults) setNewPage(circuit, raceResults);
//     else setNewPage(circuit);
//     createCircuitSection(circuit);
//   });
// };

// const section3 = document.querySelector('.section__3--title');

// //PREPARE THE NEW PAGE WITH CIRCUTI AND RACE DATA

// const setNewPage = function (circuit, raceResults) {
//   createNewWindow(circuit, raceResults);
//   document.querySelector('.section--3--data').scrollIntoView();
// };

// //CREATE HTML TO IMPLEMENT IN THE NEW PAGE

// const createNewWindow = function (circuit, raceResults) {
//   const opened = window.open('', '_self');
//   opened.document.writeln(`
//   <html>
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//     <link rel="stylesheet" href="index.css" />
//     <title>${circuit.circuitName}</title>
//   </head>
//   <body>
//   <section class = "section--3--data">

//   <div class="bg-image--1"></div>
//   <div class = "circuit-information">
//     <div class = "section__3--title--window"> ${circuit.circuitName} GRAND PRIX</div>
//     <div class = "section__3--container">

//    <img
//       src = "circuits/${circuit.circuitId}.png"
//       class = "circuit-track"
//       height = 400px
//       alt = "Circuit - ${circuit.circuitName}"
//     />
//     <table class = "section--3--window-table">
//     </table>
//     </div>
//     </div>
//     <button onClick = "goBack()">Go Back</button>
//   </section>
//     <section class = "section--3--results">

//     </section>

//   </body>
//   </html>`);
//   const placeholder = document.querySelector('.section--3--results');
//   extractResultsPromise(raceResults, placeholder);
// };

// //SSETTING DATA FOR DE CIRCUIT SECTION

// const createCircuitSection = function (circuit) {
//   const moreData = moreDataCircuits.find(
//     element => element.circuitId === circuit.circuitId
//   );
//   const { circuitLenght, firstGP } = moreData;
//   const { country, locality } = circuit.Location;
//   const tableCaps = [
//     'Circuit Name',
//     'Country',
//     'City',
//     'Circuit Lenght',
//     'First GP',
//   ];
//   const dataCap = [
//     circuit.circuitName,
//     country,
//     locality,
//     circuitLenght,
//     firstGP,
//   ];
//   appendCircuits(tableCaps, dataCap);
// };

// //Build the popup for each Driver in Top
// const extractResultsPromise = function (raceResults, placeholder) {
//   raceResults.splice(3);
//   raceResults.forEach(result => {
//     const { constructorId } = result.Constructor;
//     const { givenName, familyName, permanentNumber, driverId } = result.Driver;
//     const { grid, laps, points, position } = result;
//     const { time } = result.Time;
//     const podiumPlace =
//       position == 1 ? 'WINNER' : position == 2 ? 'SECOND' : 'THIRD';
//     const finishPlace = document.createElement('div');
//     finishPlace.innerHTML = podiumPlace;
//     finishPlace.classList.add('finish-place');
//     const place = document.createElement('div');
//     place.appendChild(finishPlace);
//     place.classList.add('place');
//     place.setAttribute('id', `place-${position}`);
//     place.style.borderColor = `var(--color-${constructorId})`;
//     const image = document.createElement('img');
//     image.src = `images/${driverId}.png`;
//     image.classList.add('driver-image-result');
//     const driverInfo = document.createElement('div');
//     driverInfo.innerHTML = `${givenName} ${familyName} <br> ${permanentNumber}`;
//     driverInfo.style.color = `var(--color-${constructorId})`;
//     const popup = document.createElement('div');
//     popup.classList.add('popup-driver');
//     popup.style.display = 'none';
//     popup.style.borderColor = `var(--color-${constructorId})`;
//     displayPopUp(place, popup);
//     popup.innerHTML = `Grid-position ${grid}${
//       grid == 1 ? 'st' : grid == 2 ? 'nd' : grid == 3 ? 'rd' : 'th'
//     } <br> Laps ${laps} <br> Points ${points} <br> Time ${time}`;
//     place.appendChild(image);
//     place.appendChild(driverInfo);
//     place.appendChild(popup);

//     placeholder.appendChild(place);
//   });
// };

// //Display Popup window for each driver in Top 3
// const displayPopUp = function (place, popup) {
//   place.onmouseover = function () {
//     popup.style.display = '';
//   };
//   place.onmouseout = function () {
//     popup.style.display = 'none';
//   };
// };
// //helper functions
// const goBack = function () {
//   window.history.go(0);
// };

// const appendCircuits = function (data, values) {
//   const x = document.querySelector('.section--3--window-table');
//   for (let i = 0; i < data.length; i++) {
//     const newRow = document.createElement('tr');

//     const cell = document.createElement('td');

//     const dataCell = document.createElement('td');
//     cell.innerHTML = data[i];
//     if (cell.innerHTML === 'Circuit Lenght') {
//       dataCell.innerHTML = `${values[i]} km`;
//     } else dataCell.innerHTML = values[i];
//     newRow.appendChild(cell);
//     newRow.appendChild(dataCell);
//     newRow.classList.add('.row-table-circuits');
//     x.appendChild(newRow);
//   }
// };

// const getToSpecificSection = function () {
//   const championship = document.getElementById('#section--3--btn');
//   const constructors = document.getElementById('#section--2--btn');
//   const standings = document.getElementById('#section--1--btn');
//   championship.addEventListener('click', function () {
//     document
//       .querySelector('.section__section--3')
//       .scrollIntoView({ behavior: 'smooth' });
//   });
//   constructors.addEventListener('click', function () {
//     document
//       .querySelector('.section__section--2')
//       .scrollIntoView({ behavior: 'smooth' });
//   });
//   standings.addEventListener('click', function () {
//     document
//       .querySelector('.section__section--1')
//       .scrollIntoView({ behavior: 'smooth' });
//   });
// };
// getToSpecificSection();

//SORT TABLE BY POINTS NUMBER
//Sort elements in Standings TABLE

// const resetSort = () => {
//   if (sortedColumn) {
//     sortedColumn.element.removeChild(sortedColumn.element.lastChild);
//     sortedColumn = null;
//   }
// };

// const sortTable = (element, sortColumn) => {
//   console.log(sortColumn);
//   if (!sortedColumn) {
//     element.appendChild(document.createTextNode('↑'));
//     sortedColumn = { name: sortColumn, type: 'asc', element };
//   } else if (sortedColumn.name === sortColumn) {
//     if (sortedColumn.type === 'asc') {
//       sortedColumn.type = 'desc';
//       element.removeChild(element.lastChild);
//       element.appendChild(document.createTextNode('↓'));
//     } else {
//       sortedColumn.type = 'asc';
//       element.removeChild(element.lastChild);
//       element.appendChild(document.createTextNode('↑'));
//     }
//   } else {
//     sortedColumn.element.removeChild(sortedColumn.element.lastChild);
//     element.appendChild(document.createTextNode('↑'));
//     sortedColumn = { name: sortColumn, type: 'asc', element };
//   }
// };
