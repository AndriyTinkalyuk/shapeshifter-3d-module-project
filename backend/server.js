const mongoose = require("mongoose");
const { app } = require("./app");

mongoose
	.connect("mongodb://127.0.0.1:27017/shapeshifter", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(8080, () => {
			console.log("Server started on http://localhost:8080");
		});
	});
