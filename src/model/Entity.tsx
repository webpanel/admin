import * as inflection from 'inflection';
import * as React from 'react';

import { Layout, RouteComponentProps } from 'webpanel-antd';
import { DataSource } from 'webpanel-data';

import { EntityEdit } from '../components/pages/edit';
import { EntityList } from '../components/pages/list';
import { IEntityFieldConfig, EntityField } from './EntityField';

interface IEntityConfig<T> {
  name: string;
  dataSource: DataSource;
  title?: string;

  render?: ((value: T) => string);
}

export class Entity<T> {
  public fields: EntityField<T>[] = [];

  constructor(private readonly config: IEntityConfig<T>) {}

  public get structureName(): string {
    return `${inflection.transform(this.config.name, [
      'tableize',
      'dasherize',
      'pluralize'
    ])}`;
  }
  public get title(): string {
    return inflection.titleize(this.config.title || this.config.name);
  }
  public get name(): string {
    return this.config.name;
  }
  public get dataSource(): DataSource {
    return this.config.dataSource;
  }
  public get render(): ((value: T) => string) {
    if (this.config.render) {
      return this.config.render;
    }
    return (value: any) => {
      return this.searchableFields.map(x => value[x.name]).join(', ');
    };
  }

  public field(config: string | IEntityFieldConfig<T>): Entity<T> {
    if (typeof config === 'string') {
      this.fields.push(new EntityField({ name: config }, this));
    } else {
      this.fields.push(new EntityField(config, this));
    }
    return this;
  }
  public get listFields(): EntityField<T>[] {
    return this.fields.filter(f => f.visible('list'));
  }
  public get editFields(): EntityField<T>[] {
    return this.fields.filter(f => f.visible('edit'));
  }
  public get searchableFields(): EntityField<T>[] {
    const fields = this.fields.filter(f => f.visible('searchable', true));
    if (fields.length === 0) {
      return [this.listFields[0]];
    }
    return fields;
  }

  public menuItem = (): React.ReactNode => {
    return <Layout.MenuItem key={this.structureName} title={this.title} />;
  };

  public structureItem = (): React.ReactNode => {
    return (
      <Layout.StructureItem
        key={`/${this.structureName}`}
        name={this.title}
        content={
          <EntityList entity={this} dataSource={this.config.dataSource} />
        }
      >
        <Layout.StructureItem
          key="/new"
          name="New"
          content={(route: RouteComponentProps<any>) => (
            <EntityEdit entity={this} route={route} />
          )}
        />
        <Layout.StructureItem
          key="/:id"
          name="Detail"
          content={(route: RouteComponentProps<any>) => (
            <EntityEdit entity={this} route={route} />
          )}
        />
      </Layout.StructureItem>
    );
  };
}
