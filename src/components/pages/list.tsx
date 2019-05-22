import * as React from 'react';

import {
  ActionButtonProps,
  ResourceTablePropsActionButton
} from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { Button, Card, Icon } from 'antd';
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer,
  SortInfo
} from 'webpanel-data';
import { Link, ResourceSearchInput, ResourceTable } from 'webpanel-antd';
import { Thunk, resolveOptionalThunk } from 'ts-thunk';
import { entityPermission, fieldPermission } from '../../model/permissions';

import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { Entity } from '../../model/Entity';
import { EntityField } from '../../model/EntityField';
import { ListCell } from './list-cell';
import { PaginationConfig } from 'antd/lib/table';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';

export interface IEntityListTableProps {
  condensed?: boolean;
  actionButtons?: ResourceTablePropsActionButton[];
  actionButtonsTitle?: React.ReactNode;
  actionButtonsFixed?: boolean;
  pagination?: PaginationConfig | false;
}

export type IEntityListColumnRender = (
  value: any,
  values: any,
  field: EntityField<any, any>
) => React.ReactNode;

export type IEntityListColumn =
  | string
  | {
      // field name
      field: string;
      // Loads fetchField in request, but doesn't display column in table
      // This can be used if you need fields from fetchField
      hidden?: boolean;
      // rendering function for table cell content
      render?: IEntityListColumnRender;
    };

export interface IEntityListConfig {
  table?: IEntityListTableProps;
  card?: { extra?: React.ReactNode };
  searchable?: boolean;
  showAddButton?: boolean;
  title?: string;
  fields?: Thunk<IEntityListColumn[]>;
  editableFields?: Thunk<string[]>;
  initialSorting?: SortInfo[];
  initialFilters?: DataSourceArgumentMap;
  initialLimit?: number;
  autopersistConfigKey?: string;
  pollInterval?: number;
}

export interface IEntityListProps extends IEntityListConfig {
  entity: Entity<any>;
  dataSource: DataSource;
}

export class EntityList extends React.Component<IEntityListProps> {
  getColumns(
    listFields: {
      field: EntityField<any, any>;
      render?: IEntityListColumnRender;
    }[],
    resource: ResourceCollection
  ): ResourceTableColumn[] {
    const { entity, editableFields } = this.props;

    const _editableFields =
      (entityPermission(entity, 'update') &&
        resolveOptionalThunk(editableFields)) ||
      [];

    const rowValues = {};

    return listFields.map(
      (column): ResourceTableColumn => {
        const { field, render } = column;
        return {
          key: field.name,
          dataIndex: field.name,
          title: field.shortTitle,
          sorter: field.sortable,

          filterDropdown: field.filter
            ? field.filterDropdown(resource)
            : undefined,
          filterNormalize: field.filterNormalize,
          filterDenormalize: field.filterDenormalize,

          render: (value: any, record: any): React.ReactNode => {
            const values = rowValues[record.id] || record;
            if (render) {
              return render(value, values, field);
            }
            return (
              <ListCell
                collection={resource}
                values={values}
                field={field}
                editable={
                  _editableFields.indexOf(field.name) > -1 &&
                  fieldPermission(field, 'write')
                }
              />
            );
          }
        };
      }
    );
  }

  public render() {
    const {
      entity,
      table,
      card,
      searchable,
      showAddButton,
      fields,
      initialFilters,
      initialSorting,
      initialLimit,
      title,
      autopersistConfigKey,
      pollInterval
    } = this.props;

    const _fields = resolveOptionalThunk(fields);
    let listFields: {
      field: EntityField<any, any>;
      hidden: boolean;
      render?: IEntityListColumnRender;
    }[] = [];
    if (_fields) {
      for (let f of _fields) {
        const fieldName = typeof f === 'string' ? f : f.field;
        const render = (typeof f !== 'string' && f.render) || undefined;
        const hidden = (typeof f !== 'string' && f.hidden) || false;
        const field = entity.getField(fieldName);
        if (!field) {
          throw new Error(
            `Field '${fieldName}' not found in entity '${entity.name}'`
          );
        }
        listFields.push({ field, hidden, render });
      }
    } else {
      for (let f of entity.listFields) {
        listFields.push({ field: f, hidden: false });
      }
    }

    const size = table && table.condensed ? 'small' : 'default';
    const _searchable =
      typeof searchable !== 'undefined' ? searchable : entity.searchable;
    const _showAddButton =
      typeof showAddButton !== 'undefined' ? showAddButton : true;

    return (
      <ResourceCollectionLayer
        name={entity.name}
        dataSource={this.props.dataSource}
        autopersistConfigKey={autopersistConfigKey}
        fields={[
          'id',
          ...(listFields
            .map(x => x.field.fetchField())
            .filter(x => x) as string[])
        ]}
        initialSorting={initialSorting || entity.initialSorting}
        initialFilters={initialFilters || entity.initialFilters}
        initialLimit={initialLimit}
        pollInterval={pollInterval}
        render={(resource: ResourceCollection) => (
          <Card
            bodyStyle={{ padding: '0' }}
            title={title || entity.title}
            extra={[
              _searchable && (
                <ResourceSearchInput
                  key="searchInput"
                  resourceCollection={resource}
                  size="small"
                  style={{ width: 300, marginRight: 8 }}
                />
              ),
              _showAddButton && entityPermission(entity, 'create') && (
                <Link to={entity.getCreateLink()} key="newButton">
                  <Button size="small" htmlType="button" icon="plus" />
                </Link>
              ),
              card && card.extra
            ].filter(x => x)}
          >
            <ResourceTable
              className="entitytable"
              scroll={{ x: true }}
              resourceCollection={resource}
              pagination={
                (table && table.pagination) || {
                  defaultPageSize: 30,
                  pageSizeOptions: ['10', '20', '30', '50', '100'],
                  showSizeChanger: true
                }
              }
              actionButtons={[
                entity.showDetailPage || entityPermission(entity, 'update')
                  ? (props: ActionButtonProps) => (
                      <Link
                        key="detail-button-action"
                        to={entity.getDetailLink(props.resourceID)}
                      >
                        <Button size={size}>
                          <Icon
                            type={entity.showDetailPage ? 'search' : 'edit'}
                          />
                        </Button>
                      </Link>
                    )
                  : null,
                entity.showDetailPage && entityPermission(entity, 'update')
                  ? (props: ActionButtonProps) => (
                      <Link
                        key="edit-button-action"
                        to={entity.getEditLink(props.resourceID)}
                      >
                        <Button size={size}>
                          <Icon type="edit" />
                        </Button>
                      </Link>
                    )
                  : null,
                entityPermission(entity, 'delete') && 'delete'
              ].filter(x => x)}
              customDetailURL={(resourceID: string) => {
                return entity.getDetailLink(resourceID);
              }}
              {...table}
              columns={this.getColumns(
                listFields.filter(x => !x.hidden),
                resource
              )}
            />
          </Card>
        )}
      />
    );
  }
}
