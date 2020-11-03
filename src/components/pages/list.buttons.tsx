import * as React from "react";

import { EditOutlined, SearchOutlined } from "@ant-design/icons";

import { ActionButtonProps } from "webpanel-antd/lib/table/ResourceTableActionButtons";
import { Button } from "antd";
import { Entity } from "../../model/Entity";
import { Link } from "webpanel-antd";
import { ResourceID } from "webpanel-data";

export type EntityListSize = "small" | "default";

export interface EntityListActionButtonProps<T extends { id: ResourceID }>
  extends ActionButtonProps<T> {
  entity: Entity<T>;
}
export type EntitylistActionButton<T extends { id: ResourceID } = any> =
  | "detail"
  | "edit"
  | "delete"
  | React.ReactNode
  | ((props: EntityListActionButtonProps<T>) => React.ReactNode);

export const detailListButton = (
  props: EntityListActionButtonProps<any>,
  size: EntityListSize
) => (
  <Link
    key="detail-button-action"
    to={props.entity.getDetailLink(props.resourceID)}
  >
    <Button
      size={size == "small" ? "small" : undefined}
      icon={<SearchOutlined />}
    />
  </Link>
);

export const editListButton = (
  props: EntityListActionButtonProps<any>,
  size: EntityListSize
) => (
  <Link
    key="edit-button-action"
    to={{
      pathname: props.entity.getEditLink(props.resourceID),
      state: { goBackEnabled: true },
    }}
  >
    <Button
      size={size == "small" ? "small" : undefined}
      icon={<EditOutlined />}
    />
  </Link>
);
