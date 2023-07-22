const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		products: [
			{
				productId: { type: String },
				quantity: { type: Number, default: 1 },
				size: { type: String },
			},
		],
		total: { type: Number, required: true },
		online: { type: Boolean },
		card: { type: Boolean },
		cash: { type: Boolean },
		delivery: { type: Boolean },
		address: { type: String },
		ASAP: { type: Boolean },
		term: { type: String },
		name: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: String, required: true },
		status: { type: String, default: "pending" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
