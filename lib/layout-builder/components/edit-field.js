export var LayoutBuilderEditField = function (props) {
    var name = props.name, entity = props.entity, formLayout = props.formLayout, values = props.values, formInstance = props.formInstance;
    var field = entity.getField(name);
    if (field === null) {
        return "unknown field ".concat(name);
    }
    if (!field.isWriteable(values)) {
        return null;
    }
    return field.fieldElement(name, { formLayout: formLayout, formInstance: formInstance }, values);
};
//# sourceMappingURL=edit-field.js.map