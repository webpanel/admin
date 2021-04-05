import "../../../styles/entity-list.css";

import * as React from "react";

import { Button, Card, Space, Tooltip } from "antd";
import { Entity, EntityDataType } from "../../model/Entity";
import {
  EntitylistActionButton,
  detailListButton,
  editListButton,
} from "./list.buttons";
import {
  ResourceCollection,
  ResourceCollectionLayer,
  ResourceCollectionOptions,
} from "webpanel-data";
import {
  ResourceSearchInput,
  ResourceTable,
  ResourceTableActionButtonProps,
} from "webpanel-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { CardProps } from "antd/lib/card";
import { CreateEntityProps } from "../buttons/EntityAddButton";
import { EntityField } from "../../model/EntityField";
import { FilterOutlined } from "@ant-design/icons";
import { ListCell } from "./list-cell";
import { ResourceTableColumn } from "webpanel-antd/lib/table/ResourceTable";
import { ResourceTablePropsActionButton } from "webpanel-antd/lib/table/ResourceTableActionButtons";
import { Translation } from "react-i18next";
import i18next from "i18next";

export interface IEntityListTableProps
  extends TableProps<any>,
    ResourceCollectionOptions<any> {
  actionButtons?: Thunk<EntitylistActionButton[], any>;
  actionButtonsTitle?: React.ReactNode;
  actionButtonsFixed?: boolean;
  pagination?: TablePaginationConfig | false;
}

export type IEntityListColumnRender = (
  value: any,
  values: any,
  index: number,
  field: EntityField<any, any>
) =>
  | React.ReactNode
  | {
      children: React.ReactNode;
      props: { rowSpan: number; colSpan: number };
    };

export type IEntityListColumnAlign = "left" | "right" | "center";

export type IEntityListColumn<T = any> =
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
      titleRender?: (props: EntityListTitleRenderProps<T>) => React.ReactNode;
    };

export interface IEntityListConfig<T extends EntityDataType>
  extends ResourceCollectionOptions<T> {
  table?: IEntityListTableProps;
  card?: CardProps;
  searchable?: boolean;
  // deprecated, please use addButton property
  showAddButton?: boolean;
  addButton?: Thunk<
    boolean | CreateEntityProps | React.ReactNode,
    { collection: ResourceCollection<T> }
  >;
  title?: string;
  fields?: Thunk<IEntityListColumn<T>[]>;
  editableFields?: Thunk<string[]>;
  // default: card
  wrapperType?: "card" | "plain";
}

export interface IEntityListProps<T extends EntityDataType>
  extends IEntityListConfig<T> {
  entity: Entity<T>;
}

export interface EntityListTitleRenderProps<T> {
  title: string;
  data: T[] | undefined;
}

export class EntityList<T extends EntityDataType = any> extends React.Component<
  IEntityListProps<T>,
  { version: number }
> {
  public state = { version: 0 };

  getColumns(
    listFields: {
      field: EntityField<any, any>;
      render?: IEntityListColumnRender;
      align?: IEntityListColumnAlign;
      titleRender?: (props: EntityListTitleRenderProps<T>) => React.ReactNode;
    }[],
    resource: ResourceCollection<T>,
    t: i18next.TFunction
  ): ResourceTableColumn[] {
    const { entity, editableFields } = this.props;

    const _editableFields = resolveOptionalThunk(editableFields) || [];
    const entityListFields = listFields.map((x) => x.field);

    return listFields.map(
      (column): ResourceTableColumn => {
        const { field, render, align, titleRender } = column;
        const _align = align || field.listColumnAlign;
        const fieldTitle = t(field.titleTranslationKey, {
          defaultValue: field.shortTitle,
        });
        const title = titleRender
          ? titleRender({ title: fieldTitle, data: resource.data })
          : fieldTitle;
        return {
          align: _align,
          key: field.name,
          dataIndex: field.name,
          title: title,
          sorter: field.sortable,
          sortColumns: field.sortColumns(),

          filterDropdown: field.filter
            ? field.filterDropdown(resource)
            : undefined,
          filterNormalize: field.filterNormalizeFn(),
          filterDenormalize: field.filterDenormalizeFn(),

          render: (value: any, record: any, index: number): React.ReactNode => {
            const values = record;
            if (render) {
              return render(value, values, index, field);
            }
            return (
              <ListCell
                collection={resource}
                values={values}
                field={field}
                editable={
                  entity.updateable(record) &&
                  _editableFields.indexOf(field.name) > -1 &&
                  field.writeable
                }
                fields={entityListFields}
              />
            );
          },
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

    const _fields = resolveOptionalThunk(
      fields || entity.getListConfig()?.fields
    );
    let listFields: {
      field: EntityField<any, any>;
      hidden: boolean;
      render?: IEntityListColumnRender;
      align?: IEntityListColumnAlign;
      titleRender?: (props: EntityListTitleRenderProps<T>) => React.ReactNode;
    }[] = [];

    if (_fields) {
      for (let f of _fields) {
        const fieldName = typeof f === "string" ? f : f.field;
        const render = (typeof f !== "string" && f.render) || undefined;
        const hidden = (typeof f !== "string" && f.hidden) || false;
        const align = (typeof f !== "string" && f.align) || undefined;
        const titleRender =
          (typeof f !== "string" && f.titleRender) || undefined;
        const field = entity.getField(fieldName);
        if (!field) {
          throw new Error(
            `Field '${fieldName}' not found in entity '${entity.name}'`
          );
        }
        listFields.push({ field, hidden, render, align, titleRender });
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
      addButton,
    } = this.props;

    const _searchable =
      typeof searchable !== "undefined" ? searchable : entity.searchable;

    let _addButton = resolveOptionalThunk(addButton, {
      collection: resource,
    });
    if (typeof showAddButton !== "undefined") {
      _addButton = showAddButton;
    }

    if (typeof _addButton === "undefined" || _addButton === true) {
      _addButton = {
        flow: "redirect",
      };
    }

    const hasTableFilter = typeof resource.namedFilter("table") !== "undefined";
    return (
      <Card
        bodyStyle={{ padding: "0" }}
        title={
          title ||
          t(`${entity.name}._title`, { count: 100, defaultValue: entity.title })
        }
        {...card}
        extra={[
          card && card.extra,
          <Space>
            {hasTableFilter && (
              <Tooltip
                title={
                  <Translation ns="webpanel-admin">
                    {(t) => t("clearFilter")}
                  </Translation>
                }
              >
                <Button
                  icon={<FilterOutlined />}
                  danger={true}
                  size="small"
                  onClick={async () => {
                    await resource.updateNamedFilters("table", undefined);
                    await resource.reload();
                  }}
                />
              </Tooltip>
            )}
            {_searchable && (
              <ResourceSearchInput
                key="searchInput"
                resourceCollection={resource}
                size="small"
                style={{
                  width: "100%",
                  minWidth: 100,
                  maxWidth: 150,
                  marginRight: 8,
                }}
              />
            )}

            {_addButton &&
              entity.creatable &&
              (React.isValidElement(_addButton)
                ? _addButton
                : entity.getCreateButton({
                    key: "create",
                    button: { size: "small" },
                    onSave: () => resource.reload(),
                    ...(typeof _addButton === "object" ? _addButton : {}),
                  }))}
          </Space>,
        ].filter((x) => x)}
      >
        {this.tableContent(resource, t)}
      </Card>
    );
  }

  private tableActionButtons(
    resourceValues: T,
    buttons?: EntitylistActionButton[]
  ): ResourceTablePropsActionButton<T>[] {
    const { entity, table } = this.props;
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
              if (!entity.updateable(resourceValues)) {
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
              if (!entity.deletable(resourceValues)) {
                return null;
              }
              return "delete";
            default:
              return item;
          }
        }
      )
      .filter((x) => x);
  }

  private tableContent(
    resource: ResourceCollection<T>,
    t: i18next.TFunction
  ): React.ReactNode {
    const { entity, table } = this.props;

    const defaultPagination: TablePaginationConfig = {
      defaultPageSize: 30,
      pageSizeOptions: ["10", "20", "30", "50", "100"],
      showSizeChanger: true,
      showTotal: (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} / ${total}`,
    };

    return (
      <>
        <ResourceTable
          key={
            "table_" +
            resource.name +
            "_" +
            (resource.loading ? "loading" : "loaded")
          }
          className="entitytable"
          scroll={{ x: true }}
          resourceCollection={resource}
          pagination={{ ...defaultPagination, ...(table && table.pagination) }}
          customDetailURL={(resourceID: string) => {
            return entity.getDetailLink(resourceID);
          }}
          {...table}
          actionButtons={(values) =>
            this.tableActionButtons(
              values,
              resolveOptionalThunk(table?.actionButtons, values)
            )
          }
          columns={this.getColumns(
            this.getListFields().filter((x) => !x.hidden),
            resource,
            t
          )}
        />
      </>
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
        .map((x) => x.field.fetchField())
        .filter((x) => x) as string[]),
    ];

    // const resource = useResourceCollection({
    //   name: entity.name,
    //   dataSource: this.props.dataSource,
    //   ...restProps,
    //   fields,
    //   initialSorting:initialSorting || entity.initialSorting,
    //   initialFilters:initialFilters || entity.initialFilters
    // });

    return (
      <Translation>
        {(t) => (
          <ResourceCollectionLayer
            name={entity.resourceName}
            dataSource={entity.dataSource}
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
