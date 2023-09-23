import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional (default: "api")
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => "/heroes",
      providesTags: ["Heroes"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({ url: `/heroes/${id}`, method: "DELETE" }),
      invalidatesTags: ["Heroes"],
    }),
    createHero: builder.mutation({
      query: (hero) => ({
        url: "/heroes",
        method: "POST",
        body: hero, // Automatically converts to JSON by library
      }),
      invalidatesTags: ["Heroes"],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useDeleteHeroMutation,
  useCreateHeroMutation,
} = apiSlice;
