import { Card, Form } from 'antd';
import * as React from 'react';
// import { Link  } from 'react-router-dom';
import { RouteComponentProps } from 'webpanel-antd';
import { Resource, ResourceLayer } from 'webpanel-data';

import { Entity } from '../../model/Entity';

export interface IEntityDetailProps {
  entity: Entity<any>;
  route: RouteComponentProps<any>;
}

export class EntityDetail extends React.Component<IEntityDetailProps> {
  public render() {
    const { entity } = this.props;
    const {
      route: {
        match: {
          params: { id }
        }
      }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <ResourceLayer
        name={entity.name}
        id={id}
        dataSource={entity.dataSource}
        fields={['id', ...entity.detailFields.map(x => x.fetchField)]}
        render={(resource: Resource) => (
          <Card
          // title={entity.title}
          // extra={
          //   <Link to={`${id}/edit`}>
          //     <Button htmlType="button">Edit</Button>
          //   </Link>
          // }
          >
            <Form>
              {entity.detailFields.map((field, i) => (
                <Form.Item
                  key={`${field.name}_${i}`}
                  label={field.title}
                  {...formItemLayout}
                >
                  {resource.data && field.render(resource.data)}
                </Form.Item>
              ))}
            </Form>
          </Card>
        )}
      />
    );
  }
}
