import { Card, Form, Button } from "antd";
import * as React from "react";
// import { Link  } from 'react-router-dom';
import { Link } from "webpanel-antd";
import { Resource, ResourceLayer } from "webpanel-data";

import { Entity } from "../../model/Entity";

export interface IEntityDetailProps {
  entity: Entity<any>;
  resourceID: string | number;
}

export class EntityDetail extends React.Component<IEntityDetailProps> {
  public render() {
    const { entity, resourceID } = this.props;

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
        id={resourceID}
        dataSource={entity.dataSource}
        fields={[
          "id",
          ...(entity.detailFields
            .map(x => x.fetchField())
            .filter(x => x) as string[])
        ]}
        render={(resource: Resource) => {
          const layout = entity.getLayout("detail", {
            entity,
            id: resourceID,
            data: resource.data || {}
          });
          if (layout) return layout;
          return (
            <Card
              title={entity.title}
              extra={
                <Link to={`${resourceID}/edit`}>
                  <Button size="small" htmlType="button" icon="edit" />
                </Link>
              }
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
          );
        }}
      />
    );
  }
}
