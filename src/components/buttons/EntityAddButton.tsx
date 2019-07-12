import * as React from 'react';

import { Button } from 'antd';
import { Entity } from '../../model/Entity';
import { Link } from 'webpanel-antd';

export interface IEntityAddButtonProps {
  flow: 'modal' | 'redirect';
  initialValues?: { [key: string]: any };
}
interface IEntityAddButtonComponentProps extends IEntityAddButtonProps {
  entity: Entity<any>;
  // called only if flow='modal'
  onCreate?: () => void;
}
interface IEntityAddButtonState {
  showModal: boolean;
}

export class EntityAddButton extends React.Component<
  IEntityAddButtonComponentProps,
  IEntityAddButtonState
> {
  public state = { showModal: false };

  public render() {
    const { entity, initialValues, flow } = this.props;

    if (flow === 'redirect') {
      return (
        <Link to={entity.getCreateLink()} key="newButton">
          <Button size="small" htmlType="button" icon="plus" />
        </Link>
      );
    }

    return (
      <>
        {entity.getCreateView(
          {
            initialValues,
            wrapperType: 'modal',
            modal: {
              title: `Create ${entity.title}`,
              visible: this.state.showModal,
              destroyOnClose: true
            }
          },
          {
            onCancel: this.hideModal,
            onSave: () => {
              this.hideModal();
              const fn = this.props.onCreate;
              if (fn) {
                fn();
              }
            }
          }
        )}
        <Button
          size="small"
          icon="plus"
          onClick={() => this.setState({ showModal: true })}
        />
      </>
    );
  }

  private hideModal = () => {
    this.setState({ showModal: false });
  };
}