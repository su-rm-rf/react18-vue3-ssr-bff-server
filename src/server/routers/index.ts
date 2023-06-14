import Router from 'koa-router'

import admin from './admin'
import category from './category'

const router = new Router()

router.get('/', async(ctx) => {
  ctx.body = 'response from server'
})

router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/category', category.routes(), category.allowedMethods())

export default router