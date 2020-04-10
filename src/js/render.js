'use strict';

const cardTemplate = document.querySelector('#template-card').content;
const cardsNode = document.querySelector('.cards__container');

function cleanNode(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

export function cleanCards() {
  cleanNode(cardsNode);
}

function renderCard(dishData, categoryId) {
  const {
    id,
    label,
    weight,
    price,
  } = dishData;
  const cardNode = cardTemplate.cloneNode(true);
  const cardImage = cardNode.querySelector('.card-image figure img');
  cardImage.dataset.src = `menu/${categoryId}/${id}.jpg`;
  const cardTitle = cardNode.querySelector('.card__title');
  cardTitle.textContent = label;
  const cardWeight = cardNode.querySelector('.card__weight span');
  cardWeight.textContent = weight;
  const cardPrice = cardNode.querySelector('.card__price span');
  cardPrice.textContent = price;

  return cardNode;
}

export function renderErrorNode() {
  cleanNode(cardsNode);
  const errorNode = document.createElement('p');
  errorNode.classList.add('error-message');
  errorNode.textContent = 'Произошла ошибка, приносим извинения.';
  cardsNode.append(errorNode);
}

export function renderCategory(categoryData, categoryId) {
  const cardsList = document.createElement('ul');
  cardsList.className = 'columns cards__list is-multiline';
  categoryData.forEach(dish => {
    const dishCard = renderCard(dish, categoryId);
    cardsList.appendChild(dishCard);
  });
  cardsNode.appendChild(cardsList);
}
