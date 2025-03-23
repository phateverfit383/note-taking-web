import { Note } from "./type";
import { ApiService } from "../apiService";

const apiService = new ApiService();

export async function getNoteBySlug(slug: string): Promise<Note> {
  const res = await apiService.get(`/notes-public?slug=${slug}`, "");
  return res;
}
