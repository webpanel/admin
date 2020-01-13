import "../../../styles/form-detail.css";

import * as React from "react";

import Modal, { ModalProps } from "antd/lib/modal";
import { Resource, ResourceID, ResourceLayer } from "webpanel-data";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { Card } from "antd";
import { CardProps } from "antd/lib/card";
import { DescriptionsProps } from "antd/lib/descriptions";
import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
// import { Link  } from 'react-router-dom';
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
  card?: CardProps;
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
      modal,
      card,
      fields
    } = this.props;

    let entityFields: EntityField<any, any>[] = entity.detailFields;
    const _fields = resolveOptionalThunk(fields);
    if (typeof _fields !== "undefined") {
      entityFields = _fields
        .map(f => {
          const fieldName = typeof f === "string" ? f : f?.field;
          if (!fieldName) {
            return null;
          }
          return entity.getFieldOrFail(fieldName);
        })
        .filter(x => x) as EntityField<any, any>[];
    }

    return (
      <Translation>
        {t => (
          <ResourceLayer
            name={entity.name}
            id={resourceID}
            dataSource={entity.dataSource}
            fields={[
              "id",
              ...(entityFields
                .map(x => x && x.fetchField())
                .filter(x => x) as string[])
            ]}
            pollInterval={pollInterval}
            render={(resource: Resource) => {
              const content = entity.getLayout("detail", {
                entity,
                resource,
                id: resourceID,
                data: resource.data || {}
              });
              switch (wrapperType) {
                case "plain":
                  return content;
                case "modal":
                  return <Modal {...modal}>{content}</Modal>;
                default:
                  return (
                    <Card
                      title={
                        t(`${entity.name}._title`, {
                          defaultValue: entity.title
                        }) +
                        ": " +
                        ((resource.data && entity.render(resource.data)) || "-")
                      }
                      loading={resource.loading && !resource.polling}
                      extra={
                        entity.updateable && entity.getEditButton(resourceID)
                      }
                      {...card}
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
