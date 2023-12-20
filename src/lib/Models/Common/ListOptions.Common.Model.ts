export interface GenericListOptions extends FilteringOptions, AuthOptions {
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

interface AuthOptions {
    driverCheck?: boolean,
}