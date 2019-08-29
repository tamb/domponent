export const attributeEnum = {
    COMPONENT: 'data-component',
    ACTION: 'data-action',
    BIND: 'data-bind',
    INITIALSTATE: 'data-state',
    INITIALPROPS: 'data-props',
    KEY: 'data-key',
    REF: 'data-ref',
}

export const datasetEnum = {
    component: 'component',
    key: 'key',
    props: 'props',
    action: 'action',
    state: 'state',
    bind: 'bind',
    ref: 'ref'
};

export const relationalStringEnum = {
    INHERITS_FROM: '<-',
    FROM_COMPONENT: '.',
    KEY_VALUE: ':',
    MULTIPLE_VALUES: "|",
    METHOD_CALL: "->",
    LIST: ","
}

export const eventOptions = {
    ONCE: 'once',
    PASSIVE: 'passive',
    CAPTURE: 'capture'
};