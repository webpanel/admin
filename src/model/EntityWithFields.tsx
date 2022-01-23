import * as React from "react";

import {
  Resource,
  ResourceCollectionHookConfig,
  ResourceHookConfig,
  ResourceID,
  useResource,
  useResourceCollection,
} from "webpanel-data";
import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldRenderOptions,
} from "./EntityField";
import {
  EntityFieldBoolean,
  IEntityFieldBooleanConfig,
} from "./fields/EntityFieldBoolean";
import {
  EntityFieldComputed,
  IEntityFieldComputedConfig,
} from "./fields/EntityFieldComputed";
import {
  EntityFieldCustom,
  IEntityFieldCustomConfig,
} from "./fields/EntityFieldCustom";
import {
  EntityFieldDate,
  IEntityFieldDateConfig,
} from "./fields/EntityFieldDate";
import {
  EntityFieldEnum,
  IEntityFieldEnumConfig,
} from "./fields/EntityFieldEnum";
import {
  EntityFieldFile,
  IEntityFieldFileConfig,
} from "./fields/EntityFieldFile";
import {
  EntityFieldNumber,
  IEntityFieldNumberConfig,
} from "./fields/EntityFieldNumber";
import {
  EntityFieldPercentage,
  IEntityFieldPercentageConfig,
} from "./fields/EntityFieldPercentage";
import {
  EntityFieldRelationship,
  IEntityFieldRelationshipConfig,
} from "./fields/EntityFieldRelationship";
import {
  ResourceCollection,
  ResourceCollectionConfig,
} from "webpanel-data/lib/ResourceCollection";
import { resolveOptionalThunk, Thunk } from "ts-thunk";

import { EntityFieldColor } from "./fields/EntityFieldColor";
import { EntityFieldPasssword } from "./fields/EntityFieldPassword";
import { EntityFieldString } from "./fields/EntityFieldString";
import { EntityFieldText } from "./fields/EntityFieldText";
import { EntityDataType, EntityBase } from "./EntityBase";
import {
  CreateEntityButton,
  CreateEntityProps,
} from "../components/buttons/EntityAddButton";
import {
  EntityEdit,
  IEntityCreateProps,
  IEntityEditConfig,
  IEntityEditProps,
} from "../components/pages/edit";
import {
  DetailEntityButton,
  DetailEntityProps,
} from "../components/buttons/EntityDetailButton";
import { EntityDetail, IEntityDetailConfig } from "../components/pages/detail";
import { EntityList, IEntityListConfig } from "../components/pages/list";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { EditOutlined, FolderOutlined } from "@ant-design/icons";
import { Layout, RouteComponentProps } from "webpanel-antd";

import { Redirect } from "react-router";
import { Translation } from "react-i18next";
import { EntitySelect, EntitySelectConfig } from "../components/entity-picker";

type MergeEntityFieldType<
  T,
  U,
  T0 = T & U,
  T1 = { [K in keyof T0]: T0[K] }
> = T1;
type UnwrapEntity<T> = T extends EntityBase<infer U> ? U : never;

export class EntityWithFields<
  T extends EntityDataType = any
> extends EntityBase<T> {
  public fields: EntityField<any, any>[] = [];

  protected clone(): this {
    const e = super.clone();
    e.fields = this.fields.map((f) => {
      return f.clone();
    });
    return e;
  }

  public getField(name: string): EntityField<T, any> | null {
    const filtered = this.fields.filter((f) => f.name === name);
    return filtered.length > 0 ? filtered[0] : null;
  }
  public getFieldOrFail(name: string): EntityField<T, any> {
    const filtered = this.fields.filter((f) => f.name === name);
    if (filtered.length === 0) {
      throw new Error(`Cannot find field ${name} on entity ${this.name}`);
    }
    return filtered[0];
  }

  public getListFields(): EntityField<T, any>[] {
    const listConfig = this.getListConfig();
    if (listConfig) {
      const fields = resolveOptionalThunk(listConfig.fields);
      if (fields) {
        return fields
          .map((f) => {
            const fieldName = typeof f === "string" ? f : f?.field;
            if (!fieldName) {
              return null;
            }
            return this.getFieldOrFail(fieldName);
          })
          .filter((x) => x) as EntityField<T, any>[];
      }
    }
    return this.fields.filter((f) => f.readable);
  }
  public getEditFields(resourceID?: ResourceID): EntityField<T, any>[] {
    const editConfig = this.getEditConfig(resourceID);
    if (editConfig) {
      const fields = resolveOptionalThunk(editConfig.fields);
      if (fields) {
        return fields
          .map((f) => {
            const fieldName = typeof f === "string" ? f : f?.field;
            if (!fieldName) {
              return null;
            }
            return this.getFieldOrFail(fieldName);
          })
          .filter((x) => x) as EntityField<T, any>[];
      }
    }
    return this.fields.filter((f) => f.writeable);
  }
  public getDetailFields(resourceID: ResourceID): EntityField<T, any>[] {
    const detailConfig = this.getDetailConfig(resourceID);
    if (detailConfig) {
      const _detailFields = resolveOptionalThunk(detailConfig.fields);
      if (_detailFields) {
        const detailFields = _detailFields.map((f) =>
          typeof f === "string" ? f : f?.field
        );
        return this.fields.filter(
          (f) => f.readable && detailFields.indexOf(f.name) !== -1
        );
      }
    }
    return this.fields.filter((f) => f.readable);
  }
  public get searchableFields(): EntityField<T, any>[] {
    const search = resolveOptionalThunk(this.config.searchable);
    let fields: EntityField<T, any>[] = [];
    if (search && typeof search !== "boolean") {
      const searchFields = resolveOptionalThunk(search.fields);
      if (searchFields) {
        fields = this.fields.filter(
          (f) => f.readable && searchFields.indexOf(f.name) !== -1
        );
      }
    }
    const listFields = this.getListFields();
    if (fields.length === 0 && listFields.length > 0) {
      return [listFields[0]];
    }
    return fields;
  }

  public get render(): (value: T | null) => React.ReactNode {
    if (this.config.render) {
      return this.config.render;
    }
    return (value: any) => {
      if (value === null || typeof value !== "object") {
        return "–";
      }
      return this.searchableFields.map((x) => value[x.name]).join(", ");
    };
  }

  public setRender(fn: (value: T) => React.ReactNode): this {
    this.config.render = (value) => {
      if (value === null) {
        return "–";
      }
      return fn(value);
    };
    return this;
  }

  // fields
  public stringField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config?: IEntityFieldConfig<T2>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldString(name, config || {}, entity));
    return entity as any;
  }
  public textField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config?: IEntityFieldConfig<T2>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldText(name, config || {}, entity));
    return entity as any;
  }
  public numberField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: number }>
  >(name: Name, config?: IEntityFieldNumberConfig<T2>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldNumber(name, config || {}, entity));
    return entity as any;
  }
  public percentageField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: number }>
  >(
    name: Name,
    config?: IEntityFieldPercentageConfig<T2>
  ): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldPercentage(name, config || {}, entity));
    return entity as any;
  }
  public passwordField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config?: IEntityFieldConfig<T2>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldPasssword(name, config || {}, entity));
    return entity as any;
  }
  public dateField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: moment.Moment }>
  >(name: Name, config?: IEntityFieldDateConfig<T2>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldDate(name, config || {}, entity));
    return entity as any;
  }
  public booleanField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: boolean }>
  >(name: Name, config?: IEntityFieldBooleanConfig<T2>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldBoolean(name, config || {}, entity));
    return entity as any;
  }
  public relationshipField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, EnhancedKeys>,
    Config extends IEntityFieldRelationshipConfig<EnhancedKeys>,
    EnhancedKeys = {
      [K in Name]: UnwrapEntity<ReturnType<Config["targetEntity"]>>;
    }
  >(name: Name, config: Config): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldRelationship(name, config, entity));
    return entity as any;
  }
  public fileField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: any }>
  >(name: Name, config?: IEntityFieldFileConfig<T>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldFile(name, config || {}, entity));
    return entity as any;
  }
  public colorField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config?: IEntityFieldConfig<T2>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldColor(name, config || {}, entity));
    return entity as any;
  }
  public enumField<
    Name extends string,
    T2 extends MergeEntityFieldType<T, { [K in Name]: string }>
  >(name: Name, config: IEntityFieldEnumConfig<T2>): EntityWithFields<T2> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldEnum(name, config, entity));
    return entity as any;
  }
  public computedField<
    Name extends string,
    EnhancedKeys = {
      [K in Name]: any;
    }
  >(
    name: Name,
    config?: IEntityFieldComputedConfig<any>
  ): EntityWithFields<T & EnhancedKeys> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldComputed(name, config || {}, entity));
    return entity as any;
  }
  public customField<
    Name extends string,
    EnhancedKeys = {
      [K in Name]: any;
    }
  >(
    name: Name,
    config: IEntityFieldCustomConfig<any>
  ): EntityWithFields<T & EnhancedKeys> {
    const entity = this.clone();
    entity.fields.push(new EntityFieldCustom(name, config, this));
    return entity as any;
  }

  public setFieldRender<Name extends keyof T>(
    name: Name,
    fn: (record: T, options?: IEntityFieldRenderOptions) => React.ReactNode
  ): this {
    this.getField(name as string)?.setRender(fn);
    return this;
  }

  // resource hooks
  public getSearchResourceCollectionConfig =
    (): ResourceCollectionConfig<T> => {
      return {
        name: this.resourceName,
        fields: [
          "id",
          ...this.searchableFields.map(
            (x: EntityField<any, any>) => x.fetchField() || x.name
          ),
        ],
        initialSorting: this.initialSorting,
        initialFilters: this.initialFilters,
        dataSource: this.dataSource,
      };
    };
  public useResource(config?: Partial<ResourceHookConfig<T>>): Resource<T> {
    let entityFields: EntityField<any, any>[] = config?.id
      ? this.getDetailFields(config?.id)
      : this.getEditFields();

    return useResource({
      fields: [
        "id",
        ...(entityFields
          .map((x) => x && x.fetchField())
          .filter((x) => x) as string[]),
      ],
      ...config,
      name: this.resourceName,
      id: config?.id,
      dataSource: this.dataSource,
    });
  }

  public useResourceCollection(
    config?: Partial<ResourceCollectionHookConfig<T>>
  ): ResourceCollection<T> {
    let entityFields: EntityField<any, any>[] = this.getListFields();

    return useResourceCollection({
      fields: [
        "id",
        ...(entityFields
          .map((x) => x && x.fetchField())
          .filter((x) => x) as string[]),
      ],
      ...config,
      name: this.resourceName,
      dataSource: this.dataSource,
    });
  }

  // views
  public getListView = (
    config?: Thunk<IEntityListConfig<T>>
  ): React.ReactNode => {
    return <EntityList entity={this} {...config} />;
  };

  public getDetailView = (
    resourceID: ResourceID,
    config?: IEntityDetailConfig
  ): React.ReactNode => {
    return (
      <EntityDetail
        entity={this}
        resourceID={resourceID}
        {...this.getDetailConfig(resourceID)}
        {...config}
      />
    );
  };

  public getDetailButton = (
    id: ResourceID,
    props: DetailEntityProps
  ): React.ReactNode => {
    return <DetailEntityButton entity={this} entityId={id} {...props} />;
  };

  public getCreateView = (
    props?: Omit<IEntityCreateProps, "entity">
  ): React.ReactNode => {
    if (this.createLayout) {
      return this.createLayout({ entity: this, ...props });
    }
    return <EntityEdit entity={this} {...this.getEditConfig()} {...props} />;
  };

  public getCreateButton = (
    props: Omit<CreateEntityProps, "entity">
  ): React.ReactNode => {
    return <CreateEntityButton entity={this} {...props} />;
  };

  public getEditView = (
    props: Omit<IEntityEditProps, "entity">
  ): React.ReactNode => {
    if (this.editLayout) {
      return this.editLayout({ entity: this, ...props });
    }
    return (
      <EntityEdit
        entity={this}
        {...this.getEditConfig(props.resourceID)}
        {...props}
      />
    );
  };

  // layouts
  public menuItem = (): React.ReactNode => {
    const props = resolveOptionalThunk(this.config.menu);
    return (
      <Layout.MenuItem
        key={this.structureName}
        title={
          <Translation>
            {(t) =>
              t(`${this.name}._title`, {
                count: 100,
                defaultValue: this.title,
              })
            }
          </Translation>
        }
        icon={resolveOptionalThunk(this.config.icon) || <FolderOutlined />}
        {...props}
      />
    );
  };

  public structureItem = (): React.ReactNode => {
    const props = resolveOptionalThunk(this.config.structure);
    return (
      <Layout.StructureItem
        key={`/${this.structureName}`}
        name={
          <Translation>
            {(t) =>
              t(`${this.name}._title`, { count: 100, defaultValue: this.title })
            }
          </Translation>
        }
        // header={
        //   {
        //     // title: undefined //this.title,
        //     // action: (
        //     //   <Link to="new">
        //     //     <Button htmlType="button">+</Button>
        //     //   </Link>
        //     // )
        //   }
        // }
        content={() => this.getListView(this.getListConfig())}
        {...props}
      >
        <Layout.StructureItem
          key="/new"
          name={
            <Translation ns="webpanel-admin">
              {(t) => t("new", { defaultValue: "New" })}
            </Translation>
          }
          // header={
          //   {
          //     // title: 'New'
          //   }
          // }
          content={this.getCreatePageLayout}
        />
        <Layout.StructureItem
          key="/:id"
          name={
            <Translation ns="webpanel-admin">{(t) => t("detail")}</Translation>
          }
          // header={(route: RouteComponentProps<any>) => ({
          //   // title: `Detail`,
          //   // action: (
          //   //   <Link to={`${route.match.params.id}/edit`}>
          //   //     <Button htmlType="button">Edit</Button>
          //   //   </Link>
          //   // )
          // })}
          content={this.getDetailPageLayout}
        />
        <Layout.StructureItem
          key="/:id/edit"
          name={
            <Translation ns="webpanel-admin">{(t) => t("edit")}</Translation>
          }
          // header={
          //   {
          //     // title: 'Edit'
          //   }
          // }
          content={this.getEditPageLayout}
        />
      </Layout.StructureItem>
    );
  };

  private getDetailPageLayout = (
    route: RouteComponentProps<any>,
    config?: IEntityDetailConfig
  ): React.ReactNode => {
    const resourceID = route.match.params.id;
    if (this.config.showDetailPage) {
      if (this.detailLayout) {
        return this.detailLayout({
          entity: this,
          resourceID,
          ...{ ...this.getDetailConfig(resourceID), ...config },
        });
      }
      return (
        <EntityDetail
          entity={this}
          resourceID={resourceID}
          {...this.getDetailConfig(resourceID)}
          {...config}
        />
      );
    }

    return <Redirect to={`${resourceID}/edit`} />;
  };

  private handleFormOnSave =
    (route: RouteComponentProps<any>) => (id: ResourceID) => {
      if (
        route.history.length > 1 &&
        (route.location.state as any)?.goBackEnabled
      ) {
        route.history.goBack();
        return;
      }
      route.history.push(this.getDetailLink(id));
    };
  private getEditPageLayout = (
    route: RouteComponentProps<any>,
    props?: Omit<IEntityEditProps, "resourceID">
  ): React.ReactNode => {
    const onSave = this.handleFormOnSave(route);
    const resourceID = route.match.params.id;
    if (this.editLayout) {
      return this.editLayout({ entity: this, onSave, resourceID, ...props });
    }
    return (
      <EntityEdit
        entity={this}
        onSave={onSave}
        resourceID={resourceID}
        {...this.getEditConfig(resourceID)}
        {...props}
      />
    );
  };

  private getCreatePageLayout = (
    route: RouteComponentProps<any>,
    config?: IEntityEditConfig
  ): React.ReactNode => {
    const onSave = this.handleFormOnSave(route);
    if (this.createLayout) {
      return this.createLayout({ entity: this, onSave });
    }
    return (
      <EntityEdit
        entity={this}
        onSave={onSave}
        {...this.getEditConfig()}
        {...config}
      />
    );
  };

  public getEditButton = (resourceID: ResourceID): React.ReactNode => {
    return (
      <Link
        to={{
          pathname: this.getEditLink(resourceID),
          state: { goBackEnabled: true },
        }}
      >
        <Button size="small" htmlType="button" icon={<EditOutlined />} />
      </Link>
    );
  };

  public getSelect(config?: EntitySelectConfig): React.ReactNode {
    return <EntitySelect entity={this} {...config} />;
  }
}
