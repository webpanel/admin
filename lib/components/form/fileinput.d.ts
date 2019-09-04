import * as React from 'react';
import { Entity } from '../../model/Entity';
import { UploadFile } from 'antd/lib/upload/interface';
interface IFile {
    id: string;
    name?: string;
    size?: number;
    url?: string;
    contentType?: string;
}
interface IFileInputProps {
    entity: Entity;
    uploadURL?: string;
    value?: string;
    onChange?: (newValue: string | null) => void;
}
interface IFileInputState {
    value: string | null;
}
export declare class FileInput extends React.Component<IFileInputProps, IFileInputState> {
    static getDerivedStateFromProps(props: IFileInputProps): IFileInputState;
    constructor(props: IFileInputProps);
    fileChangeHandler(file: UploadFile): void;
    udpateValue(file: IFile | null): void;
    renderFile(): React.ReactNode;
    clearValue(): void;
    render(): React.ReactNode;
}
export {};
