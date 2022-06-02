import { BaseInput } from "./BaseInput.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnReset = $(".btn-reset");
const navBtn = $$(".nav__btn");
const allWraper = $(".bases-wrapper-all");
const commonWrapper = $(".bases-wrapper-common");

const BASES = [];
const BASE_START = 2;
const BASE_LIMIT = 36;

/*
 * Create all input object
 */
for (let i = BASE_START; i <= BASE_LIMIT; i++) {
  const type = i <= 10 ? "number" : "text";
  BASES[i] = new BaseInput(i, type, `Base ${i}`);
}

/*
 * Create elements
 */

function createBases(elements, named = true) {
  const name = { 2: "bin", 8: "oct", 10: "dec", 16: "hex" };

  const result = [];
  elements.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("base");
    div.innerHTML = `
            <span class="base__name">
                ${named ? name[element.baseInt] : element.placeholder}
            </span>
            <form class="base__form"></form>
        `;
    div.querySelector("form").appendChild(element);
    result.push(div);
  });
  return result;
}

/*
 * Prevent all form default behavior
 */

function prevent() {
  $$(".base__form").forEach((element) => {
    element.addEventListener("submit", (e) => e.preventDefault());
  });
}

/*
 * Synchronize all input
 */

function sync() {
  $$(".base__input").forEach((input) => {
    input.addEventListener("input", function () {
      const value = this.value;

      if (value.length >= 1) {
        BASES.forEach((base) => (base.value = base.convert(value, this.baseInt)));
      } else BASES.forEach((base) => (base.value = ""));
    });
  });
}

/*
 * Fill bases-wrapper
 */

function fill(wrapper, named = true) {
  const filter = [2, 8, 10, 16];

  commonWrapper.innerHTML = "";
  allWraper.innerHTML = "";

  if (named) {
    const elements = createBases(BASES.filter((input) => filter.includes(input.baseInt)));
    elements.forEach((base) => wrapper.appendChild(base));
  } else {
    const elements = createBases(BASES, false);
    elements.forEach((base) => wrapper.appendChild(base));
  }
  sync();
  prevent();
}

/*
 * Switch view mode (common bases | all bases)
 */
navBtn.forEach((navbtn) => {
  navbtn.addEventListener("click", function () {
    $(".nav__btn--active").classList.remove("nav__btn--active");
    this.classList.add("nav__btn--active");

    $(".bases-wrapper--active").classList.remove("bases-wrapper--active");

    const wrapper = $(`.bases-wrapper-${this.dataset.link}`);
    wrapper.classList.add("bases-wrapper--active");
    switch (this.dataset.link) {
      case "common":
        fill(wrapper, true);
        break;
      case "all":
        fill(wrapper, false);
        break;
    }
  });
});

/*
 * Reset all input
 */

btnReset.addEventListener("click", () => BASES.forEach((base) => (base.value = "")));

/*
 * Fill html on startup
 */

fill(commonWrapper, true);
