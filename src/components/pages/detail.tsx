import '../../../styles/form-detail.css';

import * as React from 'react';

import { Card, Form } from 'antd';
import Modal, { ModalProps } from 'antd/lib/modal';
import { Resource, ResourceID, ResourceLayer } from 'webpanel-data';
import { Thunk, resolveOptionalThunk } from 'ts-thunk';

import { Entity } from '../../model/Entity';
// import { Link  } from 'react-router-dom';
import { TFunction } from 'i18next';
import { Translation } from 'react-i18next';

export interface IEntityDetailConfig {
  fields?: Thunk<string[]>;
  pollInterval?: number;
  wrapperType?: 'card' | 'plain' | 'modal';
  modal?: ModalProps;
}
export interface IEntityDetailProps extends IEntityDetailConfig {
  entity: Entity;
  resourceID: ResourceID;
}

export class EntityDetail extends React.Component<IEntityDetailProps> {
  public render(): React.ReactNode {
    const {
      entity,
      resourceID,
      pollInterval,
      wrapperType,
      fields,
      modal
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

    let entityFields = entity.detailFields;
    const _fields = resolveOptionalThunk(fields);
    if (typeof _fields !== 'undefined') {
      entityFields = _fields.map(name => entity.getFieldOrFail(name));
    }

    const contentFn = (resource: Resource, t: TFunction) => (
      <Form className="webpanel-form-detail">
        {entityFields.map((field, i) => (
          <Form.Item
            key={`${field.name}_${i}`}
            label={t(`${entity.name}.${field.name}`, {
              defaultValue: field.title
            })}
            {...formItemLayout}
          >
            {resource.data && field.render(resource.data)}
          </Form.Item>
        ))}
      </Form>
    );

    return (
      <Translation>
        {t => (
          <ResourceLayer
            name={entity.name}
            id={resourceID}
            dataSource={entity.dataSource}
            fields={[
              'id',
              ...(entityFields
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
              const content = contentFn(resource, t);
              switch (wrapperType) {
                case 'plain':
                  return content;
                case 'modal':
                  return <Modal {...modal}>{content}</Modal>;
                default:
                  return (
                    <Card
                      title={t(`${entity.name}._title`, {
                        defaultValue: entity.title
                      })}
                      loading={resource.loading && !resource.polling}
                      extra={entity.getEditButton(resourceID)}
                    >
                      {content}
                    </Card>
                  );
              }
            }}
          />
        )}
      </Translation>
    );
  }
}
