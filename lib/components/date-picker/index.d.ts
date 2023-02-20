import * as React from "react";
export declare class DatePicker extends React.Component<{
    value?: string | null;
    onChange?: (value: string | null) => void;
    showTime?: boolean;
    format?: string;
}> {
    getFormat(): string;
    render(): React.ReactNode;
}
