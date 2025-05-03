import { GeometryTypes } from "../models/GeometryTypes";

export class Form {
  constructor () {
    this.form = document.createElement("form");
    this.form.classList.add("form-create");

      //Title

      const title = document.createElement("h4");
      title.textContent = "Створити фігуру:";
      this.form.appendChild(title);
    // name input form field
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Назва фігури";
    nameInput.name = "figureName";
    nameInput.id = "figureName";
    this.form.appendChild(this.createFormField("Назва фігури:", nameInput));

    // geometryType select form field
    const geometrySelect = document.createElement("select");
    geometrySelect.name = "geometryType";
    geometrySelect.id = "geometryType";

    const geometryTypes = Object.entries(GeometryTypes);
    geometryTypes.forEach((geometryType) => {
      const option = document.createElement("option");
      option.value = geometryType[0];
      option.textContent = geometryType[1];
      geometrySelect.appendChild(option);
    });

    this.form.appendChild(this.createFormField("Тип геометрії:", geometrySelect));

    // size input form field
    const sizeInput = document.createElement("input");
    sizeInput.type = "range";
    sizeInput.name = "size";
    sizeInput.id = "size";
    sizeInput.step = "1";
    sizeInput.max = "10";
    sizeInput.min = "1";
    sizeInput.value = "5";

    this.form.appendChild(this.createFormField("Розмір фігури:", sizeInput));


    // color input form field
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.name = "color";
    colorInput.id = "color";
    colorInput.value = "#000000";

    this.form.appendChild(this.createFormField("Колір:", colorInput));

    // submit form button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Створити фігуру";
    this.form.appendChild(submitButton);
  }


  createFormField(labelText, inputElement) {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add("formField");

    const label = document.createElement("label");
    label.innerText = labelText;
    label.htmlFor = inputElement.id;
    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(inputElement);
    return fieldWrapper;
  }

  getFormElement() {
    return this.form;
  }

  onCreate(onFigureCreateCallback) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const [name, geometryType, size, color] = this.form;

      if (this.form[0].value !== "") {
        onFigureCreateCallback({
          name: name.value,
          geometryType: GeometryTypes[geometryType.value],
          size: size.value,
          color: color.value,
        });

        this.clear();
      } else {
        alert("Будь ласка вкажіть імʼя фігури!");
      }
    });
  }

  clear() {
    this.form[0].value = "";
  }
}