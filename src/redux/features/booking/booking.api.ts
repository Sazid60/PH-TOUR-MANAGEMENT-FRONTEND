import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       createBooking: builder.mutation({
            query: (bookinGData) => ({
                url: `/booking`,
                method: "POST",
                data : bookinGData
            }),
            invalidatesTags: ["BOOKING"],
        }),

        getTourTypes: builder.query({
            query: () => ({
                url: "/tours/tour-types",
                method: "GET",
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => response.data
        }),
    }),
});

export const {
useCreateBookingMutation
} = bookingApi;