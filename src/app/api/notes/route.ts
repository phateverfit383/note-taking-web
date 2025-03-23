import { API_URL } from "@/constant/env";
import { Note } from "./type";

export async function searchNotes(search: string): Promise<Note[]> {
  const res = await fetch(`${API_URL}/notes?q=${search}`);
  const data = await res.json();
  return data;
}

export async function createNote(title: string) {
  const body = {
    title,
  };
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export async function deleteNote(id: string) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

export async function updateNote(id: string, title: string, content: string) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  return data;
}
