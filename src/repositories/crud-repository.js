const { Logger } = require("../config")

class CrudRepository{
    constructor(model){
        this.model=model;
    }

    async create(data){
       
            const response = await this.model.create(data);
            return response;
       
    }


    async destroy(data){
        // try {
        //     const response = await this.model.destroy({
        //         where: {
        //             id: data
        //         }
        //     });
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the crud repo:destroy');
        //     throw error;
        // }

        const response = await this.model.destroy({
            where: {
                id: data
            }
        });
        return response;
    }

    async get(data){
        // try {
        //     const response = await this.model.findByPK(data);
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the crud repo:get');
        //     throw error;
        // }

        const response = await this.model.findByPK(data);
        return response;
    }

    async getAll(){
        // try {
        //     const response = await this.model.findAll();
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the crud repo:getAll');
        //     throw error;
        // }

        const response = await this.model.findAll();
            return response;
    }

    async update(id,data){
        // try {
        //     const response = await this.model.update(data, {
        //         where: {
        //             id: id
        //         }
        //     })
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the crud repo:update');
        //     throw error;
        // }

        const response = await this.model.update(data, {
            where: {
                id: id
            }
        })
        return response;
    }


    
}

module.exports=CrudRepository;