import { readFileSync, writeFileSync } from 'fs';

const rawdata = readFileSync('dataset.json')
const docs = JSON.parse(rawdata);

docs.forEach(d=>{d._id=d.ref.split('/').join('_')})

docs.forEach(d=>{
    const [parte1,parte2]=d.title.split(". Pai: ")
    const [pai,mae] = parte2.split("; Mãe: ")
    d.pai=pai
    d.mae=mae
})

writeFileSync('dataset_cleansed.json',JSON.stringify(docs))
