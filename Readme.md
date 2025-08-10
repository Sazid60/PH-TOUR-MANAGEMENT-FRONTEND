# PH-TOUR-MANAGEMENT-FRONTEND-3

GitHub Link: https://github.com/Apollo-Level2-Web-Dev/ph-tour-management-system-frontend/tree/part-3

## 37-1 Creating the OTP Input Card Interface

- Install otp component form shadcn

```
bunx --bun shadcn@latest add input-otp
```

- Making the submit button out of the form
  ![alt text](image.png)
  ![alt text](image-1.png)

- pages -> verify.tsx

```tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  //! Needed but for now its commented
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  return (
    <div className="grid place-content-center h-screen">
      <Card className="max-w-fit">
        <CardHeader>
          <CardTitle className="text-xl">Verify Your Email Address !</CardTitle>
          <CardDescription>
            Please Enter Your 6-digit code we sent to <br /> {email}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="otp-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button form="otp-form" type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

## 37-2 Sending OTP Code with Type-Safe RTK Query Mutation

- auth.api.ts

```ts
import { baseApi } from "@/redux/baseApi";
interface ISendOTP {
  email: string;
}
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo, // regular method is body : userInfo. If we use axios we have to use data otherwise we will not get payload
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo, // regular method is body : userInfo. If we use axios we have to use data otherwise we will not get payload
      }),
    }),
    sendOtp: builder.mutation<null, ISendOTP>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation } =
  authApi;
```

- verify.tsx

```tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleConfirm = () => {
    setConfirmed(true);
    sendOtp({ email: email });
  };
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  //! Needed but for now its commented
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card className="max-w-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify Your Email Address !
            </CardTitle>
            <CardDescription>
              Please Enter Your 6-digit code we sent to <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="sr-only">
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify Your Email Address !
            </CardTitle>
            <CardDescription>
              We will send You an Otp at <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button onClick={handleConfirm} className="w-[350px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
```

- lets separate the types

- auth.type.ts

```ts
export interface ISendOTP {
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}
```

- lets grab the type in index file types -> index.ts

```ts
export type { ISendOTP, ILogin, IRegister } from "./auth.type";
```

- The facility of this is the type file will give the type and it will not be coming from the auth.type.ts. index.ts will grab and send the type. Kind of centralizing the type

- redux - > features -> auth -> auth.api.ts

```ts
import { baseApi } from "@/redux/baseApi";
import type { ILogin, ISendOTP } from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<null, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<null, ISendOTP>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation } =
  authApi;
```

- so far we have gave response type null. now lets make a strict response type
- we will generate this type using our response

[Response Type Generation](https://transform.tools/json-to-typescript)

- as the response is same for all the types we will create in common types -> index.ts file
- The data type will be dynamic each endpoints will generate data accordingly the type we have defined for this we will create a generic data type

- index.ts

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export type { ISendOTP, ILogin, IRegister } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
```

- redux -> features -> auth -> auth.api.ts

```ts
import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOTP } from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<null, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOTP>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation } =
  authApi;
```

- Now we can get auto suggestions

```ts
const handleConfirm = async () => {
  try {
    const res = await sendOtp({ email: email }).unwrap();

    if (res.success) {
      toast.success(res.message);
    }

    setConfirmed(true);
  } catch (err) {
    console.log(err);
  }
};
```

- verify.tsx

```tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleConfirm = async () => {
    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success(res.message);
      }

      setConfirmed(true);
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  //! Needed but for now its commented
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card className="max-w-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify Your Email Address !
            </CardTitle>
            <CardDescription>
              Please Enter Your 6-digit code we sent to <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="sr-only">
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify Your Email Address !
            </CardTitle>
            <CardDescription>
              We will send You an Otp at <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button onClick={handleConfirm} className="w-[350px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
```

## 37-3 Verifying OTP and Handling User Login

- Handling the toast in verify.tsx

```tsx
const handleConfirm = async () => {
  const toastId = toast.loading("sending OTP");
  try {
    const res = await sendOtp({ email: email }).unwrap();

    if (res.success) {
      toast.success(res.message, { id: toastId });
      // Tells the toast library (probably react-hot-toast) to replace the existing toast with ID toastId
      setConfirmed(true);
    }
  } catch (err) {
    console.log(err);
  }
};
```

- lets fix some bug

- redux -> axiosBaseQuery.tsx

```tsx
import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
```

- types -> auth.typ.ts

```ts
export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}
```

- types -> index.ts

```ts
export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
```

- Now Lets Verify The OTP
- redux -> features -> auth -> auth.api.ts

```ts
import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
```

- pages -> verify.tsx

```tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleConfirm = async () => {
    const toastId = toast.loading("sending OTP");
    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        // Tells the toast library (probably react-hot-toast) to replace the existing toast with ID toastId
        setConfirmed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      //
      const res = await verifyOtp(userInfo).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setConfirmed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //! Needed but for now its commented
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card className="max-w-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify Your Email Address !
            </CardTitle>
            <CardDescription>
              Please Enter Your 6-digit code we sent to <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="sr-only">
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify Your Email Address !
            </CardTitle>
            <CardDescription>
              We will send You an Otp at <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button onClick={handleConfirm} className="w-[350px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
```

## 37-4 Managing Status Codes and Fixing Credential Mismatch Issues

- There are some bugs like If password do not match it should not take me to verify page and if otp invalid we should handle this too.
- Done it in LoginForm.tsx
- Though Its Not a Perfect way but for now its done like this in fokira way.

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm();
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);
    } catch (err: any) {
      console.error(err);

      if (err.data.message === "Password Does Not Match") {
        toast.error("Invalid Credentials!");
      }

      if (err.data.message === "User Is Not Verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.email });
      }

      // if (err.status === 401) {
      // toast.error("Your account is not verified");
      // navigate("/verify", { state: data.email });
      // }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
```

## 37-5 Handling useEffect Cleanup, Reset Button Functionality, and Overview of the cn Utility

- Now Handle The Resend OTP Mechanism

```tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  // const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(5);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("sending OTP");
    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        // Tells the toast library (probably react-hot-toast) to replace the existing toast with ID toastId
        setConfirmed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      //
      const res = await verifyOtp(userInfo).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setConfirmed(true);
        setTimer(5);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //! Needed but for now its commented
  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      console.log("Tick");
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card className="max-w-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify Your Email Address !
            </CardTitle>
            <CardDescription>
              Please Enter Your 6-digit code we sent to <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0}
                          className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                        >
                          Resent OPT:{" "}
                        </Button>{" "}
                        {timer}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Verify Your Email Address !
            </CardTitle>
            <CardDescription>
              We will send You an Otp at <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button onClick={handleSendOtp} className="w-[350px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
```

- what is the works?

```tsx
 useEffect(() => {
    if (!email || !confirmed) {
      return;
    }
    // If email is missing or confirmed is false, don’t start the timer.

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      // setTimer reduces the timer value by 1 each second, but stops at 0 (no negative countdown).
      console.log("Tick");
    }, 1000);

// initially if there is email and is confirmed the timer id is reset each time so that two time re render do not show imbalance
    return () => clearInterval(timerId);
// When the effect re-runs or the component unmounts, clearInterval stops the old timer.
// This prevents multiple timers from running at once — which would cause the “imbalance” you mentioned (e.g., double countdown speed).
  }, [email, confirmed]);
```
