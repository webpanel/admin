import * as React from 'react';

import { LayoutBuilderCard, LayoutBuilderCardProps } from './components/card';
import { LayoutBuilderCol, LayoutBuilderColProps } from './components/col';
import {
  LayoutBuilderEditField,
  LayoutBuilderEditFieldProps
} from './components/edit-field';
import { LayoutBuilderRow, LayoutBuilderRowProps } from './components/row';
// import {
//   LayoutBuilderContent,
//   BuilderContentFunctionProps
//   // LayoutBuilderContentProps
// } from './builder-content';
import {
  LayoutBuilderStringField,
  LayoutBuilderStringFieldProps
} from './components/string-field';
import { LayoutBuilderTabs, LayoutBuilderTabsProps } from './components/tabs';
import {
  LayoutBuilderValue,
  LayoutBuilderValueProps
} from './components/value';
import { Thunk, resolveThunk } from 'ts-thunk';

import { Entity } from '../model/Entity';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { LayoutBuilderEditButton } from './components/edit-button';
import { Resource } from 'webpanel-data';

export interface LayoutBuilderConfig {
  entity: Entity<any>;
  id?: string | number;
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
      throw new Error('cannot create editField without formContext');
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
