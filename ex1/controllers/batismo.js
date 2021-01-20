import Batismo from "../models/batismo.js"

export function list() {
    return Batismo
        .find({}, { _id: 1, date: 1, title: 1, ref: 1 })
        .exec()
}

export function findById(id) {
    return Batismo
        .find({ _id: id })
        .exec()
}

export async function getBatizados() {
    const titles = await Batismo
        .find({}, { title: 1, _id: 0 })
        .exec()

    console.log(titles)
    const uniqueNames = new Set()

    try {
        titles.forEach(doc => {
            const [parte1, parte2] = doc.title.split(". Pai: ")
            const [registo, nome] = parte1.split(": ")
            uniqueNames.add(nome)
        })
    }
    catch (err) {
        console.log(err)
    }

    return [...uniqueNames].sort()
}

export async function getProgenitores() {
    return Batismo
        .find({}, { _id: 1, pai: 1, mae: 1 })
        .exec()

}

export async function filterAno(ano) {
    return Batismo
        .find({ date: { $regex: ano } })
        .exec()

}


export async function byAno() {
    const batismos = await Batismo
        .find()
        .exec()

    const byAno = {}
    try {
        batismos.forEach(b => {
            const ano = b.date.substring(0, 4)
            
            if (byAno[ano] !== undefined)
                byAno[ano]++
            else
                byAno[ano] = 0
        })
    }
    catch (err) {
        console.log(err)
    }

    return byAno
}

