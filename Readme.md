# PH-TOUR-MANAGEMENT-FRONTEND-5

GitHub Link: https://github.com/Apollo-Level2-Web-Dev/ph-tour-management-system-frontend/tree/part-5

## 39-1 Implementing Delete Confirmation with Alert Dialog
- Install al;ert dialog

```
bunx --bun shadcn@latest add alert-dialog
```

- redux -> features -> tour -> tour.api.ts 


```ts
import { baseApi } from "@/redux/baseApi";



export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const {
    useAddTourTypeMutation,
    useGetTourTypesQuery,
    useRemoveTourTypeMutation
} = tourApi;
```

- components -> DeleteConfirmation.tsx 

```tsx
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "react"

interface IProp {
    children: ReactNode
    onConfirm: () => void
}
export function DeleteConfirmation({ children, onConfirm }: IProp) {
    const handleConfirm = () => {
        onConfirm()
        console.log("Confirm-Clicked")
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
```

- pages -> admin -> addTourTypes.tsx 

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
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";


import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation()

const handleRemoveTourType = async (tourId: string) => {
const toastId = toast.loading("Removing Type")
    try {
      const res = await removeTourType(tourId).unwrap()
      if(res.success){
        toast.success("Removed",  {id :toastId})
      }
    } catch (error) {
      console.log(error)
    }
  }

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
            {data?.map((item: { name: string, _id: string }) => (
              <TableRow>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell>

                  <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
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
    </div>
  );
}
```

## 39-2 Setting Up Modal and Image Uploader for Creating a Division
- Routes ->  adminSidebarItems.tsx 

```tsx
import AddDivision from "@/pages/Admin/AddDivision";
import AddTour from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";

import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// import Analytics from "@/pages/Admin/Analytics";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"))



export const adminSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics
            }
        ],
    },
    {
        title: "Tour Management",
        items: [
            {
                title: "Add Tour",
                url: "/admin/add-tour",
                component : AddTour
            },
            {
                title: "Add Tour Type",
                url: "/admin/add-tour-type",
                component : AddTourType
            },
            {
                title: "Add Division",
                url: "/admin/add-division",
                component : AddDivision
            },
        ],
    }
]
```
- Components ->  modules -> Admin -> Division -> AddDivisionModal.tsx 

```tsx 
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";


export function AddDivisionModal() {
  const form = useForm({
    defaultValues : {
        name : "",
        description : ""
    }
  });


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data)
  };

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Add Vision</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Division</DialogTitle>
          </DialogHeader>
          <Form {...form} >
            <form className="space-y-4" id="add-division" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Division Name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Division Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-division">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
```
- pages -> Admin -> AddDivision.tsx 

```tsx 
import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";


const AddDivision = () => {
  return (
    <div>
      <h1>This is AddDivision component</h1>
      <AddDivisionModal/>
    </div>
  );
};

export default AddDivision;
```

- Install File Uploader Component From Origin ui 

```
bunx --bun shadcn@latest add https://originui.com/r/comp-544.json
```