import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Pagination } from 'src/paginate';
import { PaginationInfoInterface } from 'src/paginate/pagination-info.interface';
import { SearchFilterInterface } from 'src/common/interfaces/search-filter.interface';
import { ModelSerializer } from 'src/common/serializer/model.serializer';
export declare class BaseRepository<T, K extends ModelSerializer> extends Repository<T> {
    get(id: number, relations?: string[], transformOptions?: {}): Promise<K | null>;
    findBy(fieldName: string, value: any, relations?: string[], transformOptions?: {}): Promise<K | null>;
    countEntityByCondition(conditions?: ObjectLiteral): Promise<number>;
    findAll(searchFilter: DeepPartial<SearchFilterInterface>, relations: string[], searchCriteria: string[], transformOptions?: {}): Promise<K[]>;
    getPaginationInfo(options: any): PaginationInfoInterface;
    paginate(searchFilter: DeepPartial<SearchFilterInterface>, relations?: string[], searchCriteria?: string[], transformOptions?: {}): Promise<Pagination<K>>;
    createEntity(inputs: DeepPartial<T>, relations?: string[]): Promise<K>;
    updateEntity(entity: K, inputs: QueryDeepPartialEntity<T>, relations?: string[]): Promise<K>;
    transform(model: T, transformOptions?: {}): K;
    transformMany(models: T[], transformOptions?: {}): K[];
}
