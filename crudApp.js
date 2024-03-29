const express = require('express')
const { v4: uuid } = require('uuid')
const fs = require('fs')

const app = express()

const port = 8080

app.use(express.json());

app.post("/data", (req, res) => {
	let oldData = JSON.parse(fs.readFileSync("./db.json", "utf-8"))
	let oldData1 = oldData.todos;
	const newData = req.body
	newData.id = uuid()
	oldData1.push(newData)
	console.log(oldData1)
	oldData.todos = oldData1
	fs.writeFileSync("./db.json", JSON.stringify(oldData))
	res.send("data posted successfully")
})


app.get("/todos", (req, res) => {
	const data = fs.readFileSync("./db.json", "utf-8")
	res.send(data)
	res.end()
})


app.listen(port, () => {
	console.log(`express server is running on port no.${port}`);
})