import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateUserSeed {
    run(factory: Factory, connection: Connection): Promise<any>;
}
