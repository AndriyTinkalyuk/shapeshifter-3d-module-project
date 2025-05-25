const mongoose = require("mongoose");
const { app } = require("./app");

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(8080, () => {
			console.log("Server started on http://localhost:8080");
		});
	});
