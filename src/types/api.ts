export type SortField = 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date'
export type SortDir = 'ASC' | 'DESC'

export type Sorting = { field: SortField; type: SortDir }
export type Pagination = { pageSize: number; pageNumber: number; total: number }
export type Paged<T> = { data: T[]; pagination: Pagination; sorting?: Sorting }