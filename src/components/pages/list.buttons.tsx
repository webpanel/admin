import * as React from 'react';

import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { Button } from 'antd';
import { Entity } from '../../model/Entity';
import { Link } from 'webpanel-antd';

export type EntityListSize = 'small' | 'default';

export interface EntityListActionButtonProps extends ActionButtonProps {
  entity: Entity<any>;
}
export type EntitylistActionButton =
  | 'detail'
  | 'edit'
  | 'delete'
  | React.ReactNode
  | ((props: EntityListActionButtonProps) => React.ReactNode);

export const detailListButton = (
  props: EntityListActionButtonProps,
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
  props: EntityListActionButtonProps,
  size: EntityListSize
) => (
  <Link
    key="edit-button-action"
    to={props.entity.getEditLink(props.resourceID)}
  >
    <Button size={size} icon="edit" />
  </Link>
);
