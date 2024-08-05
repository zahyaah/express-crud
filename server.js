const express = require("express"); 
const app = express(); 
const PORT = process.env.PORT; 

const shoes = []; 
const id = 1; 

const exampleShoes = [
    { "id": 1, "shoe": "Nike Vaporfly 3 Electric", "price": 21000},
    { "id": 2, "shoe": "Nike Pegasus 41 Electric", "price": 12000},
    { "id": 3, "shoe": "Nike Air VaporMax 2023 Flyknit Electric", "price": 19000}
]


app.use(express.json());

app.get("/shoes", (req, res) => {
    const limit = req.query.limit; 
    if (!isNaN(limit) && limit > 0) {
        const store = exampleShoes.filter(shoe => exampleShoes.indexOf(shoe) < limit);
        res.status(200).send(store);
    }

    res.status(200).send(exampleShoes);
})

app.get("/shoes/:id", (req, res) => {
    let id = parseInt(req.params.id); 
    const found = exampleShoes.find(shoe => shoe.id === id);

    if (!found) 
        return res.status(404).send({'Error': `Shoes with ID ${id} not found!`});

    res.status(200).send(found);
})

app.post("/shoes", (req, res) => {
    let newId = exampleShoes.length + 1; 
    const {shoe, price} = req.body; 

    exampleShoes.push({"id": newId, shoe, price});
    res.status(204).send("Shoe Added");
})

app.put("/shoes/:id", (req, res) => {
    let getId = parseInt(req.params.id);
    const found = exampleShoes.find(shoe => shoe.id === getId);

    if (!found)
        return res.status(404).send({"Error" : `Shoe with ID ${getId} not found!`})

    const {shoe, price} = req.body; 
    found.shoe = shoe; 
    found.price = price; 

    res.status(204).send(`Shoe with ID ${getId} updated!`);
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})