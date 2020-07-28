import * as React from "react";
import * as numeral from "numeral";

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldRenderOptions,
} from "../EntityField";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { FileInput } from "../../components/form/fileinput";

export interface IEntityFieldFileConfig<T> extends IEntityFieldConfig<T> {
  uploadURL?: string;
  accessToken?: Thunk<string>;
}

// This entity field is tied with usage of https://github.com/graphql-services/graphql-files
export class EntityFieldFile<T> extends EntityField<
  T,
  IEntityFieldFileConfig<T>
> {
  public fetchField(): string | null {
    return `${this.name} { id name url size }`;
  }

  public columnName(): string {
    return `${this.name}Id`;
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    const { render, accessToken } = this.config;
    return (values) => {
      const value = values[this.name];
      if (!value) {
        return "–";
      }
      let url = value.url;
      const token = resolveOptionalThunk(accessToken);
      if (token) {
        url += `?access_token=${token}`;
      }
      return (
        (render && render(value)) || (
          <a target="_blank" href={url}>
            {value.name} ({numeral(value.size).format("0.0 b")})
          </a>
        )
      );
    };
  }

  public inputElement(props?: {
    value?: string;
    onChange?: (value: any, valueElement: React.ReactNode) => void;
    autoFocus?: boolean;
  }): React.ReactNode {
    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (value: string) => onChange(value, value)
      : undefined;

    return (
      <FileInput
        entity={this.entity}
        uploadURL={this.config.uploadURL}
        key={`text_field_${this.entity.name}_${this.valuePropName}`}
        {...props}
        onChange={onChangeProp}
      />
    );
  }
}
