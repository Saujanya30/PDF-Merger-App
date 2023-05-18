// to open the server just type node server.js in terminal
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const multer  = require('multer')// to upload files to nodejs server
const {mergePdfs} = require('./testpdf')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})


app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {// this number 2 in this line shows that 2 pdfs you can merge if you want to increase it then you have to change in mergePdfs function of testpdf.js
// and /merge is coming from the form part of index.html
    console.log(req.files.path)
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})