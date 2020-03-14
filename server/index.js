const express = require('express')
const cors = require('cors')
const path = require('path')
const history = require('connect-history-api-fallback')
const app = express()
app.use(express.json())
app.use(cors())

// 设置app全局值
app.set('secret', 'lsdfasfa1212;as1')

// 处理静态资源中间件
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// 处理前端history模式的路由
app.use(history({ index: '/admin' }))
// 处理静态资源中间件
app.use('/admin', express.static(path.join(__dirname, 'admin')))

// 处理自定义中间件
require('./routes/admin')(app)
require('./utils/db')(app)

app.listen(3000, err => {
  if (err) {
    console.log(err)
  }

  console.log(`listening on 3000`)
})
