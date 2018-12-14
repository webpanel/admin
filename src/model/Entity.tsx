import * as inflection from 'inflection';
import * as React from 'react';
import { Redirect } from 'react-router';

import { Layout, RouteComponentProps } from 'webpanel-antd';
import { DataSource, SortInfo } from 'webpanel-data';
// import { Button } from 'antd';

import { EntityList, IEntityListConfig } from '../components/pages/list';
import { IEntityDetailProps } from '../components/pages/detail';
import { EntityField, IEntityFieldConfig } from './EntityField';
import { EntityDetailLayout } from '../components/layouts/entity.detail';
import {
  EntityEditLayout,
  IEntityEditLayoutProps
} from '../components/layouts/entity.edit';
import {
  EntityFieldDate,
  IEntityFieldDateConfig
} from './fields/EntityFieldDate';
import { EntityFieldNumber } from './fields/EntityFieldNumber';
import { EntityFieldText } from './fields/EntityFieldText';
import {
  EntityFieldBoolean,
  IEntityFieldBooleanConfig
} from './fields/EntityFieldBoolean';
import {
  IEntityFieldRelationshipConfig,
  EntityFieldRelationship
} from './fields/EntityFieldRelationship';
import { EntityFieldColor } from './fields/EntityFieldColor';
import {
  EntityFieldEnum,
  IEntityFieldEnumConfig
} from './fields/EntityFieldEnum';
import { Thunk, resolveThunk, resolveOptionalThunk } from 'ts-thunk';
import { IEntityEditFormProps } from '../components/pages/edit';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { LayoutBuilder } from '../layout-builder';
import { LayoutBuilderConfig } from '../layout-builder/builder';
import { entityPermission, componentPermission } from './permissions';

export interface IEntityConfig<T> {
  name: Thunk<string>;
  icon?: Thunk<string>;
  dataSource: Thunk<DataSource>;
  title?: Thunk<string>;
  enabled?: Thunk<boolean>;
  showDetailPage?: Thunk<boolean>;
  layouts?: {
    detail?: (
      props: IEntityDetailProps
    ) => React.ReactElement<IEntityDetailProps>;
    edit?: (
      props: IEntityEditLayoutProps
    ) => React.ReactElement<IEntityEditLayoutProps>;
    create?: (
      props: IEntityEditLayoutProps
    ) => React.ReactElement<IEntityEditLayoutProps>;
  };
  list?: IEntityListConfig;
  edit?: { form?: IEntityEditFormProps };

  searchable?: boolean;
  initialSorting?: SortInfo[];
  initialFilters?: DataSourceArgumentMap;
  render?: ((value: T | null) => string);
}

export class Entity<T> {
  public fields: EntityField<T, any>[] = [];

  autopermissions?: boolean;

  constructor(private readonly config: IEntityConfig<T>) {}

  public get structureName(): string {
    return `${inflection.transform(resolveThunk(this.config.name), [
      'tableize',
      'dasherize',
      'pluralize'
    ])}`;
  }

  public get title(): string {
    return (
      resolveOptionalThunk(this.config.title) ||
      inflection.titleize(resolveThunk(this.config.name))
    );
  }

  public get enabled(): boolean {
    const val = resolveOptionalThunk(this.config.enabled);
    if (typeof val !== 'undefined') return val;
    return entityPermission(this, 'list');
  }

  public get showDetailPage(): boolean {
    return resolveOptionalThunk(this.config.showDetailPage) || false;
  }

  public get name(): string {
    return resolveThunk(this.config.name);
  }

  public get dataSource(): DataSource {
    return resolveThunk(this.config.dataSource);
  }

  public get render(): ((value: T | null) => string) {
    if (this.config.render) {
      return this.config.render;
    }
    return (value: any) => {
      if (value === null || typeof value !== 'object') {
        return '–';
      }
      return this.searchableFields.map(x => value[x.name]).join(', ');
    };
  }

  public get initialSorting(): SortInfo[] | undefined {
    return this.config.initialSorting;
  }
  public get initialFilters(): DataSourceArgumentMap | undefined {
    return this.config.initialFilters;
  }
  public get searchable(): boolean {
    return this.config.searchable || false;
  }

  public getField(name: string): EntityField<T, any> | null {
    const filtered = this.fields.filter(f => f.name === name);
    return filtered.length > 0 ? filtered[0] : null;
  }

  public get listFields(): EntityField<T, any>[] {
    return this.fields.filter(f => f.visible('list'));
  }
  public get editFields(): EntityField<T, any>[] {
    return this.fields.filter(f => f.visible('edit'));
  }
  public get detailFields(): EntityField<T, any>[] {
    return this.fields.filter(f => f.visible('detail'));
  }
  public get searchableFields(): EntityField<T, any>[] {
    const fields = this.fields.filter(f => f.visible('search', true));
    if (fields.length === 0 && this.listFields.length > 0) {
      return [this.listFields[0]];
    }
    return fields;
  }

  public get detailLayout():
    | ((props: IEntityDetailProps) => React.ReactElement<IEntityDetailProps>)
    | undefined {
    return this.config.layouts && this.config.layouts.detail;
  }

  public get editLayout():
    | ((
        props: IEntityEditLayoutProps
      ) => React.ReactElement<IEntityEditLayoutProps>)
    | undefined {
    return this.config.layouts && this.config.layouts.edit;
  }

  public get createLayout():
    | ((
        props: IEntityEditLayoutProps
      ) => React.ReactElement<IEntityEditLayoutProps>)
    | undefined {
    return this.config.layouts && this.config.layouts.create;
  }

  private layouts: {
    [key: string]: (builder: LayoutBuilder) => React.ReactNode;
  } = {};
  public setLayout = (
    type: 'detail' | 'edit',
    fn: (builder: LayoutBuilder) => React.ReactNode
  ) => {
    this.layouts[type] = fn;
  };

  public getLayout(
    type: 'detail' | 'edit',
    config: LayoutBuilderConfig
  ): React.ReactNode | null {
    const builder = new LayoutBuilder(config);
    const fn = this.layouts[type];
    if (fn) {
      return fn(builder);
    }
    return null;
  }

  public menuItem = (): React.ReactNode => {
    return (
      componentPermission(this.structureName) && (
        <Layout.MenuItem
          key={this.structureName}
          title={this.title}
          icon={resolveOptionalThunk(this.config.icon) || 'folder'}
        />
      )
    );
  };

  public structureItem = (): React.ReactNode => {
    return (
      <Layout.StructureItem
        key={`/${this.structureName}`}
        name={this.title}
        header={
          {
            // title: undefined //this.title,
            // action: (
            //   <Link to="new">
            //     <Button htmlType="button">+</Button>
            //   </Link>
            // )
          }
        }
        content={this.getListView()}
      >
        <Layout.StructureItem
          key="/new"
          name="New"
          header={
            {
              // title: 'New'
            }
          }
          content={this.getCreatePageLayout}
        />
        <Layout.StructureItem
          key="/:id"
          name="Detail"
          header={(route: RouteComponentProps<any>) => ({
            // title: `Detail`,
            // action: (
            //   <Link to={`${route.match.params.id}/edit`}>
            //     <Button htmlType="button">Edit</Button>
            //   </Link>
            // )
          })}
          content={this.getDetailPageLayout}
        />
        <Layout.StructureItem
          key="/:id/edit"
          name="Edit"
          header={
            {
              // title: 'Edit'
            }
          }
          content={this.getEditPageLayout}
        />
      </Layout.StructureItem>
    );
  };

  private getDetailPageLayout = (route: RouteComponentProps<any>) => {
    if (this.config.showDetailPage) {
      if (this.detailLayout) {
        return this.detailLayout({ entity: this, route });
      }
      return <EntityDetailLayout entity={this} route={route} />;
    }

    return <Redirect to={`${route.match.params.id}/edit`} />;
  };

  private getEditPageLayout = (route: RouteComponentProps<any>) => {
    if (this.editLayout) {
      return this.editLayout({ entity: this, route });
    }
    return (
      <EntityEditLayout entity={this} route={route} {...this.config.edit} />
    );
  };

  private getCreatePageLayout = (route: RouteComponentProps<any>) => {
    if (this.editLayout) {
      return this.editLayout({ entity: this, route });
    }
    return (
      <EntityEditLayout entity={this} route={route} {...this.config.edit} />
    );
  };

  // views
  public getListView = (): React.ReactNode => {
    return (
      <EntityList
        entity={this}
        dataSource={this.dataSource}
        {...this.config.list}
      />
    );
  };

  // fields
  public inputField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityField(name, config || {}, this));
    return this;
  }
  // deprecated
  public stringField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    return this.inputField(name, config);
  }
  public textField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldText(name, config || {}, this));
    return this;
  }
  public numberField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldNumber(name, config || {}, this));
    return this;
  }
  public dateField(
    name: string,
    config?: IEntityFieldDateConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldDate(name, config || {}, this));
    return this;
  }
  public booleanField(
    name: string,
    config?: IEntityFieldBooleanConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldBoolean(name, config || {}, this));
    return this;
  }
  public relationshipField(
    name: string,
    config: IEntityFieldRelationshipConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldRelationship(name, config, this));
    return this;
  }
  public colorField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldColor(name, config || {}, this));
    return this;
  }
  public enumField(name: string, config: IEntityFieldEnumConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldEnum(name, config, this));
    return this;
  }
}
