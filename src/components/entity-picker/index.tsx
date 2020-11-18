import * as React from "react";

import { Entity } from "../../model/Entity";
import { ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { ResourceSelect } from "webpanel-antd";
import { SelectProps } from "antd/lib/select";

export interface EntitySelectConfig extends SelectProps<any> {
  key?: string;
  resource?: Partial<ResourceCollectionConfig<any>>;
}

export interface EntitySelectProps extends EntitySelectConfig {
  entity: Entity;
}

export const EntitySelect = (props: EntitySelectProps) => {
  const { entity, key, resource, ...rest } = props;
  const resourceConfig = entity.getSearchResourceCollectionConfig();
  return (
    <ResourceSelect
      resource={{ ...resourceConfig, ...resource }}
      key={`entity_select_${entity.name}_${key}`}
      valueKey="id"
      labelKey={(value: any): React.ReactNode => {
        return entity.render(value);
      }}
      showSearch={true}
      {...rest}
    />
  );
};
