import * as React from "react";
import {
  EntityEdit,
  IEntityEditConfig,
  EntityOnSaveHandler
} from "../pages/edit";
import { Entity } from "../../model/Entity";

export interface IEntityEditLayoutProps extends IEntityEditConfig {
  resourceID?: string | number;
  entity: Entity<any>;
  onCreate?: (id: string) => void;
  onSave?: EntityOnSaveHandler;
  onCancel?: () => void;
}

export class EntityEditLayout extends React.Component<IEntityEditLayoutProps> {
  public render() {
    // const {
    //   resourceID,
    //   form,
    //   entity,
    //   initialValues,
    //   onCreate,
    //   onSave,
    //   wrapperType
    // } = this.props;
    return (
      <EntityEdit
        // entity={entity}
        // resourceID={resourceID}
        // form={form}
        // onCreate={onCreate}
        // onSave={onSave}
        // wrapperType={wrapperType}
        // initialValues={initialValues}
        {...this.props}
      />
    );
  }
}
