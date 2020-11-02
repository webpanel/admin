/// <reference types="react" />
export declare type SaveOption = "edit" | "add";
export interface ResourceFormButtonsProps {
    reset: () => void;
    submit: () => Promise<void>;
}
export declare const ResourceFormPageButtons: (props: ResourceFormButtonsProps) => JSX.Element;
