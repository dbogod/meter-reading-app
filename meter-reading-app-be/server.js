const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('app/db.json')
const middlewares = jsonServer.defaults()
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

server.use(middlewares)
server.use(bodyParser.json())

server.post('/login', (req, res) => {
  const { username, password } = req.body
  const db = router.db
  const account = db.get('accounts').find({ username, password }).value()

  if (account) {
    res.json({
      id: account.id,
      userName: account.username,
      firstName: account.firstName,
      lastName: account.lastName,
    })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

server.get('/accounts/:accountId/meter-readings', (req, res) => {
  const { accountId } = req.params
  const db = router.db
  const account = db.get('accounts').find({ id: accountId }).value()

  if (account && account.meterReadings) {
    res.json(
      account.meterReadings.map((reading) => ({
        id: reading.id,
        accountId: reading.accountId,
        meterReadingDate: reading.meterReadingDate,
        meterReadingType: reading.meterReadingType,
        readingValue: reading.readingValue,
        createdDateTime: reading.createdDateTime,
      })),
    )
  } else {
    res
      .status(404)
      .json({ error: 'Account not found or no meter readings available' })
  }
})

server.post('/accounts/:accountId/meter-readings', (req, res) => {
  const { accountId } = req.params
  const { meterReadingType, readingValue } = req.body
  console.log({ accountId, meterReadingType, readingValue })
  const db = router.db
  const account = db
    .get('accounts')
    .find({ id: accountId })
    .value()

  if (account) {
    const id = uuidv4()
    const newReading = {
      id,
      accountId,
      meterReadingType,
      readingValue,
      meterReadingDate: new Date().toISOString().split('T')[0],
      createdDateTime: new Date(),
    }

    account.meterReadings.push(newReading)
    db.write()

    res.status(201).json({
      id: newReading.id,
      accountId: newReading.accountId,
      meterReadingDate: newReading.meterReadingDate,
      meterReadingType: newReading.meterReadingType,
      readingValue: newReading.readingValue,
      createdDateTime: newReading.createdDateTime,
    })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

server.use(router)

const port = 3004
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`)
})
