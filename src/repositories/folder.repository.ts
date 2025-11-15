import { asc, eq, isNull, like } from 'drizzle-orm'
import { db } from '../db'
import { files, folders } from '../db/schema'
import type { Folder, File } from '../db/schema'

export const FolderRepository = {
  get: async (parentId?: number): Promise<Folder[]> =>
    await db.query.folders.findMany({
      where: parentId != -1 ? 
        eq(folders.parentId, Number(parentId)) : 
        isNull(folders.parentId),
      orderBy: [asc(folders.name)]
    }),

  getPath: async (parentId: number): Promise<Folder[]> => {
    const breadcrumbs: Folder[] = [];
    let currentId = parentId;

    while (currentId !== null && currentId !== -1) {
      const folder = await db.query.folders.findFirst({
        where: eq(folders.id, currentId)
      });

      if (!folder) break;
      breadcrumbs.unshift(folder);
      currentId = folder.parentId!;
    }

    return breadcrumbs;
  },

  getFiles: async (folderId: number): Promise<File[]> =>
    await db.query.files.findMany({
      where: eq(files.folderId, folderId),
    }),

  search: async (keyword: string): Promise<{ folders: Folder[]; files: File[] }> => {
    const [folderResults, fileResults]: [Folder[], File[]] = await Promise.all([
      db.query.folders.findMany({
        where: like(folders.name, `%${keyword}%`),
        orderBy: [asc(folders.name)]
      }),
      db.query.files.findMany({
        where: like(files.name, `%${keyword}%`),
        orderBy: [asc(files.name)]
      })
    ]);

    return { folders: folderResults, files: fileResults };
  }
}
