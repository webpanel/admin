import * as React from 'react';

import { Button, Card, Form } from 'antd';
import { Resource, ResourceLayer } from 'webpanel-data';

import { Entity } from '../../model/Entity';
// import { Link  } from 'react-router-dom';
import { Link } from 'webpanel-antd';
import { Translation } from 'react-i18next';

export interface IEntityDetailConfig {
  pollInterval?: number;
}
export interface IEntityDetailProps extends IEntityDetailConfig {
  entity: Entity<any>;
  resourceID: string | number;
}

export class EntityDetail extends React.Component<IEntityDetailProps> {
  public render(): React.ReactNode {
    const { entity, resourceID, pollInterval } = this.props;

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
      <Translation>
        {t => (
          <ResourceLayer
            name={entity.name}
            id={resourceID}
            dataSource={entity.dataSource}
            fields={[
              'id',
              ...(entity.detailFields
                .map(x => x.fetchField())
                .filter(x => x) as string[])
            ]}
            pollInterval={pollInterval}
            render={(resource: Resource) => {
              const layout = entity.getLayout('detail', {
                entity,
                resource,
                id: resourceID,
                data: resource.data || {}
              });
              if (layout) return layout;
              return (
                <Card
                  title={t(entity.title)}
                  loading={resource.loading && !resource.polling}
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
                        label={t(field.title)}
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
        )}
      </Translation>
    );
  }
}
