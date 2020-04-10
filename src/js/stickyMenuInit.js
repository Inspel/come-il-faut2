const menuContainer = document.querySelector('.menu__container');
const menuParent = menuContainer.parentNode;
const menuWidth = window.getComputedStyle(
  menuContainer,
).width;

const modifyMenu = menuParentOffsets => {
  if (menuParentOffsets.top < 0) {
    menuContainer.style.top = '5px';
    menuContainer.style.bottom = 'auto';
    menuContainer.style.position = 'fixed';
    menuContainer.style.width = menuWidth;
  } else {
    menuContainer.style.position = 'static';
  }
  if (menuContainer.offsetHeight > menuParentOffsets.bottom) {
    menuContainer.style.position = 'absolute';
    menuContainer.style.bottom = 0;
    menuContainer.style.top = 'auto';
  }
};

const scrollHandler = () => {
  modifyMenu(menuParent.getBoundingClientRect());
};


export default function stickyMenuInit() {
  window.addEventListener('scroll', scrollHandler);
}
