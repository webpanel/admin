import * as React from "react";
import { SharedTimeProps } from "rc-picker/lib/panels/TimePanel";
export declare class DatePicker extends React.Component<{
    value?: string | null;
    onChange?: (value: string | null) => void;
    showTime?: boolean | SharedTimeProps<any>;
    format?: string;
}> {
    getFormat(): string;
    render(): React.ReactNode;
}
