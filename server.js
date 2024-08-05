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

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})