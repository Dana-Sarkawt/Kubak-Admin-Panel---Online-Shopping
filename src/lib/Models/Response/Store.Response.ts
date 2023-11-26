export interface Store<T> {
    data: T[];
    total: number;
    pages?: number;
}
