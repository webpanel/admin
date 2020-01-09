import * as React from "react";

import {
  IEntityDetailConfigField,
  IEntityDetailFieldOptions
} from "../components/pages/detail";
import { LayoutBuilderCard, LayoutBuilderCardProps } from "./components/card";
import { LayoutBuilderCol, LayoutBuilderColProps } from "./components/col";
import {
  LayoutBuilderEditField,
  LayoutBuilderEditFieldProps
} from "./components/edit-field";
import { LayoutBuilderRow, LayoutBuilderRowProps } from "./components/row";
import {
  LayoutBuilderStringField,
  LayoutBuilderStringFieldProps
} from "./components/string-field";
import { LayoutBuilderTabs, LayoutBuilderTabsProps } from "./components/tabs";
import {
  LayoutBuilderValue,
  LayoutBuilderValueProps
} from "./components/value";
import { Resource, ResourceID } from "webpanel-data";
import { Thunk, resolveOptionalThunk, resolveThunk } from "ts-thunk";

import { Descriptions } from "antd";
import { DescriptionsProps } from "antd/lib/descriptions";
import { Entity } from "../model/Entity";
import { EntityField } from "../model/EntityField";
import { FormContext } from "webpanel-antd/lib/form/form/Form";
import { LayoutBuilderEditButton } from "./components/edit-button";
import { Translation } from "react-i18next";

export interface LayoutBuilderConfig {
  entity: Entity;
  id?: ResourceID;
  data: any;
  formContext?: FormContext;
  resource: Resource;
}

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

  public getDefaultDetailContent(config?: {
    descriptions?: DescriptionsProps;
    fields?: Thunk<IEntityDetailConfigField[]>;
  }): React.ReactNode {
    return this.getDescriptions(config);
  }
  public getDescriptions(config?: {
    descriptions?: DescriptionsProps;
    fields?: Thunk<IEntityDetailConfigField[]>;
  }): React.ReactNode {
    let entityFields: EntityField<any, any>[] = this.entity.detailFields;
    let descriptionItems: {
      field: EntityField<any, any> | null;
      span?: number;
    }[] = entityFields.map(field => ({
      field
    }));

    const _fields = resolveOptionalThunk(config && config.fields);
    if (typeof _fields !== "undefined") {
      const fs: IEntityDetailFieldOptions[] = _fields.map(f => {
        let _f: IEntityDetailFieldOptions = { field: null };
        if (typeof f === "string" || f === null) {
          return { field: f };
        } else {
          _f = f;
        }
        return _f;
      });
      descriptionItems = fs.map(f => {
        return {
          field: (f.field && this.entity.getFieldOrFail(f.field)) || null,
          span: f.span
        };
      });
    }

    return (
      <Translation>
        {t => (
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
                    defaultValue: item.field.title
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
    const formContext = this.config.formContext;

    if (!formContext) {
      throw new Error("cannot create editField without formContext");
    }

    return (
      <LayoutBuilderEditField
        {...resolveThunk(props, this.config)}
        entity={this.config.entity}
        formContext={formContext}
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

  // render(data: any): React.ReactNode {

  // }
}
