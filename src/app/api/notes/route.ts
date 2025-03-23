import { API_URL } from "@/constant/env";
import { Note } from "./type";
import { ApiService } from "../apiService";

const apiService = new ApiService();

export async function searchNotes(search: string = ""): Promise<Note[]> {
  const res = await apiService.get("/notes", { q: search });
  return res;
}

export async function createNote(title: string, content: string) {
  const body = {
    title,
    content,
  };
  const res = await apiService.post("/notes", "", body);
  return res;
}

export async function deleteNote(id: string) {
  const res = await apiService.delete("/notes", id);
  return res;
}

export async function updateNote(id: string, title: string, content: string) {
  const res = await apiService.put("/notes", id, { title, content });
  return res;
}
