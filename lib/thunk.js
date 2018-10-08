export function getThunkValue(thunk) {
    if (typeof thunk === 'function') {
        return thunk();
    }
    return thunk;
}
//# sourceMappingURL=thunk.js.map