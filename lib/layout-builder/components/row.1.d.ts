import * as React from 'react';
import { RowProps } from 'antd/lib/row';
export interface LayoutBuilderRowProps extends RowProps {
    content: React.ReactNode;
}
export declare class LayoutBuilderRow extends React.Component<LayoutBuilderRowProps> {
    render(): JSX.Element;
}
