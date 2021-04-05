import * as React from "react";

import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Entity, EntityDataType } from "../../model/Entity";

import { ActionButtonProps } from "webpanel-antd/lib/table/ResourceTableActionButtons";
import { Button } from "antd";
import { Link } from "webpanel-antd";

export type EntityListSize = "small" | "default";

export interface EntityListActionButtonProps<T extends EntityDataType>
  extends ActionButtonProps<T> {
  entity: Entity<T>;
}
export type EntitylistActionButton<T extends EntityDataType = any> =
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
