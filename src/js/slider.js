/* eslint-disable */
document.addEventListener("DOMContentLoaded", () => {
  
  const createSlider = function () {
    const images = [...document.querySelectorAll(".slider__container img")];

    const sliderLength = images.length;

    let currrentSlide = 1;

    const indicators = document.getElementById("indicators");

    const pagination = createPaginationList();

    pagination.id = "slider__ul";

    const allLis = [...document.querySelectorAll("#slider__ul li")];

    setIndicatorsClickEvent();

    setCurrentSlide();

    function createPaginationList() {
      const ul = document.createElement("ul");
      for (let i = 1; i <= sliderLength; i++) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(i));
        ul.appendChild(li);
      }
      indicators.appendChild(ul);
      return ul;
    }

    function setIndicatorsClickEvent() {
      allLis.forEach((element) => {
        element.addEventListener("click", function () {
          currrentSlide = parseInt(this.textContent);
          setCurrentSlide();
        });
      });
    }

    function setCurrentSlide() {
      removeAllActiveClasses();
      images[currrentSlide - 1].classList.add("slider--active");
      allLis[currrentSlide - 1].classList.add("slider--active");
    }
    function removeAllActiveClasses() {
      for (let i = 0; i < sliderLength; i++) {
        images[i].classList.remove("slider--active");
        allLis[i].classList.remove("slider--active");
      }
    }
  };
  createSlider();
});
