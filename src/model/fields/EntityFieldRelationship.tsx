import * as React from "react";

import { Button, Col, Row, Tag } from "antd";
import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldConfigFilter,
  IEntityFieldFilterProps,
  IEntityFieldRenderOptions,
} from "../EntityField";
import { Link, ResourceSelect } from "webpanel-antd";
import { Thunk, resolveOptionalThunk, resolveThunk } from "ts-thunk";
// import { IEntityEditConfig } from '../../components/pages/edit';
import { Translation, useTranslation } from "react-i18next";

import { CreateEntityModal } from "../../components/buttons/CreateEntityModal";
// import { CreateEntityButton } from '../../components/buttons/EntityAddButton';
import { Entity } from "../Entity";
import FormItem from "antd/lib/form/FormItem";
import { FormLayout } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { ResourceID } from "webpanel-data";
import { EntityBase } from "../EntityBase";

export type IEntityFieldRelationshipType = "toOne" | "toMany";
export type IEntityFieldRelationshipSelectMode = undefined | "multiple";

export interface IEntityFieldRelationshipCreatableConfig {
  addButton: boolean;
  notFound: boolean;
}

export interface IEntityFieldRelationshipConfig<T>
  extends IEntityFieldConfig<T> {
  targetEntity: any;
  type: IEntityFieldRelationshipType;
  creatable?: Thunk<boolean | IEntityFieldRelationshipCreatableConfig>;
  showLink?: Thunk<boolean>;
}

type SelectValueType = string | string[];
interface RelationshipSelectWithAddButtonProps {
  field: EntityFieldRelationship<any, any>;
  targetEntity: Entity<any>;
  isCreatable: boolean | IEntityFieldRelationshipCreatableConfig;
  onChange?: (value: SelectValueType) => void;
  value?: SelectValueType;
}
const RelationshipSelectWithAddButton = (
  props: RelationshipSelectWithAddButtonProps
) => {
  const { field, targetEntity, isCreatable, onChange, value } = props;
  const resourceConfig = targetEntity.getSearchResourceCollectionConfig();
  const [modalVisible, setModalVisible] = React.useState<boolean | undefined>(
    undefined
  );
  const { t } = useTranslation("webpanel-admin");

  const showAddButton =
    typeof isCreatable === "boolean" ? isCreatable : isCreatable.addButton;
  const showAddOnNotFound =
    typeof isCreatable === "boolean" ? isCreatable : isCreatable.notFound;

  const onSave = async (id: ResourceID) => {
    let updateValues = {};
    updateValues[field.columnName()] = id;
    if (onChange) {
      if (field.mode === "multiple") {
        const ids = value as string[];
        ids.push(id.toString());
        onChange(ids);
      } else {
        onChange(id.toString());
      }
    }
  };
  const getAddButton = () => {
    return (
      <Col flex="32px">
        {targetEntity.getCreateButton({
          key: `relationship_field_${field._entity.name}_${field.valuePropName}_add`,
          flow: {
            type: "modal",
            modal: {
              title: `Add ${targetEntity.title}`,
              width: "70%",
            },
          },
          onSave: onSave,
        })}
      </Col>
    );
  };

  return (
    <Row>
      <Col flex="auto">
        <ResourceSelect
          // key={`relationship_field_${entity.name}_${this.valuePropName}`}
          value={value}
          valueKey="id"
          labelKey={(value: any): React.ReactNode => {
            return targetEntity.render(value);
          }}
          mode={field.mode}
          resource={resourceConfig}
          showSearch={true}
          style={{
            width: "100%",
            minWidth: "100px",
          }}
          onChange={(value) => onChange && onChange(value)}
          notFoundContent={
            showAddOnNotFound && (
              <Button
                onClick={() => setModalVisible(true)}
                icon={<PlusOutlined />}
              >
                {t("notFoundCreateNew")}
              </Button>
            )
          }
        />
      </Col>
      {showAddOnNotFound && (
        <CreateEntityModal
          entity={targetEntity}
          onSave={(id) => {
            setModalVisible(false);
            onSave(id);
          }}
          modal={{
            visible: modalVisible,
            onCancel: () => setModalVisible(false),
          }}
        />
      )}
      {showAddButton && getAddButton()}
    </Row>
  );
};

export const relationshipFieldFilter = (
  columnName: string,
  entity: Thunk<Entity<any>>
): IEntityFieldConfigFilter => {
  return {
    dropdownInput: (props) => {
      return getRelationshipFilterDropdownInput(resolveThunk(entity), props);
    },
    normalizer: (values: string[]): { [key: string]: any } => {
      const res = {};
      if (values && values.length > 0) {
        res[columnName + "_in"] = values;
      }
      return res;
    },
    denormalizer: (values: { [key: string]: any }): any[] => {
      return values[columnName + "_in"] || [];
    },
  };
};

export class EntityFieldRelationship<
  T,
  C extends IEntityFieldRelationshipConfig<T>
> extends EntityField<T, C> {
  private filterConfig: IEntityFieldConfigFilter;

  constructor(
    public readonly name: string,
    protected readonly config: C,
    public readonly _entity: EntityBase
  ) {
    super(name, config, _entity);
    this.filterConfig = relationshipFieldFilter(
      this.columnName(),
      this.config.targetEntity
    );
  }

  public get type(): IEntityFieldRelationshipType {
    return this.config.type === "toOne" ? "toOne" : "toMany";
  }

  public get targetEntity(): Entity<any> {
    return this.config.targetEntity;
  }

  public columnName(): string {
    return `${this.name}${this.type === "toOne" ? "Id" : "Ids"}`;
  }

  public get mode(): IEntityFieldRelationshipSelectMode {
    return this.type === "toOne" ? undefined : "multiple";
  }

  public fetchField(): string | null {
    let name = this.name;

    const searchFields = resolveThunk(
      this.config.targetEntity
    ).searchableFields;
    name += `{ id ${searchFields
      .map((x: EntityField<any, any>) => x.fetchField())
      .join(" ")}} ${this.columnName()} `;
    return name;
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    const { targetEntity, type, render, showLink } = this.config;
    const _targetEntity = resolveThunk(targetEntity);
    const _showLink = resolveOptionalThunk(showLink);
    const _render = render || _targetEntity.render;
    return (values) => {
      const value = values[this.name];
      if (type === "toMany" && Array.isArray(value)) {
        return value
          .map((x) => {
            const content = _render && _render(x);
            if (_showLink) {
              return (
                <Link to={_targetEntity.getDetailLink(x.id)}>{content}</Link>
              );
            }
            return content;
          })
          .filter((x) => x)
          .map((x) => <Tag key={String(x)}>{x}</Tag>);
      }

      if (!value) {
        return "–";
      }

      let content = _render && _render(value);

      if (_showLink) {
        content = (
          <Link to={_targetEntity.getDetailLink(value.id)}>{content}</Link>
        );
      }

      return content;
    };
  }

  public fieldElement(
    key: string | number,
    config: { formLayout?: FormLayout }
  ): React.ReactNode {
    const { targetEntity, creatable } = this.config;
    const _targetEntity = resolveThunk(targetEntity);

    const formItemLayout =
      config.formLayout === "horizontal"
        ? {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }
        : null;

    const _isCreatable = resolveOptionalThunk(creatable);
    const isCreatable =
      _targetEntity.creatable &&
      (_isCreatable || typeof _isCreatable === "undefined");

    return (
      <Translation key={key}>
        {(t) => (
          <FormItem
            label={t(this.titleTranslationKey, {
              defaultValue: this.title,
            })}
            extra={this.config.description}
            name={this.columnName()}
            style={{
              width: "100%",
            }}
            rules={resolveOptionalThunk(this.config.rules)}
            dependencies={resolveOptionalThunk(this.config.dependencies)}
            {...formItemLayout}
          >
            <RelationshipSelectWithAddButton
              field={this}
              targetEntity={_targetEntity}
              isCreatable={isCreatable}
            />
          </FormItem>
        )}
      </Translation>
    );
  }

  public inputElement(props?: {
    value?: any;
    onChange?: (value: any) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const { targetEntity } = this.config;
    const _targetEntity = resolveThunk(targetEntity);

    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (value: any) => {
          // const array: LabeledValue[] = Array.isArray(value) ? value : [value];
          onChange(value || null);
        }
      : undefined;

    const resourceConfig = _targetEntity.getSearchResourceCollectionConfig();
    return (
      <ResourceSelect
        showSearch={true}
        allowClear={true}
        style={{ width: "100%", minWidth: "100px" }}
        {...props}
        valueKey="id"
        labelKey={(value: any): React.ReactNode => {
          return _targetEntity.render(value);
        }}
        mode={this.mode}
        resource={resourceConfig}
        onChange={onChangeProp}
      />
    );
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<string>) => {
    return (
      this.filterConfig.dropdownInput && this.filterConfig.dropdownInput(props)
    );
  };

  public get filterNormalize(): (values: string[]) => { [key: string]: any } {
    return this.filterConfig.normalizer!;
  }
  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return this.filterConfig.denormalizer!;
  }
}

export const getRelationshipFilterDropdownInput = (
  targetEntity: Entity<any>,
  props: IEntityFieldFilterProps<string>
) => {
  const _targetEntity = resolveThunk(targetEntity);
  const value = props.selectedKeys;

  const resourceConfig = _targetEntity.getSearchResourceCollectionConfig();
  return (
    <ResourceSelect
      valueKey="id"
      labelKey={(value: any): React.ReactNode => {
        return _targetEntity.render(value);
      }}
      value={value}
      mode="multiple"
      allowClear={false}
      showSearch={true}
      resource={resourceConfig}
      style={{ width: 350 }}
      onChange={(value: string | string[]) => {
        if (Array.isArray(value)) {
          props.setSelectedKeys(value);
        } else {
          props.setSelectedKeys([value.toString()]);
        }
      }}
    />
  );
};
