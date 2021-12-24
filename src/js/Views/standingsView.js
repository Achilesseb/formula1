class Standings {
  _parentElement = document.querySelector('.table__body');
  _driverParentElement = document.querySelector('.driver__leader');
  addHandlerStandings(handler) {
    document
      .getElementById('#section--1--btn')
      .addEventListener('click', function () {
        console.log('Hello');
        handler();
        document.querySelector('.section__section--1').style.display = 'block';
        document.querySelector('.section__section--1').scrollIntoView();
      });
  }
  clear() {
    this._parentElement.remove();
    this._parentElement = document.createElement('tbody');
    document.querySelector('.tbl__drivers').appendChild(this._parentElement);
  }
  renderDriverPicture(data) {
    if (data.position === 1)
      this._driverParentElement.src = `/images/drivers/${data.id}.png`;
  }
  render(data) {
    this.renderDriverPicture(data);
    console.log(data);
    // if (!document.querySelector('.table__body')) {
    const newRow = document.createElement('tr');
    const text = [
      data.number,
      `${data.name} ${data.family}`,
      data.nation,
      data.team,
      data.points,
      data.wins,
    ];
    text.map(text => {
      const cell = document.createElement('td');
      cell.append(text);
      newRow.appendChild(cell);
    });
    this._parentElement.appendChild(newRow);

    // }
  }
}

export default new Standings();
