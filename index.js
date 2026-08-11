import express, { request, response } from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

app.post("/create-movie", (request, response) => {
    const { titulo, genero, duracao, classificacao } = request.body

    const insertCommand = "INSERT INTO filmes_SophiaSantanaDaniel(titulo, genero, duracao, classificacao) VALUES (?, ?, ?, ?)"

    sql.query(insertCommand, [titulo, genero, duracao, classificacao], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.status(201).json({
            message: "Filme cadastrado com sucesso!"
        })
    })
})

app.get("/all-movies", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_SophiaSantanaDaniel"

    sql.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.delete("/delete-movie/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_SophiaSantanaDaniel WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.status(200).json({
            message: "Filme apagado com sucesso"
        })
    })
})

app.put("/update-movie/:id", (request, response) => {
    const { id } = request.params
    const { titulo, genero, duracao, classificacao } = request.body

    const updateCommand = "UPDATE filmes_SophiaSantanaDaniel SET titulo = ?, genero = ?, duracao = ?, classificacao = ? WHERE id = ?"

    sql.query(updateCommand, [titulo, genero, duracao, classificacao, id], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.json({
            message: "Filme alterado com sucesso!"
        })
    })
})

app.listen(3000, () => console.log("Servidor ONLINE"))

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
}) 
