import { Elysia, t } from 'elysia'
import { FolderHandler } from '../handler/folder.handler'

const validationId = {
  params: t.Object({
    id: t.Number()
  })
}

export const folderRoutes = (app: Elysia) =>
  app.group('/folders', (group) =>
    group
      .get('/:id', FolderHandler.get, validationId)
      .get('/:id/files', FolderHandler.getFiles, validationId)
      .get('/:id/path', FolderHandler.getPath, validationId)
      .get('/search/:keyword', FolderHandler.search)
  )