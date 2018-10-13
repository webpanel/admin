import * as React from 'react';
import * as inflection from 'inflection';
import { Input, FormField } from 'webpanel-antd';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';

// import { EntityField } from './_EntityField';
import { Entity } from './Entity';

type FieldSections = 'list' | 'detail' | 'edit' | 'search' | 'custom';

export interface IEntityFieldConfig<T> {
  title?: string;
  visible?: FieldSections[];
  hidden?: FieldSections[];
  render?: (record: T) => React.ReactNode;
}

export class EntityField<T, C extends IEntityFieldConfig<T>> {
  constructor(
    public readonly name: string,
    protected readonly config: C,
    public readonly entity: Entity<any>
  ) {}

  public get title(): string {
    return inflection.transform(this.config.title || this.name, [
      'underscore',
      'titleize'
    ]);
  }

  public get fetchField(): string {
    let name = this.name;
    // if (this.config.type === 'relationship' && this.config.targetEntity) {
    //   const searchFields = getThunkValue(this.config.targetEntity)
    //     .searchableFields;

    //   name += `{ id ${searchFields.map(f => f.name).join(' ')}}`;
    // }
    return name;
  }

  public visible(section: FieldSections, strict: boolean = false): boolean {
    const { visible, hidden } = this.config;
    if (strict && !visible) {
      return false;
    }
    if (visible && visible.indexOf(section) === -1) {
      return false;
    }
    if (hidden && hidden.indexOf(section) !== -1) {
      return false;
    }
    return true;
  }

  public get render(): ((record: T) => React.ReactNode) {
    return (values: any) => {
      return values[this.name];
    };
  }

  public inputElement(): React.ReactNode {
    return <Input />;
  }

  public get valuePropName(): string {
    return 'value';
  }

  public fieldElement(
    field: EntityField<T, C>,
    formContext: FormContext,
    key: string | number
  ): React.ReactNode {
    // const { type } = this.config;

    // if (type === 'relationship') {
    //   return this.relationshipFieldElement(
    //     formContext,
    //     this.config as IEntityFieldRelationship,
    //     key
    //   );
    // }

    // let valuePropName = 'value';
    // if (this.config.type === 'boolean') {
    //   valuePropName = 'checked';
    // }

    return (
      <FormField
        key={key}
        label={field.title}
        name={field.name}
        formContext={formContext}
        valuePropName={this.valuePropName}
      >
        {this.inputElement()}
      </FormField>
    );
  }

  // private relationshipFieldElement(
  //   formContext: FormContext,
  //   config: IEntityFieldRelationship,
  //   key: string | number
  // ): React.ReactNode {
  //   const { toMany, targetEntity } = config;
  //   if (!targetEntity) {
  //     return `targetEntity must be provided in field configuration`;
  //   }
  //   return (
  //     <RelationField
  //       key={key}
  //       formContext={formContext}
  //       field={this}
  //       targetEntity={getThunkValue(targetEntity)}
  //       mode={toMany ? 'tags' : 'default'}
  //     />
  //   );
  // }
}
