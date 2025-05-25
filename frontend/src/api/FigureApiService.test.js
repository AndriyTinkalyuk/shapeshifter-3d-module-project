import axios from "axios";
import {figureApiService} from "./FigureApiService";

jest.mock("axios");

describe("FigureApiService", () => {
  let consoleErrorMock;

  beforeEach(() => {
    // Очищуємо моки перед кожним тестом
    jest.clearAllMocks();
    figureApiService.data = [];

    // Мокання console.error
    consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {
    });
  });

  afterEach(() => {
    // Відновлюємо оригінальний console.error після кожного тесту
    consoleErrorMock.mockRestore();
  });

it("should add figure data successfully", async () => {
  const newFigure = { id: "someId", name: "Pyramid" };
  axios.post.mockResolvedValue({ data: newFigure });

  const result = await figureApiService.addFigureData(newFigure);

  expect(axios.post).toHaveBeenCalledWith("https://shapeshifter3d.onrender.com/api/figures", newFigure);
  expect(result).toEqual(newFigure);
  expect(figureApiService.data).toContainEqual(newFigure);
});


  it("should handle error while fetching figures data", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const result = await figureApiService.getFiguresData();

    expect(axios.get).toHaveBeenCalledWith("https://shapeshifter3d.onrender.com/api/figures");
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "Error while fetching figures data",
      expect.any(Error)
    );
  });
  

it("should add figure data successfully", async () => {
  const newFigure = { id: "someId", name: "Pyramid" };
  axios.post.mockResolvedValue({ data: newFigure });

  const result = await figureApiService.addFigureData(newFigure);

  expect(axios.post).toHaveBeenCalledWith("https://shapeshifter3d.onrender.com/api/figures", newFigure);
  expect(result).toEqual(newFigure); 
  expect(figureApiService.data).toContainEqual(newFigure);
});

  it("should handle error while adding figure data", async () => {
    axios.post.mockRejectedValue(new Error("Add figure error"));

    const result = await figureApiService.addFigureData({name: "Pyramid"});

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'Error adding figure data:',
      expect.any(Error)
    );
  });

 it("should update figure data successfully", async () => {
  figureApiService.data = [{id: "someId", name: "Cube"}];
  const updatedFigure = {id: "someId", name: "Updated Cube"};
  axios.put.mockResolvedValue({data: updatedFigure});

  const result = await figureApiService.updateFigureData(updatedFigure);

  expect(axios.put).toHaveBeenCalledWith(
    "https://shapeshifter3d.onrender.com/api/figures/someId",
    { updatedName: "Updated Cube" } 
  );
  expect(result).toEqual(updatedFigure);
  expect(figureApiService.data[0]).toEqual(updatedFigure);
});


  it("should handle error while updating figure data", async () => {
    axios.put.mockRejectedValue(new Error("Update figure error"));

    const result = await figureApiService.updateFigureData({id: "someId", name: "Cube"});

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "Error while updating figure data:",
      expect.any(Error)
    );
  });

it("should remove figure data successfully", async () => {
  figureApiService.data = [{id: "someId", name: "Cube"}];
  axios.delete.mockResolvedValue();

  const result = await figureApiService.removeFigureData("someId");

  expect(axios.delete).toHaveBeenCalledWith("https://shapeshifter3d.onrender.com/api/figures/someId");
  expect(result).toEqual("someId");
  expect(figureApiService.data).toEqual([]);
});


  it("should handle error while removing figure data", async () => {
    axios.delete.mockRejectedValue(new Error("Remove figure error"));

    const result = await figureApiService.removeFigureData(1);

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "Error while removing figure data:",
      expect.any(Error)
    );
  });
});