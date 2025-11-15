import { AnyMySqlColumn } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { mysqlTable as table } from 'drizzle-orm/mysql-core'

export const folders = table('folders', {
  id: t.int().primaryKey().autoincrement(),
  name: t.varchar('name', { length: 255 }).notNull(),
  parentId: t.int('parent_id').references((): AnyMySqlColumn => folders.id),
})

export const files = table('files', {
  id: t.int().primaryKey().autoincrement(),
  name: t.varchar('name', { length: 255 }).notNull(),
  size: t.int('size').notNull(),
  mimeType: t.varchar('mime_type', { length: 255 }).notNull(),
  folderId: t.int('folder_id').references((): AnyMySqlColumn => folders.id),
})

export type Folder = typeof folders.$inferSelect;
export type File = typeof files.$inferSelect;