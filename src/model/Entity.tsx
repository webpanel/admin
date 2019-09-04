import * as React from 'react';
import * as inflection from 'inflection';

import { DataSource, SortInfo } from 'webpanel-data';
import {
  EntityEditLayout,
  IEntityEditLayoutProps
} from '../components/layouts/entity.edit';
import { EntityField, IEntityFieldConfig } from './EntityField';
import {
  EntityFieldBoolean,
  IEntityFieldBooleanConfig
} from './fields/EntityFieldBoolean';
import {
  EntityFieldComputed,
  IEntityFieldComputedConfig
} from './fields/EntityFieldComputed';
import {
  EntityFieldDate,
  IEntityFieldDateConfig
} from './fields/EntityFieldDate';
import {
  EntityFieldEnum,
  IEntityFieldEnumConfig
} from './fields/EntityFieldEnum';
import {
  EntityFieldFile,
  IEntityFieldFileConfig
} from './fields/EntityFieldFile';
import {
  EntityFieldRelationship,
  IEntityFieldRelationshipConfig
} from './fields/EntityFieldRelationship';
import { EntityList, IEntityListConfig } from '../components/pages/list';
import {
  EntityOnSaveHandler,
  IEntityEditConfig
} from '../components/pages/edit';
import {
  IEntityDetailConfig,
  IEntityDetailProps
} from '../components/pages/detail';
import { Layout, RouteComponentProps } from 'webpanel-antd';
import { Thunk, resolveOptionalThunk, resolveThunk } from 'ts-thunk';
import { componentPermission, entityPermission } from './permissions';

import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { EntityDetailLayout } from '../components/layouts/entity.detail';
import { EntityFieldColor } from './fields/EntityFieldColor';
import { EntityFieldNumber } from './fields/EntityFieldNumber';
import { EntityFieldPasssword } from './fields/EntityFieldPassword';
import { EntityFieldText } from './fields/EntityFieldText';
import { LayoutBuilder } from '../layout-builder';
import { LayoutBuilderConfig } from '../layout-builder/builder';
import { Redirect } from 'react-router';
import { SaveOption } from '../components/form/buttons';
import { Translation } from 'react-i18next';

// import { Button } from 'antd';

export interface IEntityConfig<T> {
  name: Thunk<string>;
  icon?: Thunk<string>;
  dataSource: Thunk<DataSource>;
  title?: Thunk<string>;
  enabled?: Thunk<boolean>;
  showDetailPage?: Thunk<boolean>;
  layouts?: Thunk<{
    detail?: (props: IEntityDetailProps) => React.ReactNode;
    edit?: (props: IEntityEditLayoutProps) => React.ReactNode;
    create?: (props: IEntityEditLayoutProps) => React.ReactNode;
  }>;
  list?: Thunk<IEntityListConfig>;
  edit?: Thunk<IEntityEditConfig>;
  detail?: Thunk<IEntityDetailConfig>;

  searchable?: boolean;
  // render loaded entity to string (in search fields etc.)
  // only fields with {visible:['search']} are loaded for rendering
  render?: (value: T | null) => string;

  // deprecated, user table config directly
  initialSorting?: SortInfo[];
  // deprecated, user table config directly
  initialFilters?: DataSourceArgumentMap;
}

export class Entity<T = any> {
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

  public get render(): (value: T | null) => string {
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
    const list = resolveOptionalThunk(this.config.list);
    return (list && list.initialSorting) || this.config.initialSorting;
  }
  public get initialFilters(): DataSourceArgumentMap | undefined {
    const list = resolveOptionalThunk(this.config.list);
    return (list && list.initialFilters) || this.config.initialFilters;
  }
  public get searchable(): boolean {
    return this.config.searchable || false;
  }

  public getField(name: string): EntityField<T, any> | null {
    const filtered = this.fields.filter(f => f.name === name);
    return filtered.length > 0 ? filtered[0] : null;
  }

  public get listFields(): EntityField<T, any>[] {
    return this.fields.filter(f => f.visible('list', 'read'));
  }
  public get editFields(): EntityField<T, any>[] {
    return this.fields.filter(f => f.visible('edit', 'write'));
  }
  public get detailFields(): EntityField<T, any>[] {
    return this.fields.filter(f => f.visible('detail', 'read'));
  }
  public get searchableFields(): EntityField<T, any>[] {
    const fields = this.fields.filter(f => f.visible('search', 'read', true));
    if (fields.length === 0 && this.listFields.length > 0) {
      return [this.listFields[0]];
    }
    return fields;
  }

  public get detailLayout():
    | ((props: IEntityDetailProps) => React.ReactNode)
    | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    if (!layouts) return undefined;
    return layouts.detail;
  }

  public get editLayout():
    | ((
        props: IEntityEditLayoutProps,
        resourceID: string | number
      ) => React.ReactNode)
    | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    return layouts && layouts.edit;
  }

  public get createLayout():
    | ((props: IEntityEditLayoutProps) => React.ReactNode)
    | undefined {
    const layouts = resolveOptionalThunk(this.config.layouts);
    return layouts && layouts.create;
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
          title={
            <Translation>
              {t =>
                t(`${this.name}._title`, {
                  count: 100,
                  defaultValue: this.title
                })
              }
            </Translation>
          }
          icon={resolveOptionalThunk(this.config.icon) || 'folder'}
        />
      )
    );
  };

  public structureItem = (): React.ReactNode => {
    return (
      <Layout.StructureItem
        key={this.getListLink()}
        name={
          <Translation>
            {t =>
              t(`${this.name}._title`, { count: 100, defaultValue: this.title })
            }
          </Translation>
        }
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
        content={() => this.getListView(resolveOptionalThunk(this.config.list))}
      >
        <Layout.StructureItem
          key="/new"
          name={
            <Translation>
              {t => t('common.new', { defaultValue: 'New' })}
            </Translation>
          }
          header={
            {
              // title: 'New'
            }
          }
          content={this.getCreatePageLayout}
        />
        <Layout.StructureItem
          key="/:id"
          name={
            <Translation>
              {t => t('common.detail', { defaultValue: 'Detail' })}
            </Translation>
          }
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
          name={
            <Translation>
              {t => t('common.edit', { defaultValue: 'Edit' })}
            </Translation>
          }
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

  private getDetailPageLayout = (
    route: RouteComponentProps<any>,
    config?: IEntityDetailConfig
  ) => {
    const resourceID = route.match.params.id;
    if (this.config.showDetailPage) {
      if (this.detailLayout) {
        return this.detailLayout({
          entity: this,
          resourceID,
          ...(config || this.config.detail)
        });
      }
      return (
        <EntityDetailLayout
          entity={this}
          resourceID={resourceID}
          {...resolveOptionalThunk(this.config.detail)}
          {...config}
        />
      );
    }

    return <Redirect to={`${resourceID}/edit`} />;
  };

  private handleFormOnSave = (route: RouteComponentProps<any>) => (
    id: string | number,
    option: SaveOption
  ) => {
    switch (option) {
      case 'add':
        route.history.push(this.getCreateLink());
        break;
      case 'edit':
        route.history.push(this.getEditLink(id));
        break;
      default:
        route.history.push(this.getListLink());
        break;
    }
  };
  private getEditPageLayout = (
    route: RouteComponentProps<any>,
    config?: IEntityEditConfig
  ) => {
    const onSave = this.handleFormOnSave(route);
    const resourceID = route.match.params.id;
    if (this.editLayout) {
      return this.editLayout({ entity: this, onSave, ...config }, resourceID);
    }
    return (
      <EntityEditLayout
        entity={this}
        onSave={onSave}
        resourceID={resourceID}
        {...resolveOptionalThunk(this.config.edit)}
        {...config}
      />
    );
  };

  private getCreatePageLayout = (
    route: RouteComponentProps<any>,
    config?: IEntityEditConfig
  ) => {
    const onSave = this.handleFormOnSave(route);
    // if (this.editLayout) {
    //   return this.editLayout({ entity: this, onSave });
    // }
    return (
      <EntityEditLayout
        entity={this}
        onSave={onSave}
        {...resolveOptionalThunk(this.config.edit)}
        {...config}
      />
    );
  };

  // views
  public getListView = (config?: IEntityListConfig): React.ReactNode => {
    // const listConfig = resolveOptionalThunk(this.config.list);
    return (
      <EntityList
        entity={this}
        dataSource={this.dataSource}
        // {...listConfig}
        {...config}
      />
    );
  };

  public getDetailView = (
    resourceID: string | number,
    config?: IEntityDetailConfig
  ): React.ReactNode => {
    return (
      <EntityDetailLayout
        entity={this}
        resourceID={resourceID}
        {...this.config.detail}
        {...config}
      />
    );
  };

  public getCreateView = (
    config?: IEntityEditConfig,
    handlers?: { onSave?: EntityOnSaveHandler; onCancel?: () => void }
  ): React.ReactNode => {
    const { onSave, onCancel } = handlers || {
      onSave: undefined,
      onCancel: undefined
    };
    // if (this.editLayout) {
    //   return this.editLayout({ entity: this, onSave, onCancel });
    // }
    return (
      <EntityEditLayout
        entity={this}
        onSave={onSave}
        onCancel={onCancel}
        {...resolveOptionalThunk(this.config.edit)}
        {...config}
      />
    );
  };

  public getEditView = (
    resourceID: string | number,
    config?: IEntityEditConfig,
    handlers?: { onSave?: EntityOnSaveHandler; onCancel?: () => void }
  ): React.ReactNode => {
    const { onSave, onCancel } = handlers || {
      onSave: undefined,
      onCancel: undefined
    };
    if (this.editLayout) {
      return this.editLayout({ entity: this, onSave, onCancel }, resourceID);
    }
    return (
      <EntityEditLayout
        entity={this}
        resourceID={resourceID}
        onSave={onSave}
        onCancel={onCancel}
        {...resolveOptionalThunk(this.config.edit)}
        {...config}
      />
    );
  };

  // fields
  public inputField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityField(name, config || {}, this));
    return this;
  }
  public textField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldText(name, config || {}, this));
    return this;
  }
  public numberField(name: string, config?: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityFieldNumber(name, config || {}, this));
    return this;
  }
  public passwordField(
    name: string,
    config?: IEntityFieldConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldPasssword(name, config || {}, this));
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
  public fileField(
    name: string,
    config?: IEntityFieldFileConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldFile(name, config || {}, this));
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
  public computedField(
    name: string,
    config?: IEntityFieldComputedConfig<T>
  ): Entity<T> {
    this.fields.push(new EntityFieldComputed(name, config || {}, this));
    return this;
  }

  // links
  public getListLink(): string {
    return `/${this.structureName}`;
  }
  public getCreateLink(): string {
    return `/${this.structureName}/new`;
  }
  public getDetailLink(id: string | number): string {
    return `/${this.structureName}/${id}`;
  }
  public getEditLink(id: string | number): string {
    return `/${this.structureName}/${id}/edit`;
  }
}
