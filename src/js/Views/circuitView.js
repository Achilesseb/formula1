import progress from './circuitViewProgressBar';
class CircuitView {
  _topLevelElement = document.querySelector('.section__3--results');
  _parentElement = document.querySelector('.results--round');

  addHandlerCircuits(handler) {
    document
      .getElementById('#section--3--btn')
      .addEventListener('click', function () {
        handler();
        document.querySelector('.section__section--3').style.display = 'block';
        document.querySelector('.section__section--3').scrollIntoView();
      });
  }
  _clear() {
    this._parentElement.remove();
    this._parentElement = document.createElement('tr');
    this._parentElement.classList.add('results--round');
    this._topLevelElement.append(this._parentElement);
  }
  renderProgressBar(data) {
    progress(
      data.circuitData.data.length,
      data.circuitData.resultsPerPage,
      data.circuitData.page
    );
  }

  renderNextCircuits(data) {
    let maxPages = data.state.circuitData.numberOfPages;
    this._clear();
    if (data.state.circuitData.page === maxPages) {
      data.state.circuitData.page = maxPages;
    } else {
      document.querySelector('.paginate.left').setAttribute('data-state', '');
      data.state.circuitData.page++;
      document
        .querySelector('.paginate.right')
        .setAttribute(
          'data-state',
          data.state.circuitData.page === maxPages ? 'disabled' : ''
        );
    }
    document.querySelector('.paginate.left').setAttribute('data-state', '');
    this.render(data.getCircuitPage(data.state.circuitData.page));
    document.querySelector('.progress-bar').style.width =
      (90 /
        (data.state.circuitData.data.length /
          data.state.circuitData.resultsPerPage)) *
        data.state.circuitData.page +
      '%';
  }
  renderPreviousCircuits(data) {
    this._clear();
    if (data.state.circuitData.page === 1) {
      data.state.circuitData.page = data.state.circuitData.page;
    } else {
      document.querySelector('.paginate.right').setAttribute('data-state', '');
      data.state.circuitData.page--;
      document
        .querySelector('.paginate.left')
        .setAttribute(
          'data-state',
          data.state.circuitData.page === 1 ? 'disabled' : ''
        );
    }

    this.render(data.getCircuitPage(data.state.circuitData.page));
    document.querySelector('.progress-bar').style.width =
      (90 /
        (data.state.circuitData.data.length /
          data.state.circuitData.resultsPerPage)) *
        data.state.circuitData.page +
      '%';
  }
  renderFirstArrow(data) {
    document
      .querySelector('.paginate.left')
      .setAttribute(
        'data-state',
        data.state.circuitData.page === 1 ? 'disabled' : ''
      );
  }
  render(data) {
    console.log(data);

    data.forEach(data => {
      const newElement = `
          <button  class = "btn__circuit" id = "btn_circuit--${data.circuitId}">
          <div class= "circuit__logo__div">
          <img
           src= "/images/country-logo/${data.circuitId}.png"
            class= "circuit__country--logo"
          /> 
            </div>
            <div class = "circuit__name">
              <div></div>
              <div>${data.circuitName}</div>
            </div>
          </div>
          </button>
          `;

      const circuitCell = document.createElement('td');
      circuitCell.classList.add('results--round--cell');
      circuitCell.innerHTML = newElement;
      this._parentElement.appendChild(circuitCell);
    });
  }
}
export default new CircuitView();
