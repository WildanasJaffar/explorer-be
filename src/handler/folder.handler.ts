import { Folder, File } from '../db/schema'
import { FolderService } from '../services/folder.service'

export const FolderHandler = {
  get: async ({ params }: any): Promise<Folder[]> => {
    return await FolderService.get(params.id)
  },

  getFiles: async ({ params }: any): Promise<File[]>  => {
    return await FolderService.getFiles(Number(params.id))
  },

  getPath: async ({ params }: any): Promise<Folder[]>  => {
    return await FolderService.getPath(Number(params.id))
  },

  search: async ({ params }: any): Promise<{folders: Folder[], files: File[]}> => {
    return await FolderService.search(String(params.keyword))
  }
}
