import "../../../styles/form-detail.css";

import * as React from "react";

import { Card, Descriptions } from "antd";
import Modal, { ModalProps } from "antd/lib/modal";
import { Resource, ResourceID, ResourceLayer } from "webpanel-data";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { DescriptionsProps } from "antd/lib/descriptions";
import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
// import { Link  } from 'react-router-dom';
import { TFunction } from "i18next";
import { Translation } from "react-i18next";

export interface IEntityDetailFieldOptions {
  field: string | null;
  span?: number;
}

export type IEntityDetailConfigField =
  | IEntityDetailFieldOptions
  | string
  | null;

export interface IEntityDetailConfig {
  fields?: Thunk<IEntityDetailConfigField[]>;
  pollInterval?: number;
  wrapperType?: "card" | "plain" | "modal";
  modal?: ModalProps;
  desriptions?: DescriptionsProps;
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

    let entityFields: EntityField<any, any>[] = entity.detailFields;
    let descriptionItems: {
      field: EntityField<any, any> | null;
      span?: number;
    }[] = entityFields.map(field => ({
      field
    }));
    const _fields = resolveOptionalThunk(fields);
    if (typeof _fields !== "undefined") {
      const fs: IEntityDetailFieldOptions[] = _fields.map(f => {
        let _f: IEntityDetailFieldOptions = { field: null };
        if (typeof f === "string" || f === null) {
          return { field: f };
        } else {
          _f = f;
        }
        return _f;
      });
      descriptionItems = fs.map(f => {
        return {
          field: (f.field && entity.getFieldOrFail(f.field)) || null,
          span: f.span
        };
      });
    }

    const contentFn = (resource: Resource, t: TFunction) => (
      <Descriptions
        bordered={true}
        size="small"
        column={{ md: 2, xs: 1 }}
        {...this.props.desriptions}
      >
        {descriptionItems.map((item, i) => (
          <Descriptions.Item
            span={item.span}
            key={`${(item.field && item.field.name) || "empty"}_${i}`}
            label={
              item.field &&
              t(`${entity.name}.${item.field.name}`, {
                defaultValue: item.field.title
              })
            }
          >
            {item.field
              ? (resource.data && item.field.render(resource.data)) || "–"
              : ""}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );

    return (
      <Translation>
        {t => (
          <ResourceLayer
            name={entity.name}
            id={resourceID}
            dataSource={entity.dataSource}
            fields={[
              "id",
              ...(descriptionItems
                .map(x => x.field && x.field.fetchField())
                .filter(x => x) as string[])
            ]}
            pollInterval={pollInterval}
            render={(resource: Resource) => {
              const layout = entity.getLayout("detail", {
                entity,
                resource,
                id: resourceID,
                data: resource.data || {}
              });
              if (layout) return layout;
              const content = contentFn(resource, t);
              switch (wrapperType) {
                case "plain":
                  return content;
                case "modal":
                  return <Modal {...modal}>{content}</Modal>;
                default:
                  return (
                    <Card
                      title={t(`${entity.name}._title`, {
                        defaultValue: entity.title
                      })}
                      loading={resource.loading && !resource.polling}
                      extra={
                        entity.updateable && entity.getEditButton(resourceID)
                      }
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
