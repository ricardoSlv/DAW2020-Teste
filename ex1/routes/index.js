import { Router } from 'express'
import * as Batismo from '../controllers/batismo.js'
const router = Router()

router.get('/batismos', (req, res, next) => {
    if (req.query.ano) {
        Batismo.filterAno(req.query.ano)
            .then(f => res.status(200).jsonp(f))
            .catch(e => res.status(500).jsonp(e))
    }
    else {
        next()
    }
})

router.get('/batismos', (_req, res, _next) => {
    Batismo.list()
        .then(l => res.status(200).jsonp(l))
        .catch(e => res.status(500).jsonp(e))
})


router.get('/batismos/batisado', (_req, res, _next) => {
    Batismo.getBatizados()
        .then(f => res.status(200).jsonp(f))
        .catch(e => res.status(500).jsonp(e))
})

router.get('/batismos/progenitores', (_req, res, _next) => {
    Batismo.getProgenitores()
        .then(f => res.status(200).jsonp(f))
        .catch(e => res.status(500).jsonp(e))
})

router.get('/batismos/stats', (_req, res, _next) => {
    Batismo.byAno()
        .then(f => res.status(200).jsonp(f))
        .catch(e => res.status(500).jsonp(e))
})

router.get('/batismos/:id', (req, res, _next) => {
    Batismo.findById(req.params.id)
        .then(f => res.status(200).jsonp(f))
        .catch(e => res.status(500).jsonp(e))
})
export default router;
