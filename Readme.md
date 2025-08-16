# PH-TOUR-MANAGEMENT-FRONTEND-6

GitHub Link: https://github.com/Apollo-Level2-Web-Dev/ph-tour-management-system-frontend/tree/part-6

## 40-1 Overview of Dummy Components and ShadCN UI Blocks

- For Home Page Components We will use Shadcn Components block

[Shadcn Blocks](https://www.shadcnblocks.com/)

- routes -> index.ts

```ts
import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/verify";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { HomePage } from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: withAuth(About),
        path: "about",
      },
      {
        Component: withAuth(About),
        path: "about",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",

    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "login",
  },
  {
    Component: Register,
    path: "register",
  },
  {
    Component: Verify,
    path: "verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
```

- pages - > Homepage.tsx

```tsx
import { HeroSection } from "@/components/modules/HomePage/HeroSection";

export function HomePage() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
```

- components -> HomePage -> HeroSection.tsx

```tsx
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32 min-h-screen">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <Logo />
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Export The Beauty Of{" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild>
                <Link to="/tours">Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## 40-2 Type-Safe RTK Query GET Requests with Parameter Handling

- routes -> index.ts

```tsx
import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/verify";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { HomePage } from "@/pages/HomePage";
import Tours from "@/pages/Tours";
import TourDetails from "@/pages/TourDetails";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: withAuth(About),
        path: "about",
      },
      {
        Component: withAuth(About),
        path: "about",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",

    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "login",
  },
  {
    Component: Register,
    path: "register",
  },
  {
    Component: Verify,
    path: "verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
```

- type -> tour.type.ts

```ts
export interface ITourPackage {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  arrivalLocation: string;
  departureLocation: string;
  location: string;
  description: string;
  costFrom: number;
  maxGuest: number;
  minAge: number;
  division: string;
  tourType: string;
  amenities: string[];
  included: string[];
  excluded: string[];
  tourPlan: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}
```

- make tour query type safe

- type -> index.ts

```ts
export type {
  ISendOtp,
  IVerifyOtp,
  ILogin,
  ISidebarItems,
  TRole,
} from "./auth.type";
export type { ITourPackage } from "./tour.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}
```

- redux -> features -> tour -> tour.api.ts

```ts
        getAllTours: builder.query<ITourPackage[], unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params: params,
            }),
            providesTags: ["TOUR"],
            transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
        }),
```

- Pages -> TOUR.tsa

```tsx
import { Button } from "@/components/ui/button";

import { Link, useSearchParams } from "react-router";

import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { TourFilters } from "@/components/modules/Tours/TourFilters";

export default function Tours() {
  const [searchParams] = useSearchParams();

  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;

  const { data } = useGetAllToursQuery({ division, tourType });

  return (
    <div className="container mx-auto px-5 py-8 grid grid-cols-12 gap-5">
      <TourFilters />
      <div className="col-span-9 w-full">
        {data?.map((item) => (
          <div
            key={item.slug}
            className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex"
          >
            <div className="w-2/5 bg-red-500 flex-shrink-0">
              <img
                src={item.images[0]}
                alt={item.title}
                className="object-cover w-full h-full "
              />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-3">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">
                  From ৳{item.costFrom.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  Max {item.maxGuest} guests
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium">From:</span>{" "}
                  {item.departureLocation}
                </div>
                <div>
                  <span className="font-medium">To:</span>{" "}
                  {item.arrivalLocation}
                </div>
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {item.tourPlan.length} days
                </div>
                <div>
                  <span className="font-medium">Min Age:</span> {item.minAge}+
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {item.amenities.length > 3 && (
                  <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                    +{item.amenities.length - 3} more
                  </span>
                )}
              </div>

              <Button asChild className="w-full">
                <Link to={`/tours/${item._id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- Pages -> TourDetails.tsx

```tsx
import { Button } from "@/components/ui/button";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import { Link, useParams } from "react-router";

export default function TourDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllToursQuery({ _id: id });

  const { data: divisionData } = useGetDivisionsQuery(
    {
      _id: data?.[0]?.division,
      fields: "name",
    },
    {
      skip: !data,
    }
  );

  console.log(divisionData);

  const tourData = data?.[0];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center  mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
          <div className="flex gap-4 text-gray-600 mb-4">
            <span>📍 {tourData?.location}</span>
            <span>💰 From ${tourData?.costFrom}</span>
            <span>👥 Max {tourData?.maxGuest} guests</span>
          </div>
        </div>
        <div>
          <Button asChild>
            <Link to={`/booking/${tourData?._id}`}>Book Now</Link>
          </Button>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tourData?.images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${tourData?.title} ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Tour Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Dates:</strong>{" "}
              {format(
                new Date(
                  tourData?.startDate ? tourData?.startDate : new Date()
                ),
                "PP"
              )}{" "}
              -{" "}
              {format(
                new Date(tourData?.endDate ? tourData?.endDate : new Date()),
                "PP"
              )}
            </p>
            <p>
              <strong>Departure:</strong> {tourData?.departureLocation}
            </p>
            <p>
              <strong>Arrival:</strong> {tourData?.arrivalLocation}
            </p>
            <p>
              <strong>Division:</strong> {divisionData?.[0]?.name}
            </p>
            <p>
              <strong>Tour Type:</strong> {tourData?.tourType}
            </p>
            <p>
              <strong>Min Age:</strong> {tourData?.minAge} years
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground">{tourData?.description}</p>
        </div>
      </div>

      {/* Amenities & Inclusions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
          <ul className="space-y-1">
            {tourData?.amenities?.map((amenity, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Included</h3>
          <ul className="space-y-1">
            {tourData?.included?.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Excluded</h3>
          <ul className="space-y-1">
            {tourData?.excluded?.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tour Plan */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Tour Plan</h3>
        <ol className="space-y-2">
          {tourData?.tourPlan?.map((plan, index) => (
            <li key={index} className="flex">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                {index + 1}
              </span>
              {plan}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
```

## 40-3 Managing Booking Data and Updating User Information

- pages -> booking.tsx

```tsx
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";

export default function Booking() {
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(totalAmount);

  const { id } = useParams();
  const { data, isLoading, isError } = useGetAllToursQuery({ _id: id });

  const tourData = data?.[0];

  useEffect(() => {
    if (!isLoading && !isError) {
      setTotalAmount(guestCount * tourData!.costFrom);
    }
  }, [guestCount, totalAmount, isLoading, isError]);

  const incrementGuest = () => {
    setGuestCount((prv) => prv + 1);
  };

  const decrementGuest = () => {
    setGuestCount((prv) => prv - 1);
  };

  const handleBooking = async () => {
    let bookingData;

    try {
      console.log(bookingData);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto">
      {!isLoading && isError && (
        <div>
          <p>Something Went Wrong!!</p>{" "}
        </div>
      )}

      {!isLoading && data?.length === 0 && (
        <div>
          <p>No Data Found</p>{" "}
        </div>
      )}

      {!isLoading && !isError && data!.length > 0 && (
        <>
          {/* Left Section - Tour Summary */}
          <div className="flex-1 space-y-6">
            <div>
              <img
                src={tourData?.images[0]}
                alt={tourData?.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
              <p className="text-gray-600 mb-4">{tourData?.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Location:</strong> {tourData?.location}
                </div>
                <div>
                  <strong>Duration:</strong> {tourData?.startDate} to{" "}
                  {tourData?.endDate}
                </div>
                <div>
                  <strong>Tour Type:</strong> {tourData?.tourType}
                </div>
                <div>
                  <strong>Max Guests:</strong> {tourData?.maxGuest}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What's Included</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {tourData?.included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Tour Plan</h3>
              <ol className="list-decimal list-inside text-sm space-y-1">
                {tourData?.tourPlan.map((plan, index) => (
                  <li key={index}>{plan}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Section - Booking Details */}
          <div className="w-full md:w-96">
            <div className="border border-muted p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decrementGuest}
                      disabled={guestCount <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">
                      {guestCount}
                    </span>
                    <button
                      onClick={incrementGuest}
                      disabled={guestCount >= tourData!.maxGuest}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Price per person:</span>
                    <span>${tourData?.costFrom}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Guests:</span>
                    <span>{guestCount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>

                <Button onClick={handleBooking} className="w-full" size="lg">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

## 40-4 Creating Bookings and Processing Payments with SSLCOMMERZ

- routes -> routes.index.ts

```ts
import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/verify";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { HomePage } from "@/pages/HomePage";
import Tours from "@/pages/Tours";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";
import { Success } from "@/pages/Payment/Success";
import { Fail } from "@/pages/Payment/Fail";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: withAuth(About),
        path: "about",
      },
      {
        Component: withAuth(About),
        path: "about",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
        Component: withAuth(Booking),
        path: "booking/:id",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",

    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "login",
  },
  {
    Component: Register,
    path: "register",
  },
  {
    Component: Verify,
    path: "verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: Success,
    path: "/payment/success",
  },
  {
    Component: Fail,
    path: "/payment/fail",
  },
]);
```

- redux -> features -> Booking -> booking.api.ts

```ts
import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookinGData) => ({
        url: `/booking`,
        method: "POST",
        data: bookinGData,
      }),
      invalidatesTags: ["BOOKING"],
    }),
  }),
});

export const { useCreateBookingMutation } = bookingApi;
```

- pages -> Booking.tsx

```tsx
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";

export default function Booking() {
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(totalAmount);

  const { id } = useParams();
  const { data, isLoading, isError } = useGetAllToursQuery({ _id: id });
  const [createBooking] = useCreateBookingMutation();

  const tourData = data?.[0];

  useEffect(() => {
    if (!isLoading && !isError) {
      setTotalAmount(guestCount * tourData!.costFrom);
    }
  }, [guestCount, totalAmount, isLoading, isError]);

  const incrementGuest = () => {
    setGuestCount((prv) => prv + 1);
  };

  const decrementGuest = () => {
    setGuestCount((prv) => prv - 1);
  };

  const handleBooking = async () => {
    let bookingData;
    if (data) {
      bookingData = {
        tour: id,
        guestCount: guestCount,
      };
    }

    try {
      const res = await createBooking(bookingData).unwrap();

      if (res.success) {
        window.open(res.data.paymentUrl);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto">
      {!isLoading && isError && (
        <div>
          <p>Something Went Wrong!!</p>{" "}
        </div>
      )}

      {!isLoading && data?.length === 0 && (
        <div>
          <p>No Data Found</p>{" "}
        </div>
      )}

      {!isLoading && !isError && data!.length > 0 && (
        <>
          {/* Left Section - Tour Summary */}
          <div className="flex-1 space-y-6">
            <div>
              <img
                src={tourData?.images[0]}
                alt={tourData?.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
              <p className="text-gray-600 mb-4">{tourData?.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Location:</strong> {tourData?.location}
                </div>
                <div>
                  <strong>Duration:</strong> {tourData?.startDate} to{" "}
                  {tourData?.endDate}
                </div>
                <div>
                  <strong>Tour Type:</strong> {tourData?.tourType}
                </div>
                <div>
                  <strong>Max Guests:</strong> {tourData?.maxGuest}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What's Included</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {tourData?.included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Tour Plan</h3>
              <ol className="list-decimal list-inside text-sm space-y-1">
                {tourData?.tourPlan.map((plan, index) => (
                  <li key={index}>{plan}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Section - Booking Details */}
          <div className="w-full md:w-96">
            <div className="border border-muted p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decrementGuest}
                      disabled={guestCount <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">
                      {guestCount}
                    </span>
                    <button
                      onClick={incrementGuest}
                      disabled={guestCount >= tourData!.maxGuest}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Price per person:</span>
                    <span>${tourData?.costFrom}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Guests:</span>
                    <span>{guestCount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>

                <Button onClick={handleBooking} className="w-full" size="lg">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

## 40-5 Implementing Basic Filters with React and RTK Query, 40-6 Managing State in Browser URL Using React Router searchParams, 40-7 Retrieving State from URL with searchParams

- Here a Crucial Prt arrived, Our Tour Component and Filtering component is separate, based on the filter component states we have to change the data of tour component, how to manage this as the state is in different Component? we can deal with this in different ways like we Can use `Redux state`, We can use `State Lifting` I amen decare state in tours then using in TourFilters. Those are not convenient. We will use `searchParams` of react router here and pass the information using params.
- why we have used `searchParams` ? The reason is we can share to others and they can see the information accurately. If states were used we could not share our state to others. Tour Component Becomes Independent because from hero section we can search from any page and then the desired type will be loaded in tour page

- components -> tours -> TourFilters.tsx

```tsx
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const tourTypeOptions = tourTypeData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  console.log(tourTypeOptions);

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams); // URLSearchParams is a built-in JavaScript object used to work with the query string of a URL.
    params.set("division", value); //The set method of URLSearchParams updates or adds a query parameter.
    setSearchParams(params); //setSearchParams is likely the setter function from useSearchParams() in React Router
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params);
  };

  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1>Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={(value) => handleDivisionChange(value)}
          value={selectedDivision ? selectedDivision : ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select
          onValueChange={handleTourTypeChange}
          value={selectedTourType ? selectedTourType : ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

- Pages -> Tours.tsx

```tsx
import { Button } from "@/components/ui/button";

import { Link, useSearchParams } from "react-router";

import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import TourFilters from "@/components/modules/Tours/TourFilters";

export default function Tours() {
  const [searchParams] = useSearchParams();

  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;

  const { data } = useGetAllToursQuery({ division, tourType });

  return (
    <div className="container mx-auto px-5 py-8 grid grid-cols-12 gap-5">
      <TourFilters />
      <div className="col-span-9 w-full">
        {data?.map((item) => (
          <div
            key={item.slug}
            className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex"
          >
            <div className="w-2/5 bg-red-500 flex-shrink-0">
              <img
                src={item.images[0]}
                alt={item.title}
                className="object-cover w-full h-full "
              />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-3">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">
                  From ৳{item.costFrom.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  Max {item.maxGuest} guests
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium">From:</span>{" "}
                  {item.departureLocation}
                </div>
                <div>
                  <span className="font-medium">To:</span>{" "}
                  {item.arrivalLocation}
                </div>
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {item.tourPlan.length} days
                </div>
                <div>
                  <span className="font-medium">Min Age:</span> {item.minAge}+
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {item.amenities.length > 3 && (
                  <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                    +{item.amenities.length - 3} more
                  </span>
                )}
              </div>

              <Button asChild className="w-full">
                <Link to={`/tours/${item._id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- components -> HomePage -> HeroSection.tsx

```tsx
import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useState } from "react";

export default function HeroSection() {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    undefined
  );

  const { data: divisionData } = useGetDivisionsQuery(undefined);

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  return (
    <section className="relative overflow-hidden py-32 min-h-screen">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Logo />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Explore the beauty of{" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Select onValueChange={(value) => setSelectedDivision(value)}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Divisions</SelectLabel>
                    {divisionOption?.map(
                      (item: { value: string; label: string }) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {selectedDivision ? (
                <Button asChild>
                  <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
                </Button>
              ) : (
                <Button disabled>Search</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## 40-8 Implementing Pagination with Previous and Next Buttons

- Install PAGINATION

```
bunx --bun shadcn@latest add pagination
```

- Pages -> TourTypes.tsx

```tsx
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AddTourType() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetTourTypesQuery({ page: currentPage });
  console.log(data);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing Type");
    try {
      const res = await removeTourType(tourId).unwrap();
      if (res.success) {
        toast.success("Removed", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { name: string; _id: string }) => (
              <TableRow>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell>
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button size="sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
```

## 40-9 Handling Pagination with Page Number Buttons

- pages -> admin ->AddTourType.tsx

```tsx
import { DeleteConfirmation } from "@/components/DeleteConfirmation";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";

export default function AddTourType() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const { data } = useGetTourTypesQuery({ page: currentPage, limit });
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeTourType(tourId).unwrap();

      if (res.success) {
        toast.success("Removed", { id: toastId });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  //* Total page 2 => [0, 0]

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { _id: string; name: string }) => (
              <TableRow>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell>
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button size="sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPage > 1 && (
        <div className="flex justify-end mt-4">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem
                      key={page}
                      onClick={() => setCurrentPage(page)}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {/* 1. Array.from({ length: totalPage }, (_, index) => index + 1)

Array.from creates a new array.

{ length: totalPage } → makes an array with that many "empty slots".

(_, index) => index + 1 → fills it with numbers starting from 1 up to totalPage.
Example: if totalPage = 5, the result will be [1, 2, 3, 4, 5].

2. .map((page) => (...))

Loops through each number from that array (1 through totalPage).

For each page, it returns some JSX (a PaginationItem).

3. <PaginationItem key={page} onClick={() => setCurrentPage(page)}>

Each pagination item is given a unique key (required by React lists).

onClick={() => setCurrentPage(page)} → when clicked, it updates the state currentPage to that number. */}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={
                      currentPage === totalPage
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
```

## 40-10 Resolving Race Conditions in RTK Query with Sequential Requests and Enhancing Data Fetching & Time Formatting

- Components -> TourTypes.tsx

```tsx
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  console.log(tourTypeOptions);

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams); // URLSearchParams is a built-in JavaScript object used to work with the query string of a URL.
    params.set("division", value); //The set method of URLSearchParams updates or adds a query parameter.
    setSearchParams(params); //setSearchParams is likely the setter function from useSearchParams() in React Router
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params);
  };

  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1>Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={(value) => handleDivisionChange(value)}
          value={selectedDivision ? selectedDivision : ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select
          onValueChange={handleTourTypeChange}
          value={selectedTourType ? selectedTourType : ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

- Handle the date format

```tsx
<p>
  <strong>Dates:</strong>{" "}
  {format(
    new Date(tourData?.startDate ? tourData?.startDate : new Date()),
    "PP"
  )}{" "}
  - {format(new Date(tourData?.endDate ? tourData?.endDate : new Date()), "PP")}
</p>
```
- Here is a situation like division data is dependent on Tour data, Tour data is fetching is delaying but in parallel division data are getting all the division data. Thi is Called Race Condition. We want to do it synchronously so we have to tell that bro hold on let the tour data come first. 

```tsx 
  const { data, isLoading } = useGetAllToursQuery({ _id: id });

  const { data: divisionData } = useGetDivisionsQuery(
    {
      _id: data?.[0]?.division,
      fields: "name",
    },
    {
      skip: !data,
    }
  );
```
- Pages -> TourDetails.tsx 


```tsx 
import { Button } from "@/components/ui/button";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import { Link, useParams } from "react-router";

export default function TourDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllToursQuery({ _id: id });

  const { data: divisionData } = useGetDivisionsQuery(
    {
      _id: data?.[0]?.division,
      fields: "name",
    },
    {
      skip: !data,
    }
  );

  console.log(divisionData);

  const tourData = data?.[0];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center  mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
          <div className="flex gap-4 text-gray-600 mb-4">
            <span>📍 {tourData?.location}</span>
            <span>💰 From ${tourData?.costFrom}</span>
            <span>👥 Max {tourData?.maxGuest} guests</span>
          </div>
        </div>
        <div>
          <Button asChild>
            <Link to={`/booking/${tourData?._id}`}>Book Now</Link>
          </Button>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tourData?.images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${tourData?.title} ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Tour Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Dates:</strong>{" "}
              {format(
                new Date(
                  tourData?.startDate ? tourData?.startDate : new Date()
                ),
                "PP"
              )}{" "}
              -{" "}
              {format(
                new Date(tourData?.endDate ? tourData?.endDate : new Date()),
                "PP"
              )}
            </p>
            <p>
              <strong>Departure:</strong> {tourData?.departureLocation}
            </p>
            <p>
              <strong>Arrival:</strong> {tourData?.arrivalLocation}
            </p>
            <p>
              <strong>Division:</strong> {divisionData?.[0]?.name}
            </p>
            <p>
              <strong>Tour Type:</strong> {tourData?.tourType}
            </p>
            <p>
              <strong>Min Age:</strong> {tourData?.minAge} years
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground">{tourData?.description}</p>
        </div>
      </div>

      {/* Amenities & Inclusions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
          <ul className="space-y-1">
            {tourData?.amenities?.map((amenity, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Included</h3>
          <ul className="space-y-1">
            {tourData?.included?.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Excluded</h3>
          <ul className="space-y-1">
            {tourData?.excluded?.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tour Plan */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Tour Plan</h3>
        <ol className="space-y-2">
          {tourData?.tourPlan?.map((plan, index) => (
            <li key={index} className="flex">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                {index + 1}
              </span>
              {plan}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}


```

## 40-11 High-Level Overview of JavaScript Promises

- we can keep in variable and the in some other time we will resolve or reject 

```ts 
// const myPromise = new Promise((resolve, reject) => resolve())
// .then(() => console.log("Resolved"))
// .catch(() => console.log("Rejected"))

let savedResolve, saveReject;

const myPromise = new Promise((resolve, reject) => {
    savedResolve = resolve;
    saveReject = reject;
})

savedResolve("Ami Resolve Hoye gesi!") // can be called from anywhere

myPromise
    .then((value) => console.log("Promise Resolved :", value))
    .catch((err) => console.log("Promise Rejected :", err))

savedResolve("Ami Resolve Hoye gesi!") // can be called from anywhere
saveReject("Kuno Akta Error Hoye gese!")

setTimeout(()=>{
    savedResolve("Hehe etai Bastob");
}, 3000)
```

## 40-12 Managing Token Expiration with Axios Interceptors
- we will use axios interceptor for generating new access token on the go
- axios.tsx 
```tsx 
// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Res Success!")
    return response
  },

  async (error) => {


    console.log("Request Failed", error.response)

    if (error.response.status === 500 && error.response.data.message === "jwt expired") {
      console.log("Your Token Is Expired")
      try {
        const res = await axiosInstance.post("/auth/refresh-token")
        console.log("New Token Arrived",res)
      } catch (error) {
        console.log(error)
      }
    }

    // for everything
    return Promise.reject(error)
  }
);
```

## 40-13 Queuing Parallel Requests and Processing Them After Token Refresh

- When New Access token in Regenerated we will do the request again by grabbing the request from the Axios Config 
- The Problem is when a lot of request are coming in the mean time the token regenerated. which request is to resolve or how to deal with this situation? we need to resolve all. we need a mechanism to store the request then solve all after generating new access token. We need to handle request que here. 


- axios 

```ts
// Add a response interceptor

let isRefreshing = false

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = []


const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(null)
    }
  })

  pendingQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Res Success!")
    return response
  },

  async (error) => {

    const originalRequest = error.config as AxiosRequestConfig & {_retry: boolean};
    console.log(originalRequest)

    console.log("Request Failed", error.response)

    if (error.response.status === 500 && error.response.data.message === "jwt expired" && !originalRequest._retry) {
      console.log("Your Token Is Expired")

      originalRequest._retry = true // for avoiding infinity loop 

      if (isRefreshing) {
        // before refreshing start store the requests
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject })
        }).then(() => axiosInstance(originalRequest)).catch(error => Promise.reject(error))
      }

      isRefreshing = true

      try {
        const res = await axiosInstance.post("/auth/refresh-token")
        console.log("New Token Arrived", res)

        processQueue(null)

        return axiosInstance(originalRequest)
      } catch (error) {
        console.log(error)


        processQueue(error)

        return Promise.reject(error)
      } finally{
        isRefreshing = false
      }
    }

    // for everything
    return Promise.reject(error)
  }
);
```

## 40-14 Project Wrap-Up and Final Remarks