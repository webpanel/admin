import { Card, Icon, Button } from "antd";
import * as React from "react";
import { ResourceSearchInput, ResourceTable, Link } from "webpanel-antd";
import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer,
  SortInfo
} from "webpanel-data";

import { Entity } from "../../model/Entity";
import { ActionButtonProps } from "webpanel-antd/lib/table/ResourceTableActionButtons";
import { ResourceTableColumn } from "webpanel-antd/lib/table/ResourceTable";
import { ListCell } from "./list-cell";
import { entityPermission, fieldPermission } from "../../model/permissions";
import { EntityField } from "../../model/EntityField";
import { Thunk, resolveOptionalThunk } from "ts-thunk";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";

export interface IEntityListTableProps {
  condensed?: boolean;
}

export type IEntityListColumnRender = (
  value: any,
  values: any,
  field: EntityField<any, any>
) => React.ReactNode;

export type IEntityListColumn =
  | string
  | {
      field: string;
      render?: IEntityListColumnRender;
    };

export interface IEntityListConfig {
  table?: IEntityListTableProps;
  title?: string;
  fields?: Thunk<IEntityListColumn[]>;
  editableFields?: Thunk<string[]>;
  initialSorting?: SortInfo[];
  initialFilters?: DataSourceArgumentMap;
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
      (entityPermission(entity, "update") &&
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
          filterFormatter: field.filterFormatter,

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
                  fieldPermission(field, "write")
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
      fields,
      initialFilters,
      initialSorting,
      title
    } = this.props;

    const _fields = resolveOptionalThunk(fields);
    let listFields: {
      field: EntityField<any, any>;
      render?: IEntityListColumnRender;
    }[] = [];
    if (_fields) {
      for (let f of _fields) {
        const fieldName = typeof f === "string" ? f : f.field;
        const render = (typeof f !== "string" && f.render) || undefined;
        const field = entity.getField(fieldName);
        if (!field) {
          throw new Error(
            `Field '${fieldName}' not found in entity '${entity.name}'`
          );
        }
        listFields.push({ field, render });
      }
    } else {
      for (let f of entity.listFields) {
        listFields.push({ field: f });
      }
    }

    return (
      <ResourceCollectionLayer
        name={entity.name}
        dataSource={this.props.dataSource}
        fields={[
          "id",
          ...(listFields
            .map(x => x.field.fetchField())
            .filter(x => x) as string[])
        ]}
        initialSorting={initialSorting || entity.initialSorting}
        initialFilters={initialFilters || entity.initialFilters}
        render={(resource: ResourceCollection) => (
          <Card
            bodyStyle={{ padding: "0" }}
            title={title || entity.title}
            extra={[
              entity.searchable && (
                <ResourceSearchInput
                  key="searchInput"
                  resourceCollection={resource}
                  size="small"
                  style={{ width: 300, marginRight: 8 }}
                />
              ),
              entityPermission(entity, "create") && (
                <Link to={entity.getCreateLink()} key="newButton">
                  <Button size="small" htmlType="button" icon="plus" />
                </Link>
              )
            ].filter(x => x)}
          >
            <ResourceTable
              className="entitytable"
              scroll={{ x: true }}
              resourceCollection={resource}
              pagination={{
                defaultPageSize: 30,
                pageSizeOptions: ["10", "20", "30", "50", "100"],
                showSizeChanger: true
              }}
              {...table}
              columns={this.getColumns(listFields, resource)}
              actionButtons={[
                entity.showDetailPage || entityPermission(entity, "update")
                  ? (props: ActionButtonProps) => (
                      <Link
                        key="detail-button-action"
                        to={entity.getDetailLink(props.resourceID)}
                      >
                        <Button size="small">
                          <Icon
                            type={entity.showDetailPage ? "search" : "edit"}
                          />
                        </Button>
                      </Link>
                    )
                  : null,
                entity.showDetailPage && entityPermission(entity, "update")
                  ? (props: ActionButtonProps) => (
                      <Link
                        key="edit-button-action"
                        to={entity.getEditLink(props.resourceID)}
                      >
                        <Button size="small">
                          <Icon type="edit" />
                        </Button>
                      </Link>
                    )
                  : null,
                entityPermission(entity, "delete") && "delete"
              ].filter(x => x)}
            />
          </Card>
        )}
      />
    );
  }
}
