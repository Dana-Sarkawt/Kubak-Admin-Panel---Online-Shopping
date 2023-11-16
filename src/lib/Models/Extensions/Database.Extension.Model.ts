export interface Database {
  $id: string;
  $createdAt: Date;
  $updatedAt: Date;
  $deletedAt: Date | null;
  $permissions: [];
  $databaseId: string;
  $collectionId: string;
}
