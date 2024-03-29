import "../../../styles/entity-list.css";

import * as React from "react";

import { Button, Card, Space, Tooltip } from "antd";
import {
  DataSourceAggregationFunction,
  ResourceCollection,
  ResourceCollectionOptions,
  ResourceID,
  useResourceCollection,
} from "webpanel-data";
import { Entity } from "../../model/Entity";
import { EntityDataType } from "../../model/EntityBase";
import {
  EntitylistActionButton,
  detailListButton,
  editListButton,
} from "./list.buttons";
import {
  ResourceSearchInput,
  ResourceTable,
  ResourceTableActionButtonProps,
} from "webpanel-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { Thunk, resolveOptionalThunk } from "ts-thunk";
import { Translation, useTranslation } from "react-i18next";

import { CardProps } from "antd/lib/card";
import { CreateEntityProps } from "../buttons/EntityAddButton";
import { EntityField } from "../../model/EntityField";
import { FilterOutlined } from "@ant-design/icons";
import { ListCell } from "./list-cell";
import { ResourceTableColumn } from "webpanel-antd/lib/table/ResourceTable";
import { ResourceTablePropsActionButton } from "webpanel-antd/lib/table/ResourceTableActionButtons";
import i18next from "i18next";
import inflection from "inflection";

export interface IEntityListTableProps
  extends TableProps<any>,
    ResourceCollectionOptions<any> {
  actionButtons?: Thunk<EntitylistActionButton[], any>;
  actionButtonsTitle?: React.ReactNode;
  actionButtonsFixed?: boolean;
  pagination?: TablePaginationConfig | false;
  onDelete?: (id: ResourceID) => void;
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

interface EntityListField<T> {
  field: EntityField<any, any>;
  hidden: boolean;
  render?: IEntityListColumnRender;
  align?: IEntityListColumnAlign;
  titleRender?: (props: EntityListTitleRenderProps<T>) => React.ReactNode;
  aggregation?: DataSourceAggregationFunction;
  width?: number | string;
}

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
      aggregation?: DataSourceAggregationFunction;
      width?: number;
    };

export interface IEntityListConfig<T extends EntityDataType>
  extends ResourceCollectionOptions<T> {
  table?: Thunk<IEntityListTableProps, ResourceCollection<T>>;
  card?: Thunk<CardProps, ResourceCollection<T>>;
  searchable?: boolean;
  hidden?: Thunk<boolean, ResourceCollection<T>>;
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

export const EntityList = <T extends EntityDataType = any>(
  props: IEntityListProps<T>
) => {
  const getColumns = (
    listFields: EntityListField<T>[],
    resource: ResourceCollection<T>,
    t: i18next.TFunction
  ): ResourceTableColumn[] => {
    const { entity, editableFields } = props;

    const entityListFields = listFields.map((x) => x.field);

    const hasAggregations = listFields.filter((x) => x.aggregation).length > 0;

    return listFields.map((columnField): ResourceTableColumn => {
      const _editableFields = resolveOptionalThunk(editableFields) || [];
      const { field, render, align, titleRender, aggregation } = columnField;
      const _align = align || field.listColumnAlign;
      const fieldTitle = t(field.titleTranslationKey, {
        defaultValue: field.shortTitle,
      });
      const title = titleRender
        ? titleRender({ title: fieldTitle, data: resource.data })
        : fieldTitle;
      const col: ResourceTableColumn = {
        key: field.name,
        dataIndex: field.name,
        align: _align,
        width: columnField.width,
        shouldCellUpdate: (record: any, prevRecord: any) =>
          record !== prevRecord,
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
                field.isWriteable(record)
              }
              fields={entityListFields}
            />
          );
        },
      };

      if (hasAggregations) {
        col.children = [
          {
            ...col,
            className: "table-aggregation-row",
            title: () => {
              if (!aggregation) {
                return;
              }
              const key =
                col.dataIndex + inflection.camelize(aggregation.toLowerCase());
              const value = resource.aggregations && resource.aggregations[key];
              const obj = {};
              obj[field.name] = value;
              return field.render(obj);
            },
          },
        ] as any;
      }

      col.title = title;
      col.sorter = field.sortable;
      col.sortColumns = field.sortColumns();
      col.filterDropdown = field.filter
        ? field.filterDropdown(resource)
        : undefined;
      col.filterNormalize = field.filterNormalizeFn();
      col.filterDenormalize = field.filterDenormalizeFn();

      return col;
    });
  };

  const getListFields = (): EntityListField<T>[] => {
    const { entity, fields } = props;

    const _fields = resolveOptionalThunk(
      fields || entity.getListConfig()?.fields
    );
    let listFields: EntityListField<T>[] = [];

    if (_fields) {
      for (let f of _fields) {
        const fieldName = typeof f === "string" ? f : f.field;
        const render = (typeof f !== "string" && f.render) || undefined;
        const hidden = (typeof f !== "string" && f.hidden) || false;
        const align = (typeof f !== "string" && f.align) || undefined;
        const width = (typeof f !== "string" && f.width) || undefined;
        const titleRender =
          (typeof f !== "string" && f.titleRender) || undefined;
        const aggregation =
          (typeof f !== "string" && f.aggregation) || undefined;
        const field = entity.getField(fieldName);
        if (!field) {
          throw new Error(
            `Field '${fieldName}' not found in entity '${entity.name}'`
          );
        }
        listFields.push({
          field,
          hidden,
          render,
          align,
          titleRender,
          aggregation,
          width,
        });
      }
    } else {
      for (let f of entity.getListFields()) {
        listFields.push({ field: f, hidden: false });
      }
    }
    return listFields;
  };

  const cardContent = (
    resource: ResourceCollection<T>,
    t: i18next.TFunction
  ): React.ReactNode => {
    const { entity, card, title, searchable, showAddButton, addButton } = props;

    const _searchable =
      typeof searchable !== "undefined" ? searchable : entity.searchable;

    let _addButton = resolveOptionalThunk(addButton, {
      collection: resource,
    });
    if (typeof showAddButton !== "undefined") {
      _addButton = showAddButton;
    }
    let _card = resolveOptionalThunk(card, resource);

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
        key={`${entity.name}.table-card`}
        {..._card}
        extra={
          <Space key="default-buttons">
            {_card && _card.extra}
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
          </Space>
        }
      >
        {tableContent(resource, t)}
      </Card>
    );
  };

  const tableActionButtons = (
    resourceValues: T,
    resourceCollection: ResourceCollection<T>,
    buttons?: EntitylistActionButton[]
  ): ResourceTablePropsActionButton<T>[] => {
    const { entity, table: _table } = props;
    const table = resolveOptionalThunk(_table, resourceCollection);
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
  };

  const tableContent = (
    resource: ResourceCollection<T>,
    t: i18next.TFunction
  ): React.ReactNode => {
    const { entity, table: _table } = props;
    const table = resolveOptionalThunk(_table, resource);

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
          key={"table_" + resource.name}
          className="entitytable"
          scroll={{ x: true }}
          resourceCollection={resource}
          pagination={{ ...defaultPagination, ...(table && table.pagination) }}
          customDetailURL={(resourceID: string) => {
            return entity.getDetailLink(resourceID);
          }}
          {...table}
          actionButtons={(values) =>
            tableActionButtons(
              values,
              resource,
              resolveOptionalThunk(table?.actionButtons, values)
            )
          }
          columns={getColumns(
            getListFields().filter((x) => !x.hidden),
            resource,
            t
          )}
          onRowDelete={(id) => {
            if (table?.onDelete) {
              table.onDelete(id);
            }
          }}
        />
      </>
    );
  };

  const {
    entity,
    initialFilters,
    initialSorting,
    wrapperType,
    aggregations,
    hidden,
    ...restProps
  } = props;

  const fields = [
    "id",
    ...(getListFields()
      .map((x) => x.field.fetchField())
      .filter((x) => x) as string[]),
  ];

  const allAggregations = aggregations || [];
  for (const f of getListFields()) {
    if (f.aggregation) {
      allAggregations.push({ name: f.field.name, function: f.aggregation });
    }
  }

  const resource = useResourceCollection({
    name: entity.resourceName,
    dataSource: entity.dataSource,
    ...restProps,
    fields,
    aggregations:
      Object.keys(allAggregations).length > 0 ? allAggregations : undefined,
    initialSorting: initialSorting || entity.initialSorting,
    initialFilters: initialFilters || entity.initialFilters,
  });
  const { t } = useTranslation();

  const isHidden = resolveOptionalThunk(hidden, resource);
  if (isHidden) {
    return null;
  }

  return (
    <>
      {wrapperType === "plain"
        ? tableContent(resource, t)
        : cardContent(resource, t)}
    </>
  );
};
