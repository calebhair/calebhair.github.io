if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupLoading);
else setupLoading();

function setupLoading() {
  const loadingScreen = document.querySelector('.loading-screen');
  const blackholeImg = document.querySelector('.blackhole-img');
  const planetsImg = document.querySelector('.planets-img');
  const starsImg = document.querySelector('.stars-img');

  const imagesForLoadingEvents = [
    {
      event: 'planetsLoaded',
      element: planetsImg,
    },
    {
      event: 'blackHoleLoaded',
      element: blackholeImg,
    },
    {
      event: 'backgroundLoaded',
      element: starsImg,
    },
  ];

  const LOADED_OPACITY = 0.5;
  const LOADING_COMPLETE_OPACITY = 1;

  imagesForLoadingEvents.forEach(({ event, element }) => {
    document.addEventListener(event, () => onElementLoaded(element));
  });

  function onElementLoaded(element) {
    element.style.opacity = LOADED_OPACITY;
  }

  document.addEventListener('loadingComplete', () => {
    imagesForLoadingEvents.forEach(({ element }) => {
      onLoadingComplete(element);
    });
    loadingScreen.style.opacity = 0;
  });

  function onLoadingComplete(element) {
    element.style.opacity = LOADING_COMPLETE_OPACITY;
  }
}
