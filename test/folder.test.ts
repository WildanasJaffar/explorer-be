import { describe, it, expect } from "bun:test";
import { Elysia } from "elysia";

const url = 'http://localhost';
describe("Folder", () => {
  it("GET /folders/:id", async () => {
    const app = new Elysia().get('/folders/-1', () => [
      { id: 1, name: "Folder 1", parent_id: null }
    ]);

    const response = await app.handle(new Request(`${url}/folders/-1`))

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data[0].id).toBe(1)
    expect(data[0].name).toBe("Folder 1")
    expect(data[0].parent_id).toBe(null)
  });

  it("GET /folders/:id/files", async () => {
    const app = new Elysia().get('/folders/1/files', () => [
      { id: 1, name: "File 1.txt" }
    ]);

    const response = await app.handle(new Request(`${url}/folders/1/files`))

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data[0].id).toBe(1)
    expect(data[0].name).toBe("File 1.txt")
  });

  it("GET /folders/:id/path", async () => {
    const app = new Elysia().get('/folders/2/path', () => [
      { id: 1, name: "Folder 1", parent_id: null  },
      { id: 2, name: "Folder 2 (child of 1)", parent_id: 1 }
    ]);

    const response = await app.handle(new Request(`${url}/folders/2/path`))

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data[0].id).toBe(1)
    expect((data as { name: string }[]).map(({ name }) => name).join(" > ")).toBe("Folder 1 > Folder 2 (child of 1)")
  });

  it("GET /folders/search/:keyword", async () => {
    const app = new Elysia().get('/folders/search/3', () => ({
        folders: [
          { id: 3, name: "Folder 3 (child of 2)", parent_id: 2 },
        ],
        files: [
          { id: 4, name: "File 3.txt" }
        ]
    }))

    const response = await app.handle(new Request(`${url}/folders/search/3`))

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.folders[0].name).toBe('Folder 3 (child of 2)');
    expect(data.files[0].id).toBe(4);
  });
});
