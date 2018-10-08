import * as inflection from 'inflection';
import * as React from 'react';

import { Layout, RouteComponentProps } from 'webpanel-antd';
import { DataSource } from 'webpanel-data';

import { EntityDetail } from '../components/pages/detail';
import { EntityList } from '../components/pages/list';
import { IEntityFieldConfig, EntityField } from './EntityField';

interface IEntityConfig {
  name: string;
  dataSource: DataSource;
  title?: string;
}

export class Entity<T> {
  public fields: EntityField<T>[] = [];

  constructor(private readonly config: IEntityConfig) {}

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

  public field(config: IEntityFieldConfig<T>): Entity<T> {
    this.fields.push(new EntityField(config));
    return this;
  }
  public get listFields(): EntityField<T>[] {
    return this.fields.filter(f => f.visible('list'));
  }
  public get detailFields(): EntityField<T>[] {
    return this.fields.filter(f => f.visible('detail'));
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
            <EntityDetail
              entity={this}
              dataSource={this.config.dataSource}
              route={route}
            />
          )}
        />
        <Layout.StructureItem
          key="/:id"
          name="Detail"
          content={(route: RouteComponentProps<any>) => (
            <EntityDetail
              entity={this}
              dataSource={this.config.dataSource}
              route={route}
            />
          )}
        />
      </Layout.StructureItem>
    );
  };
}
