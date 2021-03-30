import "../../../styles/form-detail.css";

import * as React from "react";

import Modal, { ModalProps } from "antd/lib/modal";

import { Card } from "antd";
import { CardProps } from "antd/lib/card";
import { DescriptionsProps } from "antd/lib/descriptions";
import { Entity } from "../../model/Entity";
import { PageNotFound } from "./not-found";
import { ResourceID } from "webpanel-data";
import { Thunk } from "ts-thunk";
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
  const { entity, resourceID, pollInterval, wrapperType, modal, card } = props;

  const { t } = useTranslation();
  const resource = entity.useResource(resourceID, {
    pollInterval: pollInterval,
  });

  if (!resource.loading && resource.data === null) {
    return <PageNotFound />;
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
            resource.data &&
            entity.updateable(resource.data) &&
            entity.getEditButton(resourceID)
          }
          {...card}
        >
          {content}
        </Card>
      );
  }
};
