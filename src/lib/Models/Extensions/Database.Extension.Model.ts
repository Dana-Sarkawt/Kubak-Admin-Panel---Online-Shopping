export interface Database {
    $id: string;
    $createdAt: Date | string;
    $updatedAt: Date | string;
    $permissions: [];
    $databaseId: string;
    $collectionId: string;
}

export interface DatabaseAuth {
    $createdAt: string | Date;
    $id: string;
    $updatedAt: string | Date;
}
