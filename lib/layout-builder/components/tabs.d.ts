import * as React from 'react';
import { TabPaneProps, TabsProps } from 'antd/lib/tabs';
export type LayoutBuilderTabsItem = TabPaneProps & {
    key: string;
    content: React.ReactNode;
};
export interface LayoutBuilderTabsProps extends TabsProps {
    tabList: LayoutBuilderTabsItem[];
}
interface LayoutBuilderTabsState {
    tabKey?: string;
}
export declare class LayoutBuilderTabs extends React.Component<LayoutBuilderTabsProps, LayoutBuilderTabsState> {
    state: {};
    render(): React.ReactNode;
}
export {};
