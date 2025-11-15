import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { folders, files } from '../db/schema'
import dotenv from 'dotenv'

dotenv.config()

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'db_name'
})
const db = drizzle(connection)

async function createFoldersWithChildren(
  parentId: number | null,
  level: number,
  maxLevel: number,
) {
  if (level > maxLevel) return []

  const folderIds: number[] = []

  for (let i = 1; i <= 5; i++) {
    const [result] = await db
      .insert(folders)
      .values({
        name: `Folder L${level}-${i}${parentId ? ` (child of ${parentId})` : ''}`,
        parentId,
      })
      .$returningId()

    const folderId = result.id
    folderIds.push(folderId)

    const fileValues = Array.from({ length: 5 }).map((_, idx) => ({
      name: `File L${level}-${i}-${idx + 1}.txt`,
      size: Math.floor(Math.random() * 1000) + 100,
      mimeType: 'text/plain',
      folderId,
    }))
    await db.insert(files).values(fileValues)

    await createFoldersWithChildren(folderId, level + 1, maxLevel)
  }

  return folderIds
}

async function main() {
  console.log('🌱 Seeding data dimulai...')

  await db.delete(files)
  await db.delete(folders)

  await createFoldersWithChildren(null, 1, 5)

  console.log('✅ Selesai! Semua folder & file berhasil dibuat.')
  await connection.end()
}

main().then(() => {
    console.log("✅ Seed complete")
    process.exit(0)
  }).catch((err) => {
  console.error('❌ Gagal seeding:', err)
  process.exit(1)
})
