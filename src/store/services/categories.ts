import { api } from './api'
import { buildParams } from '../../shared/lib/params'

export type Category = { id: string; name: string; photo?: string }

export type Pagination = { pageSize?: number; pageNumber?: number }
export type DateRange = { gte?: string; lte?: string }
export type Sorting = { type: 'ASC' | 'DESC'; field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date' }

export type CategoryFilters = {
  name?: string;
  ids?: string[];
  pagination?: Pagination;
  createdAt?: DateRange;
  updatedAt?: DateRange;
  sorting?: Sorting;
}

type Paged<T> = { rows: T[]; page: number; pageSize: number; total: number }

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Paged<Category>, CategoryFilters | void>({
      query: (filters) => ({
        url: '/categories',
        method: 'GET',
        params: buildParams(filters as any)
      }),
      providesTags: (res) =>
        res
          ? [
              ...res.data.map(c => ({ type: 'Category' as const, id: c.id })),
              { type: 'Category' as const, id: 'LIST' }
            ]
          : [{ type: 'Category' as const, id: 'LIST' }]
    }),
    createCategory: build.mutation<Category, { name: string; photo?: string }>({
      query: (body) => ({ url: '/categories', method: 'POST', body }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }]
    }),
    updateCategory: build.mutation<Category, { id: string; name?: string; photo?: string }>({
      query: ({ id, ...rest }) => ({ url: `/categories/${id}`, method: 'PATCH', body: rest }),
      invalidatesTags: (res) => res ? [{ type: 'Category', id: res.id }] : [{ type: 'Category', id: 'LIST' }]
    }),
    deleteCategory: build.mutation<Category, string>({
      query: (id) => ({ url: `/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }]
    })
  })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi
