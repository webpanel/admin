import * as React from "react";
import { Thunk } from "ts-thunk";
import { Entity } from "../../model/Entity";
import { UploadFile } from "antd/lib/upload/interface";
interface IFile {
    id: string;
    ID: string;
    name?: string;
    size?: number;
    url?: string;
    contentType?: string;
}
interface IFileInputProps {
    entity: Entity;
    uploadURL?: string;
    hostURL?: string;
    value?: string;
    onChange?: (newValue: string | null) => void;
    accessToken?: Thunk<Promise<string>>;
}
interface IFileInputState {
    value: string | null;
    accessToken?: string;
}
export declare class FileInput extends React.Component<IFileInputProps, IFileInputState> {
    static getDerivedStateFromProps(props: IFileInputProps): IFileInputState;
    constructor(props: IFileInputProps);
    componentDidMount(): void;
    fileChangeHandler(file: UploadFile): void;
    udpateValue(file: IFile | null): void;
    openItem: (hostURL: string, id: string, token?: string | undefined) => Promise<void>;
    renderFile(): React.ReactNode;
    clearValue(): void;
    render(): React.ReactNode;
}
export {};
