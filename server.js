const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5001;

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
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Methods", "GET, POST");
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
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        return res.status(201).send(`<h1>${counter.visitor_count}</h1>`);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
});

app.listen(PORT, async () => {
    await connect();
    console.log(`LISTENING TO SERVER ${PORT}`);
});
