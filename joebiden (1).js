const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/write", (req, res) => {
    const { file, text } = req.query
    fs.writeFileSync(file, text)
    //write?file=chirno&text=baka
    res.send(text) 
  })

app.use("/read", (req, res) => {
    const { file } = req.query
    const filecontent = fs.readFileSync(req.query.file).toString()
    res.send(filecontent)
})

app.use("/delete", (req, res) => {
    const { file } = req.query
    fs.rmSync(file)
    res.send("File deleted you sucker")
})

app.use("/patch", (req, res) => {
    const {file, text} = req.query
    fs.appendFileSync(file, "\n"+text)
    res.send(text)

})

app.listen(3000, () => console.log("Servidor roda."))

//write, read, delete and update