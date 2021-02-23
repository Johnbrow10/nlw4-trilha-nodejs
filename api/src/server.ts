import express from 'express';

const app = express();


app.get("/", (request, response) => {
    return response.json({message: "hello mundo - nlw 04"});
 })

app.post("/", (request, response) => {
    // Recebeu os dados para salvar 
    return response.json({message: "Os dados foram salvos com o sucss"})
})

app.listen(3030, ()=> console.log("Server estar rodando"))