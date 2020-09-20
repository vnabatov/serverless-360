const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const md5 = require('md5')
const app = express()
const Airtable = require('airtable-node')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')))

const base = 'appoxdoTBUBc3VoJu'
const apiKey = process.env.API_KEY

const Users = new Airtable({ apiKey, base, table: 'Users' })
const Questions = new Airtable({ apiKey, base, table: 'Questions' })
const Responces = new Airtable({ apiKey, base, table: 'Responces' })

app.post('/api/login', async (req, res) => {
  let response
  try {
    response = await Users.list({
      filterByFormula: `{email} = "${req.body.email}"`
    })
  } catch (e) {
    console.log(e)
  }

  let sessionId
  let updatedRecord
  if (response && response.records && response.records.length) {
    const record = response.records[0]
    if (record.fields.password === md5(req.body.password)) {
      sessionId = md5(record.fields.Id + 'secretkey' + new Date())
      updatedRecord = await Users.update(record.id, { sessionId })
    }
  }
  res.cookie('sessionId', sessionId)
  res.send({ status: sessionId && updatedRecord.id ? 'success' : 'fail' })
})
app.get('/api/users', async (req, res) => {
  let response
  try {
    response = await Users.list()
  } catch (e) {
    console.log(e)
  }
  res.send(JSON.stringify(response.records))
})
app.get('/api/questions', async (req, res) => {
  let response
  try {
    response = await Questions.list()
  } catch (e) {
    console.log(e)
  }
  res.send(JSON.stringify(response.records))
})
app.get('/api/responces', async (req, res) => {
  let response
  try {
    response = await Responces.list()
  } catch (e) {
    console.log(e)
  }
  res.send(JSON.stringify(response.records))
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080)
