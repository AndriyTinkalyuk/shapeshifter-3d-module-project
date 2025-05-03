import {Figure} from "../models/Figure";

export class FigureViewModelService {

    toViewModel(figureData) {
        return new Figure(figureData.id, figureData.name, figureData.color, figureData.geometryType, figureData.size);
    }

    toSerializedData(figureViewModel) {
        return {
            id: figureViewModel.id,
            name: figureViewModel.name,
            color: figureViewModel.color,
            geometryType: figureViewModel.geometryType,
            size: figureViewModel.size,
        };
    }
}