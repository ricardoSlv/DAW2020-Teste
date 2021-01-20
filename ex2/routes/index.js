// import { Router } from 'express'
// import * as Filme from '../controllers/filme.js'
// const router = Router()

// router.get('/filmes', (req, res, next) => {
//     if(req.query.by==='ator'){
//         Filme.byAtor(req.query.page,req.query.size)
//             .then(f => res.status(200).jsonp(f))
//             .catch(e => res.status(500).jsonp(e))
//     }
//     else if (req.query.by==='genero'){
//         Filme.byGenero(req.query.page,req.query.size)
//             .then(f => res.status(200).jsonp(f))
//             .catch(e => res.status(500).jsonp(e))
//     }
//     else {
//         next()
//     }
// })

// router.get('/filmes', (_req, res, _next) => {
//     Filme.list()
//         .then(l => res.status(200).jsonp(l))
//         .catch(e => res.status(500).jsonp(e))
// })

// router.get('/filmes/:id', (req, res, _next) => {
//     Filme.findById(req.params.id)
//         .then(f => res.status(200).jsonp(f))
//         .catch(e => res.status(500).jsonp(e))
// })

// router.get('/atores', (_req, res, _next) => {
//     Filme.getAtores()
//         .then(f => res.status(200).jsonp(f))
//         .catch(e => res.status(500).jsonp(e))
// })

// router.get('/filmesQuantAtor', (_req, res, _next) => {
//     Filme.quantAtor()
//         .then(f => res.status(200).jsonp(f))
//         .catch(e => res.status(500).jsonp(e))
// })


// export default router;
