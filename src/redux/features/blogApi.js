// src/redux/features/blogApi.jsx
import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const blogApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Public Endpoints
    getBlogList: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        category = "",
        sortBy = "",
        createBy = "",
      } = {}) => ({
        url: `${endpoints.blog.getListBlog}?page=${page}&limit=${limit}&search=${search}&category=${category}&sortBy=${sortBy}&createBy=${createBy}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: endpoints.blog.getAllBlogs,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    getBlogById: builder.query({
      query: (id) => ({
        url: `${endpoints.blog.getBlogById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    getBlogBySlug: builder.query({
      query: (slug) => ({
        url: `${endpoints.blog.getBlogBySlug}/${slug}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    getPopularBlogs: builder.query({
      query: () => ({
        url: endpoints.blog.getPopularBlogs,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    // Protected Endpoints
    createBlog: builder.mutation({
      query: (formData) => ({
        url: endpoints.blog.createBlog,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.blog.updateBlog}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${endpoints.blog.deleteBlog}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    toggleBlogStatus: builder.mutation({
      query: (id) => ({
        url: `${endpoints.blog.toggleBlogStatus}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogListQuery,
  useGetAllBlogsQuery,
  useGetBlogBySlugQuery,
  useGetBlogByIdQuery,
  useGetPopularBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useToggleBlogStatusMutation,
} = blogApi;
