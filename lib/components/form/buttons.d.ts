import * as React from 'react';
export declare type SaveOption = 'edit' | 'add';
export interface ResourceFormButtonsProps {
    hasChanges: boolean;
    handleSave: (option: SaveOption) => void;
    handleReset: () => void;
}
export declare class ResourceFormPageButtons extends React.Component<ResourceFormButtonsProps> {
    render(): React.ReactNode;
}
