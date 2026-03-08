import api from "@/lib/api";

export interface Category {
  id: number;
  name: string;
  color: string;
}

export const categoryService = {
  async getCategories() {
    const response = await api.get<Category[]>("categories/");
    return response.data;
  },
  async createCategory(data: Partial<Category>) {
    const response = await api.post<Category>("categories/", data);
    return response.data;
  },
  async deleteCategory(id: number) {
    await api.delete(`categories/${id}/`);
  },
};
