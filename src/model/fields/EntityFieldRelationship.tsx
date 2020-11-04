import * as React from "react";

import { Col, Row, Tag } from "antd";
import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldFilterProps,
  IEntityFieldRenderOptions,
} from "../EntityField";
import { ResourceCollection, ResourceID } from "webpanel-data";
import { Thunk, resolveOptionalThunk, resolveThunk } from "ts-thunk";

// import { CreateEntityButton } from '../../components/buttons/EntityAddButton';
import { Entity } from "../Entity";
import FormItem from "antd/lib/form/FormItem";
import { FormLayout } from "antd/lib/form/Form";
import { ResourceSelect } from "webpanel-antd";
// import { IEntityEditConfig } from '../../components/pages/edit';
import { Translation } from "react-i18next";

export type IEntityFieldRelationshipType = "toOne" | "toMany";
export type IEntityFieldRelationshipSelectMode = undefined | "multiple";

export interface IEntityFieldRelationshipConfig<T>
  extends IEntityFieldConfig<T> {
  targetEntity: Thunk<Entity>;
  type: IEntityFieldRelationshipType;
  creatable?: Thunk<boolean>;
}

type SelectValueType = string | string[];
interface RelationshipSelectWithAddButtonProps {
  field: EntityFieldRelationship<any>;
  targetEntity: Entity<any>;
  isCreatable: boolean;
  onChange?: (value: SelectValueType) => void;
  value?: SelectValueType;
}
const RelationshipSelectWithAddButton = (
  props: RelationshipSelectWithAddButtonProps
) => {
  const { field, targetEntity, isCreatable, onChange, value } = props;

  return (
    <>
      {targetEntity.getSearchResourceCollectionLayer(
        (collection: ResourceCollection<any>) => (
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
                resourceCollection={collection}
                showSearch={true}
                style={{
                  width: "100%",
                  minWidth: "200px",
                  // marginRight: isCreatable ? "-38px" : undefined,
                  // paddingRight: isCreatable ? "38px" : undefined,
                }}
                onChange={(value) => onChange && onChange(value)}
              />
            </Col>
            {isCreatable && (
              <Col flex="32px">
                {targetEntity.getCreateButton({
                  key: `relationship_field_${field.entity.name}_${field.valuePropName}_add`,
                  button: {
                    // style: {
                    //   margin:
                    //     config.formLayout === "horizontal"
                    //       ? "4px 0 0 4px"
                    //       : "0 0 0 4px",
                    // },
                  },
                  flow: {
                    type: "modal",
                    modal: {
                      title: `Add ${targetEntity.title}`,
                      width: "70%",
                    },
                  },
                  onSave: async (id: ResourceID) => {
                    await collection.get();
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
                  },
                })}
              </Col>
            )}
          </Row>
        )
      )}
    </>
  );
};

export class EntityFieldRelationship<T> extends EntityField<
  T,
  IEntityFieldRelationshipConfig<T>
> {
  public get type(): IEntityFieldRelationshipType {
    return this.config.type === "toOne" ? "toOne" : "toMany";
  }

  public columnName(): string {
    return `${this.name}${this.type === "toOne" ? "Id" : "Ids"}`;
  }

  public get mode(): IEntityFieldRelationshipSelectMode {
    return this.type === "toOne" ? undefined : "multiple";
  }

  public fetchField(): string | null {
    let name = this.name;

    const searchFields = resolveThunk(this.config.targetEntity)
      .searchableFields;
    name += `{ id ${searchFields
      .map((x: EntityField<any, any>) => x.fetchField())
      .join(" ")}} ${this.columnName()} `;
    return name;
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    const { targetEntity, type, render } = this.config;
    const _render = render || resolveThunk(targetEntity).render;
    return (values) => {
      const value = values[this.name];
      if (type === "toMany" && Array.isArray(value)) {
        return value
          .map((x) => _render && _render(x))
          .filter((x) => x)
          .map((x) => <Tag key={String(x)}>{x}</Tag>);
      }

      if (!value) {
        return "–";
      }

      return _render && _render(value);
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
            label={t(`${this.entity.name}.${this.name}`, {
              defaultValue: this.title,
            })}
            extra={this.config.description}
            name={this.columnName()}
            style={{
              width: "100%",
            }}
            rules={resolveOptionalThunk(this.config.rules)}
            {...formItemLayout}
          >
            <RelationshipSelectWithAddButton
              field={this}
              targetEntity={_targetEntity}
              isCreatable={isCreatable}
            />
            {/* <RelationshipSelectWithAddButton>
                !!!!!!!!!!
              </RelationshipSelectWithAddButton>

              <ResourceSelect
                key={`relationship_field_${this.entity.name}_${this.valuePropName}`}
                valueKey="id"
                labelKey={(value: any): React.ReactNode => {
                  return _targetEntity.render(value);
                }}
                mode={this.mode}
                resourceCollection={collection}
                showSearch={true}
                style={{
                  width: "100%",
                  minWidth: "200px",
                  marginRight: isCreatable ? "-38px" : undefined,
                  paddingRight: isCreatable ? "38px" : undefined,
                }}
              />
              {isCreatable &&
                _targetEntity.getCreateButton({
                  key: `relationship_field_${this.entity.name}_${this.valuePropName}_add`,
                  button: {
                    style: {
                      margin:
                        config.formLayout === "horizontal"
                          ? "4px 0 0 4px"
                          : "0 0 0 4px",
                    },
                  },
                  flow: {
                    type: "modal",
                    modal: {
                      title: `Add ${_targetEntity.title}`,
                      width: "70%",
                    },
                  },
                  onCreate: async (id: ResourceID) => {
                    await collection.get();
                    let updateValues = {};
                    updateValues[this.columnName()] = id;
                    // formInstance?.setFieldsValue(updateValues);
                  },
                })} */}
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

    return _targetEntity.getSearchResourceCollectionLayer(
      (collection: ResourceCollection<any>) => {
        return (
          <ResourceSelect
            {...props}
            valueKey="id"
            allowClear={true}
            showSearch={true}
            style={{ width: "100%", minWidth: "200px" }}
            labelKey={(value: any): React.ReactNode => {
              return _targetEntity.render(value);
            }}
            mode={this.mode}
            resourceCollection={collection}
            // labelInValue={true}
            onChange={onChangeProp}
            // onChange={(value) => {
            // const options = Array.isArray(option) ? option : option;
            // if(onChangeProp){
            // onChangeProp(value,options)
            // }
            // }}
          />
        );
      }
    );
  }

  public filterDropdownInput = (props: IEntityFieldFilterProps<string>) => {
    const { targetEntity } = this.config;
    const _targetEntity = resolveThunk(targetEntity);
    return getRelationshipFilterDropdownInput(_targetEntity, props);
  };

  public get filterNormalize(): (values: string[]) => { [key: string]: any } {
    return (values: string[] | null) => {
      let res = {};
      values = values || [];
      if (this.type === "toMany") {
        if (values.length == 1) {
          res[this.name] = { id: values[0] };
        } else if (values.length > 1) {
          res[this.name] = { id_in: values };
        }
      } else {
        if (values.length == 1) {
          res[this.name + "Id"] = values[0];
        } else if (values.length > 1) {
          res[this.name + "Id_in"] = values;
        }
      }
      return res;
    };
  }
  public get filterDenormalize(): (values: { [key: string]: any }) => any[] {
    return (values: { [key: string]: any }) => {
      let res: any[] = [];
      const value =
        values[this.columnName()] ||
        values[this.columnName() + "Id"] ||
        values[this.columnName() + "Id_in"] ||
        values[this.columnName().replace("Ids", "").replace("Id", "")];
      if (value) {
        if (value.id) {
          res = [value.id];
        } else if (value.id_in) {
          res = value.id_in;
        } else if (Array.isArray(value)) {
          res = value;
        } else {
          res = [value];
        }
      }
      return res;
    };
  }
}

export const getRelationshipFilterDropdownInput = (
  targetEntity: Entity<any>,
  props: IEntityFieldFilterProps<string>
) => {
  const _targetEntity = resolveThunk(targetEntity);
  const value = props.selectedKeys;
  return _targetEntity.getSearchResourceCollectionLayer(
    (resource: ResourceCollection<any>) => {
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
          resourceCollection={resource}
          style={{ minWidth: "200px" }}
          onChange={(value: string | string[]) => {
            if (Array.isArray(value)) {
              props.setSelectedKeys(value);
            } else {
              props.setSelectedKeys([value.toString()]);
            }
          }}
        />
      );
    },
    { autoload: true }
  );
};
