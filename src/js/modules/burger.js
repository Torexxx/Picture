const burger = (menuSelector, burgerSelector) => {
  const menuElem = document.querySelector(menuSelector),
    burgerELem = document.querySelector(burgerSelector);

  burgerELem.addEventListener("click", () => {
    if (getComputedStyle(menuElem).display === "none" && screen.availWidth < 992) {
      menuElem.style.display = "block";
    } else {
      menuElem.style.display = "none";
    }
  });

  window.addEventListener("resize", () => {
    if (screen.availWidth > 992) {
      menuElem.style.display = "none";
    }
  });
};

export default burger;
