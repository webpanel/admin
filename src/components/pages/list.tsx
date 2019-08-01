import * as React from 'react';
import * as i18next from 'i18next';

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
import {
  EntityAddButton,
  IEntityAddButtonProps
} from '../buttons/EntityAddButton';
import { Link, ResourceSearchInput, ResourceTable } from 'webpanel-antd';
import { Thunk, resolveOptionalThunk } from 'ts-thunk';
import { entityPermission, fieldPermission } from '../../model/permissions';

import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { Entity } from '../../model/Entity';
import { EntityField } from '../../model/EntityField';
import { ListCell } from './list-cell';
import { PaginationConfig } from 'antd/lib/table';
import { ResourceTableColumn } from 'webpanel-antd/lib/table/ResourceTable';
import { Translation } from 'react-i18next';

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
  // deprecated, please use addButton property
  showAddButton?: boolean;
  addButton?: boolean | IEntityAddButtonProps;
  title?: string;
  fields?: Thunk<IEntityListColumn[]>;
  editableFields?: Thunk<string[]>;
  initialSorting?: SortInfo[];
  initialFilters?: DataSourceArgumentMap;
  initialLimit?: number;
  autopersistConfigKey?: string;
  pollInterval?: number;
  // default: card
  displayMode?: 'card' | 'plain';
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
    resource: ResourceCollection,
    t: i18next.TFunction
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
          title: t(field.name, { defaultValue: field.shortTitle }),
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

  private getListFields(): {
    field: EntityField<any, any>;
    hidden: boolean;
    render?: IEntityListColumnRender;
  }[] {
    const { entity, fields } = this.props;

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
    return listFields;
  }

  private cardContent(
    resource: ResourceCollection,
    t: i18next.TFunction
  ): React.ReactNode {
    const {
      entity,
      card,
      title,
      searchable,
      showAddButton,
      addButton
    } = this.props;

    const _searchable =
      typeof searchable !== 'undefined' ? searchable : entity.searchable;

    let _addButton = addButton;
    if (typeof showAddButton !== 'undefined') {
      _addButton = showAddButton;
    }

    if (typeof _addButton === 'undefined' || _addButton === true) {
      _addButton = {
        flow: 'redirect'
      };
    }

    return (
      <Card
        bodyStyle={{ padding: '0' }}
        title={title || t(entity.title, { count: 5 })}
        extra={[
          _searchable && (
            <ResourceSearchInput
              key="searchInput"
              resourceCollection={resource}
              size="small"
              style={{ width: 300, marginRight: 8 }}
            />
          ),
          _addButton && entityPermission(entity, 'create') && (
            <EntityAddButton
              entity={entity}
              onCreate={() => resource.reload()}
              {..._addButton}
            />
          ),
          card && card.extra
        ].filter(x => x)}
      >
        {this.tableContent(resource, t)}
      </Card>
    );
  }

  private tableContent(
    resource: ResourceCollection,
    t: i18next.TFunction
  ): React.ReactNode {
    const { entity, table } = this.props;

    const size = table && table.condensed ? 'small' : 'default';

    return (
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
          entity.showDetailPage
            ? (props: ActionButtonProps) => (
                <Link
                  key="detail-button-action"
                  to={entity.getDetailLink(props.resourceID)}
                >
                  <Button size={size}>
                    <Icon type={entity.showDetailPage ? 'search' : 'edit'} />
                  </Button>
                </Link>
              )
            : null,
          entityPermission(entity, 'update')
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
          this.getListFields().filter(x => !x.hidden),
          resource,
          t
        )}
      />
    );
  }

  public render(): React.ReactNode {
    const {
      entity,
      initialFilters,
      initialSorting,
      initialLimit,
      autopersistConfigKey,
      pollInterval,
      displayMode
    } = this.props;

    return (
      <Translation>
        {t => (
          <ResourceCollectionLayer
            name={entity.name}
            dataSource={this.props.dataSource}
            autopersistConfigKey={autopersistConfigKey}
            fields={[
              'id',
              ...(this.getListFields()
                .map(x => x.field.fetchField())
                .filter(x => x) as string[])
            ]}
            initialSorting={initialSorting || entity.initialSorting}
            initialFilters={initialFilters || entity.initialFilters}
            initialLimit={initialLimit}
            pollInterval={pollInterval}
            render={(resource: ResourceCollection) =>
              displayMode && displayMode === 'plain'
                ? this.tableContent(resource, t)
                : this.cardContent(resource, t)
            }
          />
        )}
      </Translation>
    );
  }
}
