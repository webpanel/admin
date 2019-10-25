import * as React from 'react';

import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { Button } from 'antd';
import { Entity } from '../../model/Entity';
import { Link } from 'webpanel-antd';

export type EntityListSize = 'small' | 'default';

export interface EntityListActionButtonProps<T> extends ActionButtonProps<T> {
  entity: Entity<T>;
}
export type EntitylistActionButton<T = any> =
  | 'detail'
  | 'edit'
  | 'delete'
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
    <Button size={size} icon="search" />
  </Link>
);

export const editListButton = (
  props: EntityListActionButtonProps<any>,
  size: EntityListSize
) => (
  <Link
    key="edit-button-action"
    to={props.entity.getEditLink(props.resourceID)}
  >
    <Button size={size} icon="edit" />
  </Link>
);
