import { ModelSerializer } from 'src/common/serializer/model.serializer';
export declare const basicFieldGroupsForSerializing: string[];
export declare class Permission extends ModelSerializer {
    id: number;
    resource: string;
    description: string;
    path: string;
    method: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
