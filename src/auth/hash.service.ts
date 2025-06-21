import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService{
    async createHashPassword(password:string){
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    
    async validatePassword(password: string, hash: string){
        return bcrypt.compare(password, hash);
    }
}