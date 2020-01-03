module.exports = {
    getBankAll(db){
        return db('bank');
    },

    getBankById(db, id){
        return db('bank')
        .where('id',id);
    }
};