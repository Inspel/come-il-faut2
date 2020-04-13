import { switchApi } from './api';
import initLazy from './lazyLoading';
import { cleanCards, renderCategory, renderErrorNode } from './render';

const ACTIVE_CLASS = 'is-active';

const cardsLoader = document.querySelector('.cards__loader');

let activeCategory;
let menuLinks;

function setActiveItem(categoryId) {
  menuLinks.forEach(link => {
    link.classList.remove(ACTIVE_CLASS);
  });
  const activeLink = menuLinks.find(item => item.dataset['category'] === categoryId);
  activeLink.classList.add(ACTIVE_CLASS)
}

async function switchCategory(categoryId) {
  if (categoryId !== activeCategory) {
    // todo memoization
    const categoriesButtons = document.querySelectorAll('.menu-list__link');
    const categoriesButtonsArray = [].slice.call(categoriesButtons);

    activeCategory = categoryId;
    setActiveItem(activeCategory);
    cleanCards();
    cardsLoader.classList.add('is-loading');
    categoriesButtonsArray.forEach(item => {
      item.setAttribute('disabled', 'disabled');
    });
    const data = await switchApi(activeCategory);
    cardsLoader.classList.remove('is-loading');
    if (data && (data.length > 0)) {
      renderCategory(data, activeCategory);
      categoriesButtonsArray.forEach(item => {
        item.removeAttribute('disabled')
      });
      let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
      initLazy(lazyImages)
    } else {
      renderErrorNode();
    }
  }
}

function menuLinkClickHandler(event) {
  const targetLink = event.target;
  if (targetLink.classList.contains('menu-list__link')) {

    const categoryId = targetLink.dataset['category'];
    switchCategory(categoryId);
  }
}

export default function initSwitcher(defaultCategory) {
  menuLinks = Array.from(document.querySelectorAll('.menu-list__link'));
  switchCategory(defaultCategory);

  const menuNode = document.querySelector('.menu-list');
  menuNode.addEventListener('click', menuLinkClickHandler);
}
