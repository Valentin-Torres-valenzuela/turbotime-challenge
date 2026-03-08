import api from "@/lib/api";

export interface Note {
  id: number;
  title: string;
  content: string;
  category: number | null;
  category_name?: string;
  category_color?: string;
  created_at: string;
  updated_at: string;
}

export const noteService = {
  async getNotes(categoryId?: number) {
    const params = categoryId ? { category: categoryId } : {};
    const response = await api.get<Note[]>("notes/", { params });
    return response.data;
  },
  async createNote(data: Partial<Note>) {
    const response = await api.post<Note>("notes/", data);
    return response.data;
  },
  async updateNote(id: number, data: Partial<Note>) {
    const response = await api.put<Note>(`notes/${id}/`, data);
    return response.data;
  },
  async deleteNote(id: number) {
    await api.delete(`notes/${id}/`);
  },
};
