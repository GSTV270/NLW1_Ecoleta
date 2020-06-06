import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import multer from 'multer'
import multerConfig from './config/upload'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = Router()
const upload = multer(multerConfig)

const poinstController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)
routes.get('/points', poinstController.index)
routes.get('/points/:id', poinstController.show)
routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi
      .object()
      .keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2).min(2),
        items: Joi.string().required()
      }),
  }, {
    abortEarly: false
  }),
  poinstController.create
)

export default routes