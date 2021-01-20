import mongoose from "mongoose"

const batismoSchema = new mongoose.Schema({
    _id: String, 
    title: String, 
    date: String,
    ref: String, 
    href: String,
    pai: String, 
    mae: String
},{versionKey: false});

export default mongoose.model('batismo', batismoSchema,'batismos')
