import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Stop} from "../entity/Stop";
import {StopRepository} from "../repository/StopRepository";
import {getCustomRepository} from "typeorm";

export class StopController {

    private stopRepository = getCustomRepository(StopRepository);
    
    async all(request: Request, response: Response, next: NextFunction) {
        return this.stopRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.stopRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.stopRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let stopToRemove = await this.stopRepository.findOne(request.params.id);
        await this.stopRepository.remove(stopToRemove);
    }
    async getGeojson(request: Request, response: Response, next: NextFunction) {
         const rawData = this.stopRepository.findGeojson();
         return rawData;
    }

}