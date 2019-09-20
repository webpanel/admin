export interface IAutopermissionConfig {
    resourcePrefix?: string;
}
export declare const configurePermissions: (config?: boolean | IAutopermissionConfig | undefined) => void;
export declare const componentPermission: (resourceName: string) => boolean;
