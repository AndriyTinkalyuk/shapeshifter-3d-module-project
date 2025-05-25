import axios from "axios";
import { Figure } from "../models/Figure";

export class FigureApiService {
    data: Figure[];
    basePath : string;
    constructor() {
        this.data = [];
        this.basePath = "http://localhost:8080/api/figures";
    }

    async getFiguresData() {
        try {
            const response = await axios.get(this.basePath);
            this.data = response.data;
            return this.data;
        } catch (error) {
            console.error("Error while fetching figures data", error);
        }
    }

   async addFigureData(figureData: Omit<Figure, 'id'>) {
    try {
        const responce = await axios.post(this.basePath, figureData);
        const newFigureData = responce.data;
        this.data.push(newFigureData);
        return newFigureData;
    } catch (error) {
        console.error('Error adding figure data:', error);
    }
}


async updateFigureData(figureData: Figure) {
    try {
        const responce = await axios.put(`${this.basePath}/${figureData.id}`, {
            updatedName: figureData.name
        });
        const updateFigureData = responce.data;
        const index = this.data.findIndex((item) => item.id === figureData.id);
        if (index !== -1) {
            this.data[index] = updateFigureData;
            return updateFigureData;
        } else throw new Error("Couldn't find figure on client side");
    } catch (error) {
        console.error("Error while updating figure data:", error);
    }
}


    async removeFigureData(figureId: string) {
        try {
            await axios.delete(`${this.basePath}/${figureId}`);
            const index = this.data.findIndex((item) => item.id === figureId);
            console.log(this.data);
            if (index !== -1) {
                this.data.splice(index, 1);
                return figureId;
            } else throw new Error("Couldn't remove figure on client side");
        } catch (error) {
            console.error("Error while removing figure data:", error);
        }
    }

}

export const figureApiService = new FigureApiService();