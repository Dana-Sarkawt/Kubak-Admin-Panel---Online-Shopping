export interface Database {
  $id: string;
  $createdAt: Date | string;
  $updatedAt: Date | string;
  $permissions: [];
  $databaseId: string;
  $collectionId: string;
}
