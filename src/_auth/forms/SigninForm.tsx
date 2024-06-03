import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useSignInAccountMutation,
  useSignOutAccountMutation,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { getCurrentSession } from "@/lib/appwrite/api";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signOutAccount } = useSignOutAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const currentSession = await getCurrentSession();

    if (currentSession) {
      if (currentSession.email === values.email) {
        navigate("/");
        return toast({ title: "Oops!, You are already logged in" });
      } else {
        await signOutAccount();
        toast({ title: "You are logged out from previous account" });
      }
    }

    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session)
        return toast({
          variant: "destructive",
          title: "Oops!, Invalid email or password, or Account does'nt exist",
          className:
            "bg-danger-red font-semibold p-3 w-fit h-fit fixed right-10 bottom-10 ml-10",
        });

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        toast({
          title: "Signin Successful!",
          className:
            "bg-success-green text-xs sm:text-lg font-semibold w-fit h-fit p-3 fixed right-10 bottom-10",
          duration: 3000,
        });
        navigate("/");
      } else
        toast({
          title: "Oops!, Login failed. Please try again.",
          className:
            "bg-danger-red font-semibold p-3 w-fit h-fit fixed right-10 bottom-10 ml-10",
        });
    } catch (error) {
      // console.log("error in onSubmit" + error);
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="flex flex-row items-center justify-center gap-1">
          <h1 className="text-2xl font-semibold ">ConnectU</h1>
          <img
            src="/assets/images/ConnectU-icon.png"
            alt="logo"
            className="w-10 h-10 object-contain "
          />
        </div>
        <h3 className="font-bold text-xl mt-4 mb-1">Login to your account</h3>
        <p className="text-sm text-slate-400">
          Welcome back! Please enter your login details
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full md:w-2/3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="shad-input" />
              </FormControl>
              <FormMessage className="text-red" />
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
                <Input placeholder="" {...field} className="shad-input" />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-1/2 mx-auto bg-blue-700 flex gap-2"
          disabled={isUserLoading || isSigningIn}
        >
          {isSigningIn ? (
            <>
              <div className="h-6 w-6">
                <Loader height={24} width={24} />
              </div>
              <div>Logging In...</div>
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      <p className="text-sm mt-5">
        Don't have an account?
        <Link to="/sign-up" className="text-blue-400">
          {" "}
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SigninForm;
