var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { EntityField } from '../EntityField';
import { InputNumber } from 'antd';
var EntityFieldNumber = /** @class */ (function (_super) {
    __extends(EntityFieldNumber, _super);
    function EntityFieldNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityFieldNumber.prototype.inputElement = function () {
        return React.createElement(InputNumber, null);
    };
    return EntityFieldNumber;
}(EntityField));
export { EntityFieldNumber };
//# sourceMappingURL=EntityFieldNumber.js.map