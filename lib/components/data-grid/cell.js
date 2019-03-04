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
var DataGridCell = /** @class */ (function (_super) {
    __extends(DataGridCell, _super);
    function DataGridCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // componentDidMount() {
    //   document.addEventListener('click', this.handleClickOutside, true);
    // }
    // componentWillUnmount() {
    //   document.removeEventListener('click', this.handleClickOutside, true);
    // }
    // handleClickOutside = () => {
    //   this.props.onSave();
    // };
    DataGridCell.prototype.render = function () {
        var _a = this.props, values = _a.values, field = _a.field, isEditing = _a.isEditing, onClick = _a.onClick, onChange = _a.onChange
        // onSave,
        // onCancel
        ;
        return (React.createElement("span", { onClick: function () { return onClick && onClick(); } }, isEditing
            ? // <Popconfirm
                //   title={null}
                //   icon={null}
                //   okText="✓"
                //   cancelText="✗"
                //   placement="bottomRight"
                //   visible={true}
                //   onConfirm={onSave}
                //   onCancel={onCancel}
                // >
                field.inputElement({
                    value: values[field.columnName()],
                    onChange: onChange,
                    autoFocus: true
                })
            : // </Popconfirm>
                field.render(values)));
    };
    return DataGridCell;
}(React.Component));
export { DataGridCell };
//# sourceMappingURL=cell.js.map