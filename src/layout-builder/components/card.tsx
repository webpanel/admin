import * as React from 'react';

import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

export interface LayoutBuilderCardProps extends CardProps {
  // content: React.ReactNode;
}

export class LayoutBuilderCard extends React.Component<LayoutBuilderCardProps> {
  render(): React.ReactNode {
    const { children, ...props } = this.props;
    return <Card {...props}>{children}</Card>;
  }
}
