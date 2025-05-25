const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app, Figure } = require("./app");

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	await Figure.deleteMany({});
});

describe("Figures API", () => {
	it("should create a new figure", async () => {
		const res = await request(app)
			.post("/api/figures")
			.send({ name: "Box", color: "#fff", geometryType: "BOX", size: 10 });

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty("id");
		expect(res.body.name).toBe("Box");
	});

	it("should get all figures", async () => {
		await Figure.create({ name: "Box", color: "#fff", geometryType: "BOX", size: 10 });
		const res = await request(app).get("/api/figures");
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
		expect(res.body[0].name).toBe("Box");
	});

	it("should update figure name", async () => {
		const figure = await Figure.create({ name: "Old", color: "#fff", geometryType: "BOX", size: 10 });
		const res = await request(app)
			.put(`/api/figures/${figure._id}`)
			.send({ updatedName: "New" });
		expect(res.status).toBe(200);
		expect(res.body.name).toBe("New");
	});

	it("should delete a figure", async () => {
		const figure = await Figure.create({ name: "DeleteMe", color: "#fff", geometryType: "BOX", size: 10 });
		const res = await request(app).delete(`/api/figures/${figure._id}`);
		expect(res.status).toBe(204);

		const after = await Figure.findById(figure._id);
		expect(after).toBeNull();
	});
});
