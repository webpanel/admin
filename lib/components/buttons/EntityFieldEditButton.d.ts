/// <reference types="react" />
import { EntityField } from "../../model/EntityField";
interface IEntityFieldEditButtonProps {
    value: any;
    field: EntityField<any, any>;
    onChange: (value: any) => Promise<void>;
    saving?: boolean;
}
export declare const EntityFieldEditButton: (props: IEntityFieldEditButtonProps) => JSX.Element;
export {};
