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

server.get("/cars/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .then((car) => {
      if (car) {
        res.status(201).json({ data: car }).end();
      } else {
        res.status(404).json({ message: "Car not found" }).end();
      }
    })
    .catch((err) => res.status(500).json({ message: "You fucked up" }).end());
});
server.post("/cars", (req, res) => {
  db("cars")
    .insert(req.body)
    .then((car) => {
      if (car.length) {
        const id = car[0];
        db("cars")
          .where({ id })
          .then((car) => {
            res.status(201).json(car).end();
          })
          .catch((err) =>
            res.status(400).json({ message: "You fucked up" }).end()
          );
      } else {
        res.status(500).json({ mesage: "Server fucked up" }).end();
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Server REALLY fucked up" }).end()
    );
});

server.put("/cars/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;
  db("cars")
    .where({ id })
    .update(update)
    .then((car) => {
      if (car) {
        db("cars")
          .where({ id })
          .then((car) => {
            res.status(201).json({ data: car }).end();
          })
          .catch((err) => {
            res.status(400).json({ message: "bad request" }).end();
          });
      } else {
        res.status(404).json({ message: "Car not found" }).end();
      }
    })
    .catch((err) => res.status(500).json({ message: "You fucked up" }).end());
});

server.delete("/cars/:id", (req, res)=>{
    const id = req.params.id;
    db('cars').where({ id }).del()
    .then(arr => {
        if(arr === 1){
            res.status(204).json({message: "Things are deleted"}).end()
        }else{
            res.status(500).json({message: "This was not deleted"}).end()
        }
    })
    .catch(e => {
        res.status(500).json({message: "There was an error"}).end()
    })
})
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("server is running");
});
