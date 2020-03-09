const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// 处理自定义中间件
require('./routes/admin')(app)
require('./utils/db')(app)

app.listen(3000, err => {
  if (err) {
    console.log(err)
  }

  console.log(`listening on 3000`)
})
