// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const blogItems = document.querySelector(".blog__items");

let data;
let startItem = 0;
let endItem = 3;

if (blogItems) {
  loadBlogItems();
}

async function loadBlogItems() {
  const response = await fetch("files/data.json");

  if (response.ok) {
    const result = await response.json();

    data = result;

    initBlog(data, startItem, endItem);
  } else {
    alert("Error");
  }
}

function initBlog(data, startItem, endItem) {
  const dataPart = data.items.slice(startItem, endItem);

  dataPart.forEach((item) => buildBlogItem(item));

  viewMore();
}

function buildBlogItem(item) {
  let blogItemTemplate = ``;

  blogItemTemplate += '<article class="blog__item item-blog">';

  // Image
  item.image
    ? (blogItemTemplate += `
    <a href="" class="item-blog__image-ibg">
        <img src="${item.image}" alt="" />
    </a>`)
    : null;

  // Date
  blogItemTemplate += `<span class="item-blog__date">${item.date}</span>`;

  // Title
  blogItemTemplate += `
    <h4 class="item-blog__title">
        <a href="#" class="item-blog__link-title">${item.title}</a>
    </h4>`;

  // Text
  blogItemTemplate += `<div class="item-blog__text text">${item.text}</div>;`;

  //  Tags
  if (item.tags) {
    blogItemTemplate += `<div class="item-blog__tags">`;

    for (const tag in item.tags) {
      blogItemTemplate += `<a href="${item.tags[tag]}" class="item-blog__tag">${tag}</a>`;
    }

    blogItemTemplate += `</div>`;
  }

  blogItemTemplate += `</article>`;

  blogItems.insertAdjacentHTML("beforeend", blogItemTemplate);
}

document.addEventListener("click", documentActions);

function viewMore() {
  const dataItemsLength = data.items.length;
  const currentItemsLength = document.querySelectorAll(".item-blog").length;
  const viewMoreBtn = document.querySelector(".blog__view-more");

  currentItemsLength < dataItemsLength
    ? (viewMoreBtn.hidden = false)
    : (viewMoreBtn.hidden = true);
}

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest(".blog__view-more")) {
    e.preventDefault();

    startItem = document.querySelectorAll(".item-blog").length;
    endItem = startItem + 3;

    initBlog(data, startItem, endItem);
  }
}
