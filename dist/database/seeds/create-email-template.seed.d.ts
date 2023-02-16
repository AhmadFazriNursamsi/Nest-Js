import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateEmailTemplateSeed {
    run(factory: Factory, connection: Connection): Promise<any>;
}
