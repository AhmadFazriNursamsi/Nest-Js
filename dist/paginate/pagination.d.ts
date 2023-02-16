import { PaginationResultInterface } from 'src/paginate/pagination.results.interface';
export declare class Pagination<PaginationEntity> {
    results: PaginationEntity[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    next: number;
    previous: number;
    constructor(paginationResults: PaginationResultInterface<PaginationEntity>);
}
