module.exports = app => {
  const express = require('express')
  const router = express.Router()

  // 增删改查

  // 新增
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)

    res.send(model)
  })

  // 查询列表
  router.get('/', async (req, res) => {
    let options = {}
    if (req.Model.modelName === 'Category') {
      options = {
        populate: 'parent'
      }
    }
    const models = await req.Model.find({})
      .setOptions(options)
      .limit(10)

    res.send(models)
  })

  // 查询单个
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)

    res.send(model)
  })

  // 修改
  router.put('/:id', async (req, res) => {
    await req.Model.findByIdAndUpdate(req.params.id, req.body)

    res.send({
      success: true
    })
  })

  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndRemove(req.params.id, req.body)

    res.send({
      success: true
    })
  })

  // 中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  app.use(
    '/api/admin/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  )

  // 文件上传
  const multer = require('multer')
  const path = require('path')
  const upload = multer({ dest: path.join(__dirname, '../../uploads') })
  const config = require(path.join(__dirname, '../../config'))
  app.use(
    '/api/admin/upload',
    authMiddleware(),
    upload.single('file'),
    (req, res) => {
      const file = req.file
      file.url = `${config.BASEURL}uploads/${file.filename}`
      res.send(file)
    }
  )

  // 登录
  app.use('/api/admin/login', async (req, res) => {
    const { username, password } = req.body

    const AdminUser = require('../../models/AdminUser')

    const user = await AdminUser.findOne({ username }).select('+password')

    if (!user) {
      return res.status(422).send({
        message: '用户名不存在'
      })
    }

    const bcrypt = require('bcrypt')
    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码不正确'
      })
    }

    const jwt = require('jsonwebtoken')
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send('Bearer ' + token)
  })

  // 处理通用错误
  app.use(async (err, req, res, next) => {
    res.status(err.status).send({
      message: err.message
    })
  })
}
