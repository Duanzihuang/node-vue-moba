const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())

// 处理路由中间件
app.use('/uploads',express.static(path.join(__dirname,"uploads")))

// 处理自定义中间件
require('./routes/admin')(app)
require('./utils/db')(app)

app.listen(3000, err => {
  if (err) {
    console.log(err)
  }

  console.log(`listening on 3000`)
})
