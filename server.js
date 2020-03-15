const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const md5 = require('md5')
const app = express()
const Airtable = require('airtable-node')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')))

const Users = new Airtable({ apiKey: '', base: 'appoxdoTBUBc3VoJu', table: 'Users' })

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

    console.log(record, req.body.password)

    if (record.fields.password === md5(req.body.password)) {
      // todo: replace with a temporary sessionId /jwt
      sessionId = md5(record.fields.Id + 'secretkey' + new Date())
      updatedRecord = await Users.update(record.id, { sessionId })
    }
  }
  res.cookie('sessionId', sessionId)
  res.send({ status: sessionId && updatedRecord.id ? 'success' : 'fail' })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080)
