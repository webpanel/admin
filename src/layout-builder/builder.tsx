import * as React from "react";

import {
  IEntityDetailConfigField,
  IEntityDetailFieldOptions,
} from "../components/pages/detail";
import {
  IEntityFormConfigField,
  IEntityFormFieldOptions,
} from "../components/form/entity-form";
import { LayoutBuilderCard, LayoutBuilderCardProps } from "./components/card";
import { LayoutBuilderCol, LayoutBuilderColProps } from "./components/col";
import {
  LayoutBuilderEditField,
  LayoutBuilderEditFieldProps,
} from "./components/edit-field";
import { LayoutBuilderRow, LayoutBuilderRowProps } from "./components/row";
import {
  LayoutBuilderStringField,
  LayoutBuilderStringFieldProps,
} from "./components/string-field";
import { LayoutBuilderTabs, LayoutBuilderTabsProps } from "./components/tabs";
import {
  LayoutBuilderValue,
  LayoutBuilderValueProps,
} from "./components/value";
import { Resource, ResourceID } from "webpanel-data";
import { Thunk, resolveOptionalThunk, resolveThunk } from "ts-thunk";

import { Descriptions } from "antd";
import { DescriptionsProps } from "antd/lib/descriptions";
import { Entity } from "../model/Entity";
import { EntityField } from "../model/EntityField";
import { FormInstance } from "webpanel-antd";
import { LayoutBuilderEditButton } from "./components/edit-button";
import { Translation } from "react-i18next";

export interface LayoutBuilderConfig {
  entity: Entity;
  id?: ResourceID;
  data: any;
  formInstance?: FormInstance;
  resource: Resource;
}

type IEntityBuilderConfigField =
  | IEntityDetailConfigField
  | IEntityFormConfigField;
type IEntityBuilderFieldOptions =
  | IEntityFormFieldOptions
  | IEntityDetailFieldOptions;
export class LayoutBuilder {
  constructor(public readonly config: LayoutBuilderConfig) {}

  isLoading(): boolean {
    return this.config.resource.loading;
  }
  isInitLoading(): boolean {
    const resource = this.config.resource;
    return resource.loading && !resource.polling;
  }

  public get data(): any {
    return this.config.data;
  }
  public get resourceID(): ResourceID | undefined {
    return this.config.id;
  }
  public get entity(): Entity {
    return this.config.entity;
  }

  getFieldsFromThunk(
    fields?: Thunk<IEntityBuilderConfigField[]>
  ): IEntityBuilderFieldOptions[] {
    let fs: IEntityBuilderFieldOptions[] = [];
    const _fields = resolveOptionalThunk(fields);
    if (typeof _fields !== "undefined") {
      fs = _fields.map((f) => {
        let _f: IEntityDetailFieldOptions = { field: null };
        if (typeof f === "string" || f === null) {
          return { field: f };
        } else {
          _f = f;
        }
        return _f;
      });
    }
    return fs;
  }

  public getDefaultDetailContent(config?: {
    descriptions?: DescriptionsProps;
    fields?: Thunk<IEntityBuilderConfigField[]>;
  }): React.ReactNode {
    return this.getDescriptions(config);
  }
  public getDescriptions(config?: {
    descriptions?: DescriptionsProps;
    fields?: Thunk<IEntityBuilderConfigField[]>;
  }): React.ReactNode {
    if (!this.resourceID) {
      return "missing resourceID";
    }
    let entityFields: EntityField<any, any>[] = this.entity.getDetailFields(
      this.resourceID
    );
    let descriptionItems: {
      field: EntityField<any, any> | null;
      span?: number;
    }[] = entityFields.map((field) => ({
      field,
    }));

    if (config && config.fields) {
      const fs = this.getFieldsFromThunk(config.fields);
      descriptionItems = fs.map((f) => {
        return {
          field: (f.field && this.entity.getFieldOrFail(f.field)) || null,
          span: f["span"] || 1,
        };
      });
    }

    return (
      <Translation>
        {(t) => (
          <Descriptions
            bordered={true}
            size="small"
            column={{ md: 2, xs: 1 }}
            {...(config && config.descriptions)}
          >
            {descriptionItems.map((item, i) => (
              <Descriptions.Item
                span={item.span}
                key={`${(item.field && item.field.name) || "empty"}_${i}`}
                label={
                  item.field &&
                  t(`${this.entity.name}.${item.field.name}`, {
                    defaultValue: item.field.title,
                  })
                }
              >
                {item.field ? item.field.render(this.data) || "–" : ""}
              </Descriptions.Item>
            ))}
          </Descriptions>
        )}
      </Translation>
    );
  }
  public getDefaultEditContent(config?: {
    fields?: Thunk<IEntityBuilderConfigField[]>;
  }): React.ReactNode {
    let fields: EntityField<any, any>[] = this.entity.getEditFields(
      this.resourceID
    );
    if (config && config.fields) {
      fields = this.getFieldsFromThunk(config.fields)
        .map((f) => (f.field && this.entity.getFieldOrFail(f.field)) || null)
        .filter((x) => x) as EntityField<any, any>[];
    }
    return fields.map((f) => this.editField({ name: f.name }));
  }

  card(
    props: Thunk<LayoutBuilderCardProps, LayoutBuilderConfig>
  ): React.ReactNode {
    return <LayoutBuilderCard {...resolveThunk(props, this.config)} />;
  }

  row(
    props: Thunk<LayoutBuilderRowProps, LayoutBuilderConfig>
  ): React.ReactNode {
    return <LayoutBuilderRow {...resolveThunk(props, this.config)} />;
  }

  col(
    props: Thunk<LayoutBuilderColProps, LayoutBuilderConfig>
  ): React.ReactNode {
    return <LayoutBuilderCol {...resolveThunk(props, this.config)} />;
  }

  tabs(
    props: Thunk<LayoutBuilderTabsProps, LayoutBuilderConfig>
  ): React.ReactNode {
    // const tabProps = Array.isArray(tabList) ? { tabList } : tabList;
    return <LayoutBuilderTabs {...resolveThunk(props, this.config)} />;
  }

  value(
    props: Thunk<LayoutBuilderValueProps, LayoutBuilderConfig>
  ): React.ReactNode {
    return (
      <LayoutBuilderValue
        {...resolveThunk(props, this.config)}
        entity={this.config.entity}
        data={this.config.data}
      />
    );
  }

  stringField(
    props: Thunk<LayoutBuilderStringFieldProps, LayoutBuilderConfig>
  ): React.ReactNode {
    return (
      <LayoutBuilderStringField
        {...resolveThunk(props, this.config)}
        entity={this.config.entity}
        data={this.config.data}
      />
    );
  }

  editField(
    props: Thunk<LayoutBuilderEditFieldProps, LayoutBuilderConfig>
  ): React.ReactNode {
    return (
      <LayoutBuilderEditField
        key={`LayoutBuilderEditField_${this.config.entity.name}_${props.name}`}
        {...resolveThunk(props, this.config)}
        entity={this.config.entity}
      />
    );
  }

  editButton(): React.ReactNode {
    return (
      <LayoutBuilderEditButton
        entity={this.config.entity}
        data={this.config.data}
      />
    );
  }

  formValue(name: string): any {
    return this.config.formInstance?.getFieldValue(name);
  }
}
