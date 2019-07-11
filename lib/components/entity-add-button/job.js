var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { Button, Card } from 'antd';
import { Entity } from 'webpanel-admin';
import { SortInfoOrder } from 'webpanel-data';
import { StatusBadge } from 'src/components/status';
import { api } from './api';
import { getCurrentWorkspaceID } from './workspace';
import { project } from './project';
var jobStates = {
    QUEUED: 'Queued',
    RUNNING: 'Running',
    FAILED: 'Failed',
    COMPLETED: 'Completed'
};
export var job = new Entity({
    name: 'Job',
    icon: 'bars',
    list: function () { return ({
        table: {
            condensed: true,
            actionButtons: ['detail', 'delete']
        },
        fields: ['project', 'type', 'state', 'createdAt'],
        initialSorting: [{ columnKey: 'createdAt', order: SortInfoOrder.descend }],
        initialFilters: {
            project: { customer: { workspace: { id: getCurrentWorkspaceID() } } }
        },
        autopersistConfigKey: "jobs_list_" + getCurrentWorkspaceID(),
        pollInterval: 5000
    }); },
    detail: {
        pollInterval: 5000
    },
    dataSource: api,
    showDetailPage: true
})
    .enumField('type', {
    options: [
        { label: 'Deploy views', value: 'DEPLOY_VIEWS' },
        { label: 'Deploy project', value: 'DEPLOY_PROJECT' },
        { label: 'Delete project', value: 'DELETE_PROJECT' },
        { label: 'Workflow', value: 'WORKFLOW' }
    ],
    // filter: true,
    rules: [{ required: true }]
})
    .enumField('state', {
    visible: ['list', 'detail'],
    options: Object.keys(jobStates).map(function (key) { return ({
        value: key,
        label: jobStates[key]
    }); }),
    // filter: true,
    render: function (values) { return (React.createElement(StatusBadge, { state: values.state, mapping: jobStates, successStates: ['COMPLETED'], errorStates: ['FAILED'] })); }
})
    .relationshipField('project', {
    type: 'toOne',
    targetEntity: function () { return project; },
    rules: [{ required: true }],
    filter: true
})
    .dateField('createdAt', {
    showTime: true,
    visible: ['list'],
    sortable: true,
    filter: { range: true }
})
    .dateField('updatedAt', { showTime: true, visible: [] })
    // .textField('error', { visible: ['detail'] })
    .textField('info', {
    visible: ['detail'],
    render: function (values) { return (React.createElement(Card, null,
        React.createElement("pre", null,
            React.createElement("code", null, values.info)))); }
});
var CreateJobButton = /** @class */ (function (_super) {
    __extends(CreateJobButton, _super);
    function CreateJobButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showModal: false };
        _this.hideModal = function () {
            _this.setState({ showModal: false });
        };
        return _this;
    }
    CreateJobButton.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            job.getCreateView({
                initialValues: {
                    type: 'WORKFLOW',
                    projectId: this.props.projectID
                },
                wrapperType: 'modal',
                modal: {
                    title: 'Create job',
                    visible: this.state.showModal,
                    destroyOnClose: true
                }
            }, {
                onCancel: this.hideModal,
                onSave: function () {
                    _this.hideModal();
                    _this.props.onCreate();
                }
            }),
            React.createElement(Button, { size: "small", icon: "plus", onClick: function () { return _this.setState({ showModal: true }); } })));
    };
    return CreateJobButton;
}(React.Component));
export { CreateJobButton };
//# sourceMappingURL=job.js.map