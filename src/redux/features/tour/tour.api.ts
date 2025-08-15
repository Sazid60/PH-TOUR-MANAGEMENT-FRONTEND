import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";




export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation({
            query: (tourData) => ({
                url: "/tours/create",
                method: "POST",
                data: tourData,
            }),
            invalidatesTags: ["TOUR"],
        }),
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tours/create-tour-type",
                method: "POST",
                data: tourTypeName,
            }),
            invalidatesTags: ["TOUR"],
        }),
        removeTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tours/tour-types/${tourTypeId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TOUR"],
        }),

        getTourTypes: builder.query({
            query: () => ({
                url: "/tours/tour-types",
                method: "GET",
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => response.data
        }),

        getAllTours: builder.query<ITourPackage[], unknown>({
            query: (params) => ({
                url: "/tours",
                method: "GET",
                params: params,
            }),
            providesTags: ["TOUR"],
            transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
        }),

    }),
});

export const {
    useAddTourTypeMutation,
    useGetTourTypesQuery,
    useRemoveTourTypeMutation,
    useAddTourMutation,
    useGetAllToursQuery
} = tourApi;