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
export type { ISendOtp, IVerifyOtp, ILogin, ISidebarItems, TRole } from "./auth.type";
export type { ITourPackage} from "./tour.type";

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

- Pages  -> TourDetails.tsx 

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
    console.log(bookingData)
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