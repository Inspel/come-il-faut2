'use strict';

import sendApi from './api';
import { cleanCards, renderCategory, renderErrorNode } from './render';
import initLazy from './lazyLoading';
import stickyMenuInit from './stickyMenuInit';

const DEFAULT_CATEGORY = 'soups';
const ACTIVE_CLASS = 'is-active';

stickyMenuInit();


const menuLinks = Array.from(document.querySelectorAll('.menu-list__link'));
const loader = document.querySelector('.cards__loader ');

let activeCategory;

function setActiveItem(categoryId) {
  menuLinks.forEach(link => {
    link.classList.remove(ACTIVE_CLASS);
  });
  const activeLink = menuLinks.find(item => item.dataset['category'] === categoryId);
  activeLink.classList.add(ACTIVE_CLASS)
}

async function switchCategory(categoryId) {
  if (categoryId !== activeCategory) {
    activeCategory = categoryId;
    setActiveItem(activeCategory);
    cleanCards();
    loader.classList.add('is-loading');
    const data = await sendApi(activeCategory);
    loader.classList.remove('is-loading');
    if (data && (data.length > 0)) {
      renderCategory(data, activeCategory);
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

switchCategory(DEFAULT_CATEGORY);

const menuNode = document.querySelector('.menu-list');
menuNode.addEventListener('click', menuLinkClickHandler);
