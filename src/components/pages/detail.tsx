import "../../../styles/form-detail.css";

import * as React from "react";

import { Card, Result } from "antd";
import Modal, { ModalProps } from "antd/lib/modal";
import { ResourceID, useResource } from "webpanel-data";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { CardProps } from "antd/lib/card";
import { DescriptionsProps } from "antd/lib/descriptions";
import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
// import { Link  } from 'react-router-dom';
import { useTranslation } from "react-i18next";

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
  modal?: ModalProps; // this should inside wrapperType modal as {type:"modal", modal:{...}} similarly as with edit/detail button
  desriptions?: DescriptionsProps;
  card?: CardProps;
}
export interface IEntityDetailProps extends IEntityDetailConfig {
  entity: Entity;
  resourceID: ResourceID;
}

export const EntityDetail = (props: IEntityDetailProps) => {
  const {
    entity,
    resourceID,
    pollInterval,
    wrapperType,
    modal,
    card,
    fields,
  } = props;

  let entityFields: EntityField<any, any>[] = entity.getDetailFields(
    resourceID
  );

  const { t } = useTranslation();
  const resource = useResource({
    name: entity.name,
    id: resourceID,
    dataSource: entity.dataSource,
    fields: [
      "id",
      ...(entityFields
        .map((x) => x && x.fetchField())
        .filter((x) => x) as string[]),
    ],
    pollInterval: pollInterval,
  });

  if (!resource.loading && resource.data === null) {
    return <Result status="404" />;
  }

  const _fields = resolveOptionalThunk(fields);
  if (typeof _fields !== "undefined") {
    entityFields = _fields
      .map((f) => {
        const fieldName = typeof f === "string" ? f : f?.field;
        if (!fieldName) {
          return null;
        }
        return entity.getFieldOrFail(fieldName);
      })
      .filter((x) => x) as EntityField<any, any>[];
  }

  const content = entity.getCardLayout("detail", {
    entity,
    resource,
    id: resourceID,
    data: resource.data || {},
  });
  const getTitle = (): string => {
    return (
      t(`${entity.name}._title`, {
        defaultValue: entity.title,
      }) +
      ": " +
      ((resource.data && entity.render(resource.data)) || "-")
    );
  };

  switch (wrapperType) {
    case "plain":
      return <>content</>;
    case "modal":
      return (
        <Modal title={getTitle()} {...modal}>
          {content}
        </Modal>
      );
    default:
      return (
        <Card
          title={getTitle()}
          loading={resource.loading && !resource.polling}
          extra={
            entity.updateable(resource.data) && entity.getEditButton(resourceID)
          }
          {...card}
        >
          {content}
        </Card>
      );
  }
};
