//полифил для IE 11
/**
 * NodeList.prototype.forEach() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

const btnToggleSidebar = document.querySelector('.toggle-sidebar');
const aside = document.querySelector('.sidebar');
const btnShowMore = document.querySelector('.btn-more');
const hiddenCards = document.querySelectorAll('.card-link--hidden');
const cards = document.querySelectorAll('.card-link');
const widgets = document.querySelectorAll('.widget');
const checkBoxAny = document.querySelector('#location-05');
const topLocationCheckboxes = document.querySelectorAll('[data-location-param]');
const showMoreOptions = document.querySelector('.widget__show-hidden');
const hiddenCheckBoxes = document.querySelectorAll('.checkbox--hidden');

//скрыть показать сайдбар с фильтрами
btnToggleSidebar.addEventListener('click', function () {
  let asideBoolean = aside.classList.toggle('sidebar-mobile-active');
  if (asideBoolean) {
    this.innerHTML = 'Скрыть фильтры';
  } else {
    this.innerHTML = 'Показать фильтры';
  }
});

//подгрузить скрытые карточки товара
btnShowMore.addEventListener('click', function () {
  hiddenCards.forEach(function (card) {
    card.classList.remove('card-link--hidden')
  });
});

//показть/скрыть контент виджетов
widgets.forEach(function (widget) {
  widget.addEventListener('click', function (e) {
    if (e.target.classList.contains('widget__title')) {
      e.target.classList.toggle('widget__title--active')
      e.target.nextElementSibling.classList.toggle('widget__body--hidden')
    }
  });
});

//сброс чекбоксов выбора удаленности от метро
checkBoxAny.addEventListener('change', function () {
  if (checkBoxAny.checked) {
    topLocationCheckboxes.forEach(function (item) {
      item.checked = false;
    });
  }
});

//отключаем кнопку "любая удаленность", если выбрана конкретная удаленность от метро
topLocationCheckboxes.forEach(function (item) {
  item.addEventListener('change', function () {
    if (checkBoxAny.checked) {
      checkBoxAny.checked = false;
    }
  });
});

showMoreOptions.addEventListener('click', function (e) {
  hiddenCheckBoxes.forEach(function (item) {
    item.classList.remove('checkbox--hidden');
  });
  showMoreOptions.remove()
});
