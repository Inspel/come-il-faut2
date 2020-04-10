'use strict';

async function sendApi(category) {
  const response = await fetch(`https://ws7r41qs05.execute-api.eu-central-1.amazonaws.com/default/EL_MENU?category=${category}`, {
  });
  if (response.ok) {
    return await response.json();
  } else {
    return false;
  }
  // const mockDataCat = await mockData.find(item => (item.id === category));
  // return mockDataCat.dishes;
}

export default sendApi;
