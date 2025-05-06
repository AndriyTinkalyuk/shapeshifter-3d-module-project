import {Figure} from "../models/Figure";

export class FigureViewModelService {

    toViewModel(figureData: Figure) : Figure {
        return new Figure(figureData.id, figureData.name, figureData.color, figureData.geometryType, figureData.size);
    }

    toSerializedData(figureViewModel: Figure) : object {
        return {
            id: figureViewModel.id,
            name: figureViewModel.name,
            color: figureViewModel.color,
            geometryType: figureViewModel.geometryType,
            size: figureViewModel.size,
        };
    }
}