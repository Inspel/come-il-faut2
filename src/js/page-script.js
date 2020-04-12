'use strict';

import { categoriesApi } from './api';
import { renderCategoriesList } from './render';
import stickyMenuInit from './stickyMenuInit';
import initSwitcher from './switchCategory';

function getCategories() {
  return categoriesApi();
}
// const categoriesData = ['Супы'];

document.addEventListener('DOMContentLoaded', async () => {
  const categoriesData = await getCategories();
  renderCategoriesList(categoriesData);
  initSwitcher(categoriesData[0]);
});

stickyMenuInit();


