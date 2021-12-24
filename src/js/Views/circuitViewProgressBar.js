const progress = function (circuits, number, page) {
  const html = `
    
    <div class="progress-bar-background">
      <div
        class="progress-bar"
        />
        </div>
        </div>
    <style>
    .progress{
    }
    .progress-bar-background{
    }
        .progress-bar{
          width: ${(80 / (circuits / number)) * page + '%'};
          z-index: 1;
        }`;
  const barElement = document.createElement('div');
  barElement.classList.add('progress');
  barElement.innerHTML = html;
  document.querySelector('.content-circuits').append(barElement);
};

export default progress;
