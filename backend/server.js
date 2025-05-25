const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
	.connect("mongodb://127.0.0.1:27017/shapeshifter", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected!"));

const figureSchema = new mongoose.Schema({
	name: String,
	color: String,
	geometryType: { type: String, enum: ["BOX", "SPHERE", "CYLINDER"] },
	size: Number,
});

const Figure = mongoose.model("Figure", figureSchema);

// ROUTES
app.get("/api/figures", async (req, res) => {
	const figures = await Figure.find();
	res.json(
		figures.map((f) => ({
			id: f._id,
			name: f.name,
			color: f.color,
			geometryType: f.geometryType,
			size: f.size,
		}))
	);
});

app.post("/api/figures", async (req, res) => {
	const { name, color, geometryType, size } = req.body;
	const figure = new Figure({ name, color, geometryType, size });
	await figure.save();
	res.status(201).json({
		id: figure._id,
		name: figure.name,
		color: figure.color,
		geometryType: figure.geometryType,
		size: figure.size,
	});
});

app.delete("/api/figures/:id", async (req, res) => {
	await Figure.findByIdAndDelete(req.params.id);
	res.status(204).end();
});

app.put("/api/figures/:id", async (req, res) => {
	const { updatedName } = req.body;
	const figure = await Figure.findByIdAndUpdate(
		req.params.id,
		{ name: updatedName },
		{ new: true }
	);
	if (!figure) return res.status(404).json({ error: "Not found" });
	res.json({
		id: figure._id,
		name: figure.name,
		color: figure.color,
		geometryType: figure.geometryType,
		size: figure.size,
	});
});

app.listen(8080, () => {
	console.log("Server started on http://localhost:8080");
});
