import * as React from 'react';

import { TabPaneProps, TabsProps } from 'antd/lib/tabs';

import { Tabs } from 'antd';

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

export class LayoutBuilderTabs extends React.Component<
  LayoutBuilderTabsProps,
  LayoutBuilderTabsState
> {
  state = {};

  render(): React.ReactNode {
    const { tabList, ...props } = this.props;

    return (
      <Tabs {...props} onChange={(tabKey: string) => this.setState({ tabKey })}>
        {tabList.map(tab => (
          <Tabs.TabPane {...tab}>{tab.content}</Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
}
