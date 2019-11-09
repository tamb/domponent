import { IComponent, InfernoNode, StatelessComponent } from './types';
export declare function rerender(): void;
export declare type ComponentType<P = {}> = Component<P> | StatelessComponent<P>;
export declare class Component<P = {}, S = {}> implements IComponent<P, S> {
    state: S | null;
    props: {
        children?: InfernoNode;
    } & P;
    context: any;
    displayName?: string;
    refs?: any;
    $BR: boolean;
    $BS: boolean;
    $PS: Partial<S> | null;
    $LI: any;
    $UN: boolean;
    $CX: any;
    $QU: Function[] | null;
    $N: boolean;
    $SSR?: boolean;
    $L: Function[] | null;
    $SVG: boolean;
    constructor(props?: P, context?: any);
    forceUpdate(callback?: Function): void;
    setState<K extends keyof S>(newState: ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null) | (Pick<S, K> | S | null), callback?: () => void): void;
    componentDidMount?(): void;
    componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: P, nextContext: any): void;
    shouldComponentUpdate?(nextProps: P, nextState: S, context: any): boolean;
    componentWillUpdate?(nextProps: P, nextState: S, context: any): void;
    componentDidUpdate?(prevProps: P, prevState: S, snapshot: any): void;
    componentWillUnmount?(): void;
    getChildContext?(): void;
    getSnapshotBeforeUpdate?(prevProps: P, prevState: S): any;
    static defaultProps?: any;
    static getDerivedStateFromProps?(nextProps: any, state: any): any;
    render(_nextProps: P, _nextState: S, _nextContext: any): InfernoNode | undefined;
}
