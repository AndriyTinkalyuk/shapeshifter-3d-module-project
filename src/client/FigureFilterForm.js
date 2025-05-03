import { GeometryTypes } from "../models/GeometryTypes";
import { SortTypes } from "../models/SortTypes";

export class FigureFilterForm {

    constructor(onFilterHandler) {
      this.filterFigures = [];

       this.form = document.createElement("form");
       this.onFilterHandler = onFilterHandler;
      //Title
      const title = document.createElement("h4");
      title.textContent = "Фільтри:";
      this.form.appendChild(title);
     // geometryType select form field
        const geometrySelect = document.createElement("select");
        geometrySelect.name = "filterGeometryType";
        geometrySelect.id = "filterGeometryType";
        
        const geometryTypes = Object.entries(GeometryTypes);
        const option = document.createElement("option");
          option.value = "all";
          option.textContent = "all";
          geometrySelect.appendChild(option);

        geometryTypes.forEach((geometryType) => {
          const option = document.createElement("option");
          option.value = geometryType[0];
          option.textContent = geometryType[1];
          geometrySelect.appendChild(option);
        });
    
        this.form.appendChild(this.createFormField("Тип геометрії:", geometrySelect))
            // size input form field
            const minSizeInput = document.createElement("input");
            minSizeInput.type = "range";
            minSizeInput.name = "minFilterSize";
            minSizeInput.id = "minFilterSize";
            minSizeInput.step = "1";
            minSizeInput.max = "10";
            minSizeInput.min = "1";
            minSizeInput.value = "1"  
            this.form.appendChild(this.createFormField("Мінімальний розмір фігури:", minSizeInput))     
          // size input form field
         const maxSizeInput = document.createElement("input");
         maxSizeInput.type = "range";
         maxSizeInput.name = "maxFilterSize";
         maxSizeInput.id = "maxFilterSize";
         maxSizeInput.step = "1";
         maxSizeInput.max = "10";
         maxSizeInput.min = "1";
         maxSizeInput.value = "10"  
         this.form.appendChild(this.createFormField("Maксимальний розмір фігури:", maxSizeInput))   
         // color input form field
         const colorInput = document.createElement("input");
         colorInput.type = "color";
         colorInput.name = "filterColor";
         colorInput.id = "filterColor";
         colorInput.value = "#000000"   
         this.form.appendChild(this.createFormField("Колір:", colorInput));
        // sort select

        const sortSelect = document.createElement("select");
        sortSelect.id = "sort";
        sortSelect.name = "sort";
        const sortTypes = Object.entries(SortTypes);

        sortTypes.forEach((sortType) => {
          const option = document.createElement("option");
          option.value = sortType[0];
          option.textContent = sortType[1];
          sortSelect.appendChild(option);
        });

        this.form.appendChild(this.createFormField("Сортування:", sortSelect))

         //reset button
         const resetButton = document.createElement("button");
         resetButton.id = "reset"; 
         resetButton.textContent = "скинути";
         this.form.appendChild(resetButton);


         this.form.querySelector("#filterGeometryType").addEventListener("change", this.applyFilters.bind(this));
         this.form.querySelector("#minFilterSize").addEventListener("input", this.applyFilters.bind(this));
         this.form.querySelector("#maxFilterSize").addEventListener("input",  this.applyFilters.bind(this));
         this.form.querySelector("#filterColor").addEventListener("input", this.applyFilters.bind(this));
         this.form.querySelector("#sort").addEventListener("change", this.applyFilters.bind(this));
         this.form.querySelector("#reset").addEventListener("click", this.resetFilters.bind(this));

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



  applyFilters() {
    const geometryTypeValue = this.form.querySelector("#filterGeometryType").value;
    const minSize = parseInt(this.form.querySelector("#minFilterSize").value, 10);
    const maxSize = parseInt(this.form.querySelector("#maxFilterSize").value, 10);
    const color = this.form.querySelector("#filterColor").value.toLowerCase();

    console.log(GeometryTypes[geometryTypeValue]);
    console.log(this.filterFigures);
    

    const filtered = this.filterFigures.filter(figure => {
        const geometryMatch = geometryTypeValue === "all" || figure.geometryType === GeometryTypes[geometryTypeValue];
        const sizeValue = parseInt(figure.size, 10);
        const sizeMatch = sizeValue >= minSize && sizeValue <= maxSize;
        const colorMatch = color === "#000000" || figure.color.toLowerCase() === color;
        return geometryMatch && sizeMatch && colorMatch;
    });

    localStorage.setItem("filterParams", JSON.stringify({
      geometryTypeValue : geometryTypeValue,
      minSize : minSize, 
      maxSize: maxSize,
      color: color
    }));

    const sorted = this.applySort(filtered);

    this.onFilterHandler(sorted);
}

resetFilters(e) {
  e.preventDefault();
  this.form.querySelector("#filterGeometryType").value = "all";
  this.form.querySelector("#minFilterSize").value = 1;
  this.form.querySelector("#maxFilterSize").value = 10;
  this.form.querySelector("#filterColor").value = "#000000";

  this.applyFilters();
}

restoreFilters() {
  let filters = JSON.parse(localStorage.getItem("filterParams"));
  if(!filters) return

 const {geometryTypeValue, minSize, maxSize, color} = filters;

 this.form.querySelector("#filterGeometryType").value = geometryTypeValue;
 this.form.querySelector("#minFilterSize").value = minSize;
 this.form.querySelector("#maxFilterSize").value = maxSize;
 this.form.querySelector("#filterColor").value = color;

 this.applyFilters();
}

setList(list) {
  this.filterFigures = list;
  console.log( this.filterFigures); 
}


applySort(array) { 
 const sortValue = this.form.querySelector("#sort").value;
 let sorted = array; 
  switch (sortValue) {
      case "1":
        sorted = array.toSorted((a, b) => a.name.localeCompare(b.name, undefined, {
          numeric:true, sensitivity: 'base'
        }));
      break;
      case "2":
        sorted = array.toSorted((a, b) => a.name.localeCompare(b.name, undefined, {
          numeric:true, sensitivity: 'base'
        })).reverse();
      break;

    default:
      sorted = array;
      break;
  }
  console.log(sorted);
  
  return sorted;


}
  }


   