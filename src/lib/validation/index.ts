import { z } from "zod";

export const SignupValidation = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z
      .string()
      .min(1, {
        message: "This field has to be filled.",
      })
      .email("This is not a valid email."),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters long.",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const SigninValidation = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .email("This is not a valid email."),
  password: z.string().min(5, {
    message: "Invalid Password",
  }),
});


export const PostValidation = z
  .object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().max(100),
    tags: z.string(),
  })

  export const EditProfileValidation = z
    .object({
      name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
      }),
      username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      email: z
        .string()
        .min(1, {
          message: "This field has to be filled.",
        })
        .email("This is not a valid email."),
      file: z.custom<File[]>(),
    })
    
  