module.exports = {
    getBankAll(db){
        return db('bank');
    },

    getBankById(db, id){
        return db('bank')
        .where('id',id);
    },

    getCustomer(db){
        return db('customers');
    },

    updateCompany(db, id, data){
        return db('customers')
        .where('id', id)
        .update(data);
    },

    deleteCustomer(db, id){
        return db('customers')
        .where('id', id)
        .del();
    },

    addCompany(db, data){
        return db('customers')
        .insert(data);
    }


};