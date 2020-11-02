import * as React from "react";

import { Col } from "antd";
import { ColProps } from "antd/lib/col";

export interface LayoutBuilderColProps extends ColProps {
  // content: React.ReactNode;
}

export class LayoutBuilderCol extends React.Component<LayoutBuilderColProps> {
  render(): React.ReactNode {
    const { children, ...props } = this.props;
    return (
      <Col span={24} {...props}>
        {children}
      </Col>
    );
  }
}
