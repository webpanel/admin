import * as React from 'react';
import { Row } from 'antd';
import { RowProps } from 'antd/lib/row';

import '../../../styles/layout-row.css';

export interface LayoutBuilderRowProps extends RowProps {
  // content: React.ReactNode;
}

export class LayoutBuilderRow extends React.Component<LayoutBuilderRowProps> {
  render() {
    const { children, ...props } = this.props;
    props.gutter = props.gutter || 8;
    props.style = props.style || {};
    props.style.marginBottom = props.style.marginBottom || '8px';
    return (
      <Row {...props} className={'butter-wrapper'}>
        {children}
      </Row>
    );
  }
}
