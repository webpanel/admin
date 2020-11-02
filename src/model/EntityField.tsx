import * as React from "react";
import * as inflection from "inflection";

import { Button, Tooltip } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Input, { InputProps } from "antd/lib/input";
import {
  ResourceTableFilterDenormalizer,
  ResourceTableFilterNormalizer,
} from "webpanel-antd";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { Entity } from "./Entity";
import FormItem from "antd/lib/form/FormItem";
import { FormLayout } from "antd/lib/form/Form";
import { IEntityListColumnAlign } from "../components/pages/list";
import { Rule } from "rc-field-form/es/interface";
import { Translation } from "react-i18next";

// import { ResourceCollection } from 'webpanel-data';

export type FieldSections = "list" | "detail" | "edit" | "search" | "custom";

export interface IEntityFieldFilterProps<T> {
  selectedKeys: T[];
  setSelectedKeys: (keys: T[]) => {};
  confirm: () => {};
  clearFilters: () => {};
}

export interface IEntityFieldInputElementProps<T = any> {
  value?: T;
  onChange?: (value?: T, stringValue?: React.ReactNode) => void;
  autoFocus?: boolean;
}

export interface IEntityFieldConfigFilter {
  range?: boolean;
  dropdownInput?: (props: IEntityFieldFilterProps<any>) => React.ReactNode;
  normalizer?: ResourceTableFilterNormalizer;
  denormalizer?: ResourceTableFilterDenormalizer;
}
const isIEntityFieldConfigFilter = (
  value: IEntityFieldConfigFilter | boolean | undefined
): value is IEntityFieldConfigFilter => {
  return typeof value === "object";
};

export interface IEntityFieldRenderOptions {
  size?: "small" | "medium" | "large";
}

export interface IEntityFieldConfig<T> {
  // header titles, bradcrumb names
  title?: Thunk<string>;
  description?: Thunk<React.ReactNode>;
  // table columns title
  shortTitle?: Thunk<string>;
  enabled?: Thunk<boolean>;
  readable?: Thunk<boolean>;
  writable?: Thunk<boolean>;
  render?: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode;
  rules?: Thunk<Rule[]>;
  attributes?: InputProps;
  sortable?: boolean | { fields: string[] };
  filter?: IEntityFieldConfigFilter | boolean;
  listColumnAlign?: IEntityListColumnAlign;
}

export class EntityField<T, C extends IEntityFieldConfig<T>> {
  constructor(
    public readonly name: string,
    protected readonly config: C,
    public readonly entity: Entity
  ) {}

  public get title(): string {
    return (
      resolveOptionalThunk(this.config.title) ||
      inflection.transform(this.name, ["underscore", "titleize"])
    );
  }

  public get shortTitle(): string {
    return resolveOptionalThunk(this.config.shortTitle) || this.title;
  }

  public get listColumnAlign(): IEntityListColumnAlign {
    return this.config.listColumnAlign || "left";
  }

  public columnName(): string {
    return this.name;
  }
  public fetchField(): string | null {
    return this.name;
  }
  public editFetchField(): string {
    return this.columnName();
  }
  public get sortable(): boolean {
    const sortable = this.config.sortable;
    switch (typeof sortable) {
      case "undefined":
        return false;
      case "boolean":
        return sortable;
      default:
        return true;
    }
  }
  public sortColumns(): string[] {
    const sortable = this.config.sortable;
    switch (typeof sortable) {
      case "undefined":
        return [];
      case "boolean":
        return [this.columnName()];
      default:
        return sortable.fields;
    }
  }
  public get filter(): boolean {
    if (typeof this.config.filter === "boolean") {
      return this.config.filter;
    }
    return typeof this.config.filter !== "undefined" || false;
  }
  public get range(): boolean {
    const filter = this.config.filter;
    if (isIEntityFieldConfigFilter(filter)) {
      return filter.range || false;
    }
    return false;
  }

  public get filterNormalize(): ResourceTableFilterNormalizer {
    return (values: string[]) => {
      let res = {};
      if (values.length == 1) {
        res[this.columnName() + "_like"] = values[0] + "*";
      } else if (values.length > 1) {
        res[this.columnName() + "_in"] = values;
      }
      return res;
    };
  }
  public filterNormalizeFn(): ResourceTableFilterNormalizer {
    const filter = this.config.filter;
    if (filter && typeof filter === "object" && filter.normalizer) {
      return filter.normalizer;
    }
    return this.filterNormalize;
  }

  public get filterDenormalize(): ResourceTableFilterDenormalizer {
    return (values: { [key: string]: any }) => {
      let res: any[] = [];
      if (values[this.columnName() + "_like"]) {
        const val = values[this.columnName() + "_like"];
        res = [val.substring(0, val.length - 1)];
      } else if (values[this.columnName() + "_in"]) {
        res = values[this.columnName() + "_in"];
      }
      return res;
    };
  }
  public filterDenormalizeFn(): ResourceTableFilterDenormalizer {
    const filter = this.config.filter;
    if (filter && typeof filter === "object" && filter.denormalizer) {
      return filter.denormalizer;
    }
    return this.filterDenormalize;
  }

  public get enabled(): boolean {
    const val = resolveOptionalThunk(this.config.enabled);
    if (typeof val !== "undefined") return val;
    return true;
  }
  public get readable(): boolean {
    if (!this.enabled) return false;
    const val = resolveOptionalThunk(this.config.readable);
    if (typeof val !== "undefined") return val;
    return true;
  }
  public get writeable(): boolean {
    if (!this.enabled) return false;
    const val = resolveOptionalThunk(this.config.writable);
    if (typeof val !== "undefined") return val;
    return true;
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    if (this.config.render) {
      return this.config.render;
    }
    return (values: T, options?: IEntityFieldRenderOptions) => {
      const value = values[this.name] || "";
      if (!value || !value.substring || value.length < 50) {
        return value;
      }
      const shortValue = value.substring(0, 50) + "...";
      return <Tooltip title={value}>{shortValue}</Tooltip>;
    };
  }

  public inputElement(props?: IEntityFieldInputElementProps): React.ReactNode {
    return "input element is empty";
  }

  public get valuePropName(): string {
    return "value";
  }

  public fieldElement(
    key: string | number,
    config: { formLayout?: FormLayout }
  ): React.ReactNode {
    const formItemLayout =
      config.formLayout === "horizontal"
        ? {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }
        : null;

    return (
      <Translation key={key}>
        {(t) => (
          <FormItem
            key={key}
            label={t(`${this.entity.name}.${this.name}`, {
              defaultValue: this.title,
            })}
            extra={resolveOptionalThunk(this.config.description)}
            name={this.columnName()}
            valuePropName={this.valuePropName}
            rules={resolveOptionalThunk(this.config.rules)}
            {...formItemLayout}
          >
            {this.inputElement()}
          </FormItem>
        )}
      </Translation>
    );
  }

  public filterDropdownInput = (
    props: IEntityFieldFilterProps<any>
  ): React.ReactNode => {
    const value = props.selectedKeys ? props.selectedKeys[0] : undefined;
    return (
      <Input
        key={`field_${this.entity.name}_${this.valuePropName}`}
        value={value}
        onChange={(e) =>
          props.setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
      />
    );
  };

  protected _filterDropdownInput = (
    props: IEntityFieldFilterProps<any>
  ): React.ReactNode => {
    const filter = this.config.filter;
    if (filter && typeof filter === "object" && filter.dropdownInput) {
      return filter.dropdownInput(props);
    }
    return this.filterDropdownInput(props);
  };

  public filterDropdown = (resource: any) => {
    return (props: IEntityFieldFilterProps<any>) => {
      return (
        <div
          style={{
            display: "flex",
            padding: "8px",
            backgroundColor: "white",
            borderRadius: "6px",
            boxShadow: "0 1px 6px rgba(0, 0, 0, .2)",
          }}
        >
          <div style={{ marginRight: 2 }}>
            {this._filterDropdownInput(props)}
          </div>
          <Button
            style={{ marginRight: 2 }}
            disabled={!props.selectedKeys}
            onClick={() => props.confirm()}
            type="primary"
            icon={<SearchOutlined />}
          />
          <Button
            disabled={!props.selectedKeys}
            onClick={() => props.clearFilters()}
            icon={<DeleteOutlined />}
          />
        </div>
      );
    };
  };
}
