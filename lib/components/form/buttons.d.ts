/// <reference types="react" />
export interface ResourceFormButtonsProps {
    saving?: boolean;
    submit?: () => void;
    reset?: () => void;
}
export declare const ResourceFormPageButtons: (props: ResourceFormButtonsProps) => JSX.Element;
