const express = require("express");

//for sprint, set up helpers and routes
//for this, forget that nonsense
const db = require("./knexconfig");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("What up?");
});

server.get("/cars", (req, res) => {
  db("cars")
    .then((cars) => {
      if (cars.length) {
        res.status(200).json({ data: cars }).end();
      } else {
        res
          .status(400)
          .json({ message: "Server is wrong, or empty!", data: cars })
          .end();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Server is very wrong" }).end();
    });
});
server.post("/cars", (req, res) => {

  db("cars").insert(req.body)
    .then((car) => {
      if (car.length) {
        const id = car[0];
        db("cars")
          .where({ id })
          .then((car) => {
            res.status(201).json(car).end();
          })
          .catch((err) =>
            res.status(500).json({ message: "server fucked up" }).end()
          );
      } else {
        res.status(400).json({ mesage: "Bad Request" }).end();
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Server REALLY fucked up" }).end()
    );
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("server is running");
});
