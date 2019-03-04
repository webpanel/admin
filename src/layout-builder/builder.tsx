import * as React from "react";
import { FormContext } from "webpanel-antd/lib/form/form/Form";
import { Thunk, resolveThunk } from "ts-thunk";

import { LayoutBuilderTabs, LayoutBuilderTabsProps } from "./components/tabs";
import { LayoutBuilderRow, LayoutBuilderRowProps } from "./components/row";
import { LayoutBuilderCol, LayoutBuilderColProps } from "./components/col";
// import {
//   LayoutBuilderContent,
//   BuilderContentFunctionProps
//   // LayoutBuilderContentProps
// } from './builder-content';
import {
  LayoutBuilderStringField,
  LayoutBuilderStringFieldProps
} from "./components/string-field";
import { LayoutBuilderCard, LayoutBuilderCardProps } from "./components/card";
import { Entity } from "../model/Entity";
import { LayoutBuilderEditButton } from "./components/edit-button";
import {
  LayoutBuilderEditField,
  LayoutBuilderEditFieldProps
} from "./components/edit-field";

export interface LayoutBuilderConfig {
  entity: Entity<any>;
  id?: string | number;
  data: any;
  formContext?: FormContext;
}

export class LayoutBuilder {
  constructor(public readonly config: LayoutBuilderConfig) {}

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
