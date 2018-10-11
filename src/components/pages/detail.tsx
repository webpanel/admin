import { Button, Card, Col, Row } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'webpanel-antd';
import {
  Resource,
  ResourceLayer,
} from 'webpanel-data';

import { Entity } from '../../model/Entity';

export interface IEntityDetailProps {
  entity: Entity<any>;
  route: RouteComponentProps<any>;
}

export class EntityDetail extends React.Component<IEntityDetailProps> {
  public render() {
    const { entity } = this.props;
    const { route: { match: { params: { id } } } } = this.props;

    return (
      <ResourceLayer
        name={entity.name}
        id={id}
        dataSource={entity.dataSource}
        fields={['id', ...entity.listFields.map(x => x.fetchField)]}
        render={(resource: Resource) => (
          <Card
            title={entity.title}
            extra={
              <Link to={`${id}/edit`}>
                <Button htmlType="button">Edit</Button>
              </Link>
            }
          >
            {
              entity.listFields.map((field, i) => (
                <Row key={field.name}>
                  <Col span={12}>
                    {`${field.title}`}
                  </Col>
                  <Col span={12}>
                    {resource.data && resource.data[field.name]}
                  </Col>
                </Row>
              ))
            }
          </Card>
        )}
      />
    );
  }
}
