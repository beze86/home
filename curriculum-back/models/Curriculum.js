const mongodb = require('mongodb');
const getDb = require('../db/db').getDb;


class Curriculum {
    constructor(data){
        this.data = data;
    }

    findOne() {
        const db = getDb();
        return new Promise((resolve, reject) => {
            if(!mongodb.ObjectID.isValid(this.data.id)){
                reject('curriculum id not valid')
            };
            db.collection('curricula').findOne({_id: new mongodb.ObjectID(this.data.id)})
            .then((curriculumFound) => {
                resolve(curriculumFound);
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    deleteOne() {
        const db = getDb();
        return new Promise((resolve, reject) => {
            if(!mongodb.ObjectID.isValid(this.data.id)){
                reject('curriculum id not valid')
            };
            db.collection('curricula').deleteOne({_id: new mongodb.ObjectID(this.data.id)})
            .then((curriculumDeleted) => {
                resolve(curriculumDeleted);
            })
            .catch((err) => {
                reject(err)
            })
        })

    }

    static findAll() {
        const db = getDb();
        return db.collection('curricula').find().toArray();
    }
}


module.exports = Curriculum;