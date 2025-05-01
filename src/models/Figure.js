import { GeometryTypes } from "./GeometryTypes";

export class Figure {
    constructor(id, name = "Unnamed Figure", color = "#000000", geometryType = GeometryTypes.BOX, size = 1) {
        this.id = id || crypto.randomUUID();
        this.name = name;
        this.color = color;
        this.geometryType = geometryType;
        this.size = size;
    }

    rename(updatedName) {
        this.name = updatedName;
    }
}