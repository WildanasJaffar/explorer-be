import { Folder, File } from '../db/schema'
import { FolderRepository } from '../repositories/folder.repository'

export const FolderService = {
  get: async (parentId?: number): Promise<Folder[]> => {
    return await FolderRepository.get(parentId)
  },

  getPath: async(parentId: number): Promise<Folder[]> => {
    return await FolderRepository.getPath(parentId)
  },

  getFiles: async (folderId: number): Promise<File[]>  => {
    return await FolderRepository.getFiles(folderId)
  },

  search: async (keyword: string): Promise<{folders: Folder[], files: File[]}> => {
    return await FolderRepository.search(keyword)
  },
}
