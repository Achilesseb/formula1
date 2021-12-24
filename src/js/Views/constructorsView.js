class ConstructorView {
  allSlides = [];
  allElements = [];
  parentElement = document.querySelector('.placeholder');
  curSlide = 0;
  elements;
  addHandlerConstructors(handler) {
    document
      .getElementById('#section--2--btn')
      .addEventListener('click', function () {
        console.log('Hello section 2');
        document.querySelector('.section__section--2').style.display = 'block';
        document.querySelector('.section__section--2').scrollIntoView();
        handler();
      });
  }

  render(data) {
    const newSlide = `<div class= "slide__constructors" border-color: '--color-${data.id}>
        <div class= "constructor__name">${data.name}</div>
             <img
             src= "/images/teams-logo/${data.id}-logo.png"
             class= "constructor__team--logo"
             />
             <div class= "constructor__details">
               <table class= "constructor__detail">
                 <tr></tr>
                 <tr>
                   <th class= "constructor__details--cap">Team nationality</th>
                   <th class= 'constructor__details--input' id="input--nationality">${data.nationality}</th>
                 </tr>
                 <tr>
                   <th class= "constructor__details--cap">Base</th>
                   <th class= 'constructor__details--input'id="input--base">${data.base}</th>
                 </tr>
                 <tr>
                   <th class= "constructor__details--cap">Team Chief</th>
                   <th class= 'constructor__details--input'id="input--chief">${data.teamChief}</th>
                 </tr>
                 <tr>
                   <th class= "constructor__details--cap">Chassis</th>
                   <th class= 'constructor__details--input'id="input--chassis">${data.chassis}</th>
                 </tr>
       <tr>
                   <th class= "constructor__details--cap">Power-unit</th>
                   <th class= 'constructor__details--input'id="input--powerunit">${data.powerUnit}</th>
                 </tr>
               </table>
             </div>
             <img
             src= "/images/team-car/${data.id}.png"
             class="constructor__car"
             alt= "F1 car"
           />
           </div>
           </div>
 <style>
 .slide__constructors{
   border-color: var(--color-${data.id})
 }
 .constructor__name{
   color: var(--color-${data.id})
 }
 .constructor__details--input{
  color: var(--color-${data.id})
}

.slider__btn{
  color: var(--color-${data.id})
}
 </style>`;

    this.allSlides.push(newSlide);
    this.allElements.push(this._createSlideElement(newSlide));
    this.parentElement.append(this.allElements[this.curSlide]);
    return this.allElements;
  }

  _createSlideElement(slide) {
    const element = document.createElement(`div`);
    element.innerHTML = slide;
    return element;
  }
}

export default new ConstructorView();
