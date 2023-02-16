import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateRoleSeed {
    run(factory: Factory, connection: Connection): Promise<any>;
}
