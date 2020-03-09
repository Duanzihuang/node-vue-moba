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

  app.use(
    '/api/admin/rest/:resource',
    async (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )
}
