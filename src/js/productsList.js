/* eslint-disable */
document.addEventListener("DOMContentLoaded", () => {
  
  let products = [];
  let selectedPage;

  //FILTER SELECT
  let filter = "name";
  let select = document.querySelector(".select--custom");
  select.value = filter;

  select.addEventListener("change", function (e, optionValue) {
    optionValue = e.target.options[e.target.selectedIndex].dataset.sort;
    listProducts(optionValue);
    loaderFull();
  });

  //INIT FETCH PRODUCTS
  const listProducts = (optionValue) => {
    fetch(
      `http://localhost:3004/products?_order=${optionValue}&_sort=${select.value}`
    )
      .then((response) => response.json())
      .then((json) => {
        products = json;

        //paging
        changePage(1);
        pageNumbers();
        selectedPage();
        clickPage();
        addEventListeners();
      });
  };

  listProducts();

  //PAGINATION
  const prevButton = document.getElementById("button_prev");
  const nextButton = document.getElementById("button_next");

  let current_page = 1;
  let records_per_page = 20;

  addEventListeners = () => {
    prevButton.addEventListener("click", prevPage);
    nextButton.addEventListener("click", nextPage);
  };

  selectedPage = () => {
    let page_number = document
      .getElementById("page_number")
      .getElementsByClassName("pagination__click");
    for (let i = 0; i < page_number.length; i++) {
      i == current_page - 1
        ? page_number[i].classList.add("pagination__click--active")
        : page_number[i].classList.remove("pagination__click--active");
    }
  };

  const checkButtonOpacity = () => {
    current_page == 1
      ? prevButton.classList.add("pagination__click--disabled")
      : prevButton.classList.remove("pagination__click--disabled");
    current_page == numPages()
      ? nextButton.classList.add("pagination__click--disabled")
      : nextButton.classList.remove("pagination__click--disabled");
  };

  const changePage = (page) => {
    const listingTable = document.getElementById("listingTable");

    if (page < 1) {
      page = 1;
    }
    if (page > numPages() - 1) {
      page = numPages();
    }

    listingTable.innerHTML = "";

    for (
      var i = (page - 1) * records_per_page;
      i < page * records_per_page && i < products.length;
      i++
    ) {
      listingTable.innerHTML +=
        `
    <div class="pagination__column">
      <a href="#" class="pagination__link" title="${products[i].name}">
        <div class="pagination__image"><img src="${products[i].image}" alt="${products[i].name}"></div>
        <span class="pagination__name">${products[i].name}</span>
        <span class="pagination__price">` +
        numberToReal(products[i].price) +
        `</span>
      </a>
    </div>
    `;
    }
    checkButtonOpacity();
    selectedPage();
    loaderFull();
  };

  const prevPage = () => {
    if (current_page > 1) {
      current_page--;
      changePage(current_page);
      scrollTop();
    }
  };

  const nextPage = () => {
    if (current_page < numPages()) {
      current_page++;
      changePage(current_page);
      scrollTop();
    }
  };

  const clickPage = () => {
    document.addEventListener("click", function (e) {
      if (
        e.target.nodeName == "SPAN" &&
        e.target.classList.contains("pagination__click")
      ) {
        current_page = e.target.textContent;
        changePage(current_page);
        scrollTop();
      }
    });
  };

  const pageNumbers = () => {
    let pageNumber = document.getElementById("page_number");
    pageNumber.innerHTML = "";

    for (let i = 1; i < numPages() + 1; i++) {
      pageNumber.innerHTML +=
        "<span class='pagination__click'>" + i + "</span>";
    }
  };

  const numPages = () => {
    return Math.ceil(products.length / records_per_page);
  };

  const numberToReal = (numero) => {
    var numero = numero.toFixed(2).split(".");
    numero[0] = "R$" + numero[0].split(/(?=(?:...)*$)/).join(".");

    return numero.join(",");
  };

  //LOADER FULLPAGE
  const loaderFull = () => {
    let elLoader = document.querySelector(".loading");
    elLoader.style.display = "block";
    setTimeout(function () {
      elLoader.style.display = "none";
    }, 800);
  };

  //SCROLL PAGINATION
  scrollTop = () => {
    blocoTop = document.querySelector(".select__conteiner");
    blocoTop.scrollIntoView();
  };
});
