export class BaseInput extends HTMLInputElement {
  constructor(baseInt, type, placeholder) {
    super();
    this.baseInt = baseInt;
    this.type = type;
    this.placeholder = placeholder;
    this.className = "base__input";
  }
  convert(value, base) {
    const result = parseInt(value, base).toString(this.baseInt);
    if (result === "NaN") return "";
    else return result;
  }
}
customElements.define("base-input", BaseInput, { extends: "input" });
