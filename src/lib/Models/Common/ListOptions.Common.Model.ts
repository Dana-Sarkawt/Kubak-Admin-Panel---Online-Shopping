export interface GenericListOptions extends FilteringOptions {
    page?: number,
    limit?: number,
    sortField?: string,
}

interface FilteringOptions {
    search?: string,
    from?: string,
    to?: string,
    status?: number,
}