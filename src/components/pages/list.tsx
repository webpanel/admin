import "../../../styles/entity-list.css";

import * as React from "react";

import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer,
  ResourceCollectionOptions
} from "webpanel-data";
import {
  EntitylistActionButton,
  detailListButton,
  editListButton
} from "./list.buttons";
import { PaginationConfig, TableProps } from "antd/lib/table";
import {
  ResourceSearchInput,
  ResourceTable,
  ResourceTableActionButtonProps
} from "webpanel-antd";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { Card } from "antd";
import { CardProps } from "antd/lib/card";
import { CreateEntityProps } from "../buttons/EntityAddButton";
import { Entity } from "../../model/Entity";
import { EntityField } from "../../model/EntityField";
import { ListCell } from "./list-cell";
import { ResourceTableColumn } from "webpanel-antd/lib/table/ResourceTable";
import { ResourceTablePropsActionButton } from "webpanel-antd/lib/table/ResourceTableActionButtons";
import { Translation } from "react-i18next";
import i18next from "i18next";

export interface IEntityListTableProps
  extends TableProps<any>,
    ResourceCollectionOptions<any> {
  // deprecated, use size instead
  condensed?: boolean;
  actionButtons?: EntitylistActionButton[];
  actionButtonsTitle?: React.ReactNode;
  actionButtonsFixed?: boolean;
  pagination?: PaginationConfig | false;
}

export type IEntityListColumnRender = (
  value: any,
  values: any,
  index: number,
  field: EntityField<any, any>
) =>
  | React.ReactNode
  | {
      childre: React.ReactNode;
      props: { rowSpan: number; colSpan: number };
    };

export type IEntityListColumnAlign = "left" | "right" | "center";

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
      align?: IEntityListColumnAlign;
    };

export interface IEntityListConfig<T> extends ResourceCollectionOptions<T> {
  table?: IEntityListTableProps;
  card?: CardProps;
  searchable?: boolean;
  // deprecated, please use addButton property
  showAddButton?: boolean;
  addButton?: boolean | CreateEntityProps;
  title?: string;
  fields?: Thunk<IEntityListColumn[]>;
  editableFields?: Thunk<string[]>;
  // default: card
  wrapperType?: "card" | "plain";
}

export interface IEntityListProps<T> extends IEntityListConfig<T> {
  entity: Entity<T>;
  dataSource: DataSource;
}

export class EntityList<T = any> extends React.Component<IEntityListProps<T>> {
  getColumns(
    listFields: {
      field: EntityField<any, any>;
      render?: IEntityListColumnRender;
      align?: IEntityListColumnAlign;
    }[],
    resource: ResourceCollection<T>,
    t: i18next.TFunction
  ): ResourceTableColumn[] {
    const { entity, editableFields } = this.props;

    const _editableFields =
      (entity.updateable && resolveOptionalThunk(editableFields)) || [];

    const rowValues = {};

    return listFields.map(
      (column): ResourceTableColumn => {
        const { field, render, align } = column;
        const _align = align || field.listColumnAlign;
        return {
          align: _align,
          key: field.name,
          dataIndex: field.name,
          title: t(`${field.entity.name}.${field.name}`, {
            defaultValue: field.shortTitle
          }),
          sorter: field.sortable,
          sortColumns: field.sortColumns(),

          filterDropdown: field.filter
            ? field.filterDropdown(resource)
            : undefined,
          filterNormalize: field.filterNormalizeFn(),
          filterDenormalize: field.filterDenormalizeFn(),

          render: (value: any, record: any, index: number): React.ReactNode => {
            const values = rowValues[record.id] || record;
            if (render) {
              return render(value, values, index, field);
            }
            return (
              <ListCell
                collection={resource}
                values={values}
                field={field}
                editable={
                  _editableFields.indexOf(field.name) > -1 && field.writeable
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
    align?: IEntityListColumnAlign;
  }[] {
    const { entity, fields } = this.props;

    const _fields = resolveOptionalThunk(fields);
    let listFields: {
      field: EntityField<any, any>;
      hidden: boolean;
      render?: IEntityListColumnRender;
      align?: IEntityListColumnAlign;
    }[] = [];
    if (_fields) {
      for (let f of _fields) {
        const fieldName = typeof f === "string" ? f : f.field;
        const render = (typeof f !== "string" && f.render) || undefined;
        const hidden = (typeof f !== "string" && f.hidden) || false;
        const align = (typeof f !== "string" && f.align) || undefined;
        const field = entity.getField(fieldName);
        if (!field) {
          throw new Error(
            `Field '${fieldName}' not found in entity '${entity.name}'`
          );
        }
        listFields.push({ field, hidden, render, align });
      }
    } else {
      for (let f of entity.getListFields()) {
        listFields.push({ field: f, hidden: false });
      }
    }
    return listFields;
  }

  private cardContent(
    resource: ResourceCollection<T>,
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
      typeof searchable !== "undefined" ? searchable : entity.searchable;

    let _addButton = addButton;
    if (typeof showAddButton !== "undefined") {
      _addButton = showAddButton;
    }

    if (typeof _addButton === "undefined" || _addButton === true) {
      _addButton = {
        flow: "redirect"
      };
    }

    return (
      <Card
        bodyStyle={{ padding: "0" }}
        title={
          title ||
          t(`${entity.name}._title`, { count: 100, defaultValue: entity.title })
        }
        {...card}
        extra={[
          _searchable && (
            <ResourceSearchInput
              key="searchInput"
              resourceCollection={resource}
              size="small"
              style={{
                width: "100%",
                minWidth: 100,
                maxWidth: 150,
                marginRight: 8
              }}
            />
          ),
          _addButton &&
            entity.creatable &&
            entity.getCreateButton({
              button: { size: "small" },
              onCreate: () => resource.reload(),
              ...(typeof _addButton === "object" ? _addButton : {})
            }),
          // <EntityAddButton
          //   key="addButton"
          //   entity={entity}
          //   onCreate={() => resource.reload()}
          //   {..._addButton}
          // />
          card && card.extra
        ].filter(x => x)}
      >
        {this.tableContent(resource, t)}
      </Card>
    );
  }

  private tableActionButtons(
    buttons?: EntitylistActionButton[]
  ): ResourceTablePropsActionButton<T>[] {
    const { entity, table } = this.props;
    if (table && table.condensed) {
      table.size = "small";
    }
    const size = table && table.size === "small" ? "small" : "default";
    if (typeof buttons === "undefined") {
      buttons = ["detail", "edit", "delete"];
    }
    return buttons
      .map(
        (item: EntitylistActionButton): ResourceTablePropsActionButton<T> => {
          if (typeof item === "function") {
            return (props: ResourceTableActionButtonProps<T>) =>
              item({ ...props, entity });
          }
          switch (item) {
            case "edit":
              if (!entity.updateable) {
                return null;
              }
              return (props: ResourceTableActionButtonProps<T>) =>
                editListButton({ ...props, entity }, size);
            case "detail":
              if (!entity.showDetailPage) {
                return null;
              }
              return (props: ResourceTableActionButtonProps<T>) =>
                detailListButton({ ...props, entity }, size);
            case "delete":
              if (!entity.deletable) {
                return null;
              }
              return "delete";
            default:
              return item;
          }
        }
      )
      .filter(x => x);
  }

  private tableContent(
    resource: ResourceCollection<T>,
    t: i18next.TFunction
  ): React.ReactNode {
    const { entity, table } = this.props;

    const defaultPagination: PaginationConfig = {
      defaultPageSize: 30,
      pageSizeOptions: ["10", "20", "30", "50", "100"],
      showSizeChanger: true,
      showTotal: (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} / ${total}`
    };

    return (
      <ResourceTable
        className="entitytable"
        scroll={{ x: true }}
        resourceCollection={resource}
        pagination={{ ...defaultPagination, ...(table && table.pagination) }}
        customDetailURL={(resourceID: string) => {
          return entity.getDetailLink(resourceID);
        }}
        {...table}
        actionButtons={this.tableActionButtons(table && table.actionButtons)}
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
      wrapperType,
      ...restProps
    } = this.props;

    const fields = [
      "id",
      ...(this.getListFields()
        .map(x => x.field.fetchField())
        .filter(x => x) as string[])
    ];
    return (
      <Translation>
        {t => (
          <ResourceCollectionLayer
            name={entity.name}
            dataSource={this.props.dataSource}
            {...restProps}
            fields={fields}
            initialSorting={initialSorting || entity.initialSorting}
            initialFilters={initialFilters || entity.initialFilters}
            // pollInterval={pollInterval}
            render={(resource: ResourceCollection<any>) =>
              wrapperType === "plain"
                ? this.tableContent(resource, t)
                : this.cardContent(resource, t)
            }
          />
        )}
      </Translation>
    );
  }
}
