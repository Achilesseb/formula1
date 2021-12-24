class NewWindowView {
  _parentElement = document.querySelector('.section--3--results');
  render(data) {
    console.log(data);
    const opened = window.open('', '_self');
    opened.document.writeln(`
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="index.css" />
        <title>${data.circuitName}</title>
      </head>
      <body>
      <section class = "section--3--data">

      <div class="bg-image--1"></div>
      <div class = "circuit-information">
        <div class = "section__3--title--window"> ${data.circuitName} GRAND PRIX</div>
        <div class = "section__3--container">

       <img
          src = "circuits/${data.circuitId}.png"
          class = "circuit-track"
          height = 400px
          alt = "Circuit - ${data.circuitName}"
        />
        <table class = "section--3--window-table">
        </table>
        </div>
        </div>
        <button onClick = "goBack()">Go Back</button>
      </section>
        <section class = "section--3--results">

        </section>

      </body>
      </html>`);

    // extractResultsPromise(raceResults, placeholder);
  }
}
export default new NewWindowView();
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
