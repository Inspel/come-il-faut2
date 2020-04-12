'use strict';

export async function switchApi(category) {
  const response = await fetch(`https://ws7r41qs05.execute-api.eu-central-1.amazonaws.com/default/EL_MENU/dishes?category=${category}`, {
  });
  if (response.ok) {
    return await response.json();
  } else {
    return false;
  }
  // const mockDataCat = await mockData.find(item => (item.id === category));
  // return mockDataCat.dishes;
}

export async function categoriesApi() {
  const response = await fetch('https://ws7r41qs05.execute-api.eu-central-1.amazonaws.com/default/EL_MENU/categories',
    {});
  if (response.ok) {
    return await response.json();
  } else {
    return false;
  }
}
