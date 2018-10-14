import { ActionButtonProps } from 'webpanel-antd/lib/table/ResourceTableActionButtons';
import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { Button, Icon, Popconfirm, Modal } from 'antd';
import * as React from 'react';
import { ResourceCollectionLayer, ResourceCollection } from 'webpanel-data';
import { ResourceTable } from 'webpanel-antd';

import '../../../styles/data-grid.css';

import { Entity } from '../../model/Entity';
import { EntityField } from '../../model/EntityField';
import { DataGridCell } from './cell';
import { EntityEdit } from '../pages/edit';

export interface IDataGridProps {
  entity: Entity<any>;
  fields?: string[];
  editWholeRows?: boolean;
  initialFilters?: DataSourceArgumentMap;
}
export interface IDataGridState {
  rowValues: { [key: string]: { [key: string]: any } };
  editingFlags: { [key: string]: boolean };
  addingNewEntity: boolean;
}

export class DataGrid extends React.Component<IDataGridProps, IDataGridState> {
  state = {
    rowValues: {},
    editingFlags: {},
    addingNewEntity: false
  };

  toggleEditing = (
    resourceID: string,
    fields: EntityField<any, any>[],
    force: boolean = false
  ) => {
    const editingFlags = this.state.editingFlags;
    for (let field of fields) {
      const flag =
        this.props.editWholeRows || !field
          ? resourceID + '_row'
          : resourceID + '_field_' + field.name;
      if (!editingFlags[flag] || force) {
        editingFlags[flag] = !editingFlags[flag];
      }
    }

    this.setState({ editingFlags });
  };

  isEditing = (resourceID: string, field?: EntityField<any, any>): boolean => {
    const editingFlags = this.state.editingFlags;
    const flag =
      this.props.editWholeRows || !field
        ? resourceID + '_row'
        : resourceID + '_field_' + field.name;
    return editingFlags[flag];
  };

  onValueChange = (record: any, field: EntityField<any, any>, value: any) => {
    const resourceID = record.id;
    const rowValues = this.state.rowValues;
    const rowValue = rowValues[resourceID] || record;
    rowValue[field.columnName] = value;
    rowValues[resourceID] = rowValue;
    this.setState({ rowValues });
  };

  saveChange = async (
    resource: ResourceCollection,
    record: any,
    fields: EntityField<any, any>[]
  ) => {
    const item = resource.getItem({ id: record.id });

    let values = {};
    const rowValues = this.state.rowValues[record.id];

    if (rowValues) {
      for (let field of fields) {
        const value = rowValues[field.columnName];
        values[field.columnName] = value;
      }
      item.fields = ['id'];
      await item.update(values);
      await resource.get();
      if (rowValues[record.id]) {
        delete rowValues[record.id];
      }
    }
    this.setState(rowValues);
    this.toggleEditing(record.id, fields, true);
  };

  deleteRow = async (resource: ResourceCollection, resourceID: string) => {
    const item = resource.getItem({ id: resourceID });
    item.fields = ['id'];
    await item.delete();
    await resource.get();
  };

  actionButtons = (
    resource: ResourceCollection,
    fields: EntityField<any, any>[]
  ) => {
    const { editWholeRows } = this.props;
    return editWholeRows
      ? [
          (props: ActionButtonProps) =>
            this.isEditing(props.resourceID.toString()) ? (
              <Button
                key="save"
                htmlType="button"
                onClick={() => this.saveChange(resource, props.values, fields)}
              >
                <Icon type="save" />
              </Button>
            ) : (
              <Button
                key="edit"
                htmlType="button"
                onClick={() =>
                  this.toggleEditing(props.resourceID.toString(), fields)
                }
              >
                <Icon type="edit" />
              </Button>
            ),
          (props: ActionButtonProps) => (
            <Popconfirm
              key="delete"
              title="Do you want to delete this item?"
              okText="Yes"
              cancelText="No"
              onConfirm={() =>
                this.deleteRow(resource, props.resourceID.toString())
              }
            >
              {' '}
              <Button htmlType="button">
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          )
        ]
      : undefined;
  };

  render() {
    const { entity, fields, initialFilters } = this.props;
    const { rowValues, addingNewEntity } = this.state;

    const gridFields = entity.fields.filter(
      field => !fields || fields.indexOf(field.name) !== -1
    );

    return (
      <ResourceCollectionLayer
        dataSource={entity.dataSource}
        name={entity.name}
        fields={['id', ...gridFields.map(x => x.fetchField)]}
        initialFilters={initialFilters}
        render={(resource: ResourceCollection) => {
          const actionButtons = this.actionButtons(resource, gridFields);

          return (
            <div>
              <Button
                htmlType="button"
                type="primary"
                onClick={() => this.setState({ addingNewEntity: true })}
              >
                +
              </Button>
              <Modal
                align={{}}
                title="Add new"
                visible={addingNewEntity}
                afterClose={() => resource.get()}
              >
                <EntityEdit
                  entity={entity}
                  onCreate={() => this.setState({ addingNewEntity: false })}
                />
              </Modal>
              <ResourceTable
                size="small"
                className="datagrid"
                scroll={{ x: true }}
                bordered={true}
                resourceCollection={resource}
                columns={gridFields.map((field, i) => ({
                  key: i,
                  title: field.title,
                  render: (value: any, record: any) => (
                    <DataGridCell
                      values={rowValues[record.id] || record}
                      field={field}
                      isEditing={this.isEditing(record.id, field)}
                      onClick={() => this.toggleEditing(record.id, [field])}
                      onChange={value =>
                        this.onValueChange(record, field, value)
                      }
                      onSave={() => this.saveChange(resource, record, [field])}
                      onCancel={() =>
                        this.toggleEditing(record.id, [field], true)
                      }
                    />
                  )
                }))}
                actionButtons={actionButtons}
              />
            </div>
          );
        }}
      />
    );
  }
}
