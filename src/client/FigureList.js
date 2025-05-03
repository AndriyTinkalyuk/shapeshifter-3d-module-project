
export class FigureList {
  constructor(onDeleteHandler) {
    this.figureList = document.createElement("div");
    this.figureList.classList.add("figure-list");
    this.figureList.classList.add("sidebar");
    this.figureListItems = [];
    this.onDeleteHandler = onDeleteHandler;
  }

  createFigureListItem(figure) {
    const figureListItem = document.createElement("div");
    figureListItem.classList.add("figure-list-item");
    figureListItem.id = figure.id;

    const figureNameElement = document.createElement("h3");
    figureNameElement.classList.add("figure-name");
    figureNameElement.innerText = figure.name;

    const metaInfoElement = document.createElement("div");
    metaInfoElement.classList.add("meta-info");

    const colorPreviewElement = document.createElement("div");
    colorPreviewElement.classList.add("color-preview");
    colorPreviewElement.style.backgroundColor = figure.color;

    const geometryDetailsElement = document.createElement("p");
    geometryDetailsElement.classList.add("geometry-details");
    geometryDetailsElement.innerText = `| ${figure.geometryType} | ${figure.size}`;


    metaInfoElement.append(colorPreviewElement, geometryDetailsElement);

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.classList.add("delete-button");
    deleteButtonElement.innerText = "x";
    deleteButtonElement.addEventListener("click", () => {
      this.onDeleteHandler(figure.id);
    });

    figureListItem.append(figureNameElement, metaInfoElement, deleteButtonElement);

    return figureListItem;
  }

  updateList(figures) {
    this.figureListItems = [];
    this.figureList.innerHTML = "";

    figures.forEach(figure => {
      const figureItem = this.createFigureListItem(figure);
      this.figureList.appendChild(figureItem);
      this.figureListItems.push(figureItem);
    });
  }
}