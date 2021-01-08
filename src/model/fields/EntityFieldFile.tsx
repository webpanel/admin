import * as React from "react";
import * as numeral from "numeral";

import {
  EntityField,
  IEntityFieldConfig,
  IEntityFieldRenderOptions,
} from "../EntityField";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { FileInput } from "../../components/form/fileinput";
import { message } from "antd";

export interface IEntityFieldFileConfig<T> extends IEntityFieldConfig<T> {
  hostURL?: string;
  uploadURL?: string;
  accessToken?: Thunk<Promise<string>>;
}

// This entity field is tied with usage of https://github.com/graphql-services/graphql-files
export class EntityFieldFile<T> extends EntityField<
  T,
  IEntityFieldFileConfig<T>
> {
  public fetchField(): string | null {
    return `${this.name} { id name size }`;
  }

  public columnName(): string {
    return `${this.name}Id`;
  }

  private async openItem(
    hostURL: string,
    id: string,
    accessToken?: Promise<string>
  ) {
    const token = await accessToken;
    try {
      // setLoading(true);
      const url = await fetch(`${hostURL}/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((json) => json.url);
      window.open(url, "_blank");
    } catch (err) {
      message.error(err.message);
    } finally {
      // setLoading(false);
    }
  }

  public get render(): (
    record: T,
    options?: IEntityFieldRenderOptions
  ) => React.ReactNode {
    const { render, accessToken, hostURL } = this.config;
    return (values) => {
      const value = values[this.name];
      if (!value || !hostURL) {
        return "–";
      }
      return (
        (render && render(value)) || (
          <a
            href="#"
            onClick={() =>
              this.openItem(
                hostURL,
                value.id,
                resolveOptionalThunk(accessToken)
              )
            }
          >
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
    const { accessToken } = this.config;

    const onChange = props && props.onChange;
    const onChangeProp = onChange
      ? (value: string) => onChange(value, value)
      : undefined;

    return (
      <FileInput
        entity={this.entity}
        hostURL={this.config.hostURL}
        uploadURL={this.config.uploadURL}
        key={`text_field_${this.entity.name}_${this.valuePropName}`}
        accessToken={accessToken}
        {...props}
        onChange={onChangeProp}
      />
    );
  }
}
