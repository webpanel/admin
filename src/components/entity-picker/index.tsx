import * as React from "react";

import { Entity } from "../../model/Entity";
import { ResourceCollection } from "webpanel-data";
import { ResourceSelect } from "webpanel-antd";
import { SelectProps } from "antd/lib/select";

export interface EntitySelectConfig extends SelectProps {
  key?: string;
}

export interface EntitySelectProps extends EntitySelectConfig {
  entity: Entity;
}

export const EntitySelect = (props: EntitySelectProps) => {
  const { entity, key, ...rest } = props;
  return (
    <>
      {entity.getSearchResourceCollectionLayer(
        (collection: ResourceCollection<any>) => (
          <ResourceSelect
            key={`entity_select_${entity.name}_${key}`}
            valueKey="id"
            labelKey={(value: any): React.ReactNode => {
              return entity.render(value);
            }}
            resourceCollection={collection}
            showSearch={true}
            {...rest}
          />
        )
      )}
    </>
  );
};
