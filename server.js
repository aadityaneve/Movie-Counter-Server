const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connect = () =>
    mongoose.connect(
        "mongodb+srv://aadityaneve:aadityaneve12$@cluster0.aiizm.mongodb.net/movie-app"
    );

app.use(express.json());

const visitorCounter = new mongoose.Schema(
    {
        visitor_count: { type: Number, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
const VisitorCounter = mongoose.model("visitor-counter", visitorCounter);

app.get("/counter", async (req, res) => {
    try {
        const counter = await VisitorCounter.findById(
            "61a4bf9f17e63e3fe8c33d8c"
        );
        return res.status(201).send(counter);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.patch("/counter", async (req, res) => {
    try {
        const counter = await VisitorCounter.findByIdAndUpdate(
            "61a4bf9f17e63e3fe8c33d8c",
            { $inc: { visitor_count: 1 } },
            { new: true }
        );
        return res.status(201).send(counter);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.listen(3001, async () => {
    await connect();
    console.log("LISTENING TO SERVER 3001");
});
