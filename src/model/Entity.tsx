// import { ColumnProps } from 'antd/lib/table';
import * as inflection from 'inflection';
// import { kebabCase } from 'lodash';
import * as React from 'react';
import { Layout, RouteComponentProps } from 'webpanel-antd';
import { DataSource } from 'webpanel-data';

import { EntityDetail } from '../components/detail';
import { EntityList } from '../components/list';

interface IEntityFieldConfig {
  name: string;
  title?: string;
  visibility?: {
    list?: boolean;
    detail?: boolean;
  };
}

interface IEntityConfig {
  name: string;
  dataSource: DataSource;
  title?: string;
  fields: IEntityFieldConfig[];
}

export class Entity {
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

  public get listFields(): IEntityFieldConfig[] {
    return this.config.fields.filter(f => !f.visibility || f.visibility.list);
  }
  public get detailFields(): IEntityFieldConfig[] {
    return this.config.fields.filter(f => !f.visibility || f.visibility.detail);
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
