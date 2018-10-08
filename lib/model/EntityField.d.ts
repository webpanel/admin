export interface IEntityFieldConfig {
    name: string;
    title?: string;
    visibility?: {
        list?: boolean;
        detail?: boolean;
    };
}
export declare class EntityField {
    private readonly config;
    constructor(config: IEntityFieldConfig);
    readonly title: string;
    readonly name: string;
    visible(type: 'list' | 'detail'): boolean;
}
