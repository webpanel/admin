import * as React from 'react';
import { LayoutBuilderContentRenderProps, LayoutBuilderContentProps } from '../builder-content';
export interface LayoutBuilderStringFieldProps extends LayoutBuilderContentProps, LayoutBuilderContentRenderProps {
    name: string;
}
export declare class LayoutBuilderStringField extends React.Component<LayoutBuilderStringFieldProps> {
    private layouts;
    render(): string | JSX.Element;
}
