import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { getCurrentSession, signOutAccount } from "@/lib/appwrite/api";


const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const {
    mutateAsync: createUserAccount,
    isPending: isCreatingAccount,
    
  } = useCreateUserAccountMutation();

  const {
    mutateAsync: signInAccount,
    isPending: isSigningIn,
    
  } = useSignInAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    try {
      const newUser = await createUserAccount(values);

      if (!newUser) {
        return toast({ title: "Signup Failed. Please try again" });
      }

      const currentSession = await getCurrentSession();

      if(currentSession){
        await signOutAccount();
        toast({ title: "You are logged out from previous account" });
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session)
        return toast({ title: "Sign in failed. Please try again." });

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        toast({ title: "Signup Successful" });
        navigate("/");
      }else toast({ title: "Login failed. Please try again." });

    } catch (error) {
      // console.log("error in onSubmit" + error);
    }
  }

  return (
    <div className="w-full flex flex-col items-center overflow-y-auto no-scrollbar mb-5">
      <Form {...form}>
        <div className="flex flex-col items-center justify-center mb-5">
          <div className="flex flex-row items-center justify-center gap-1">
            <h1 className="text-2xl font-semibold ">ConnectU</h1>
            <img
              src="/assets/images/ConnectU-icon.png"
              alt="logo"
              className="w-10 h-10 object-contain "
            />
          </div>
          <h3 className="font-bold text-xl mt-4 mb-1">Create a new account</h3>
          <p className="text-sm text-slate-400">
            To use ConnectU enter your details
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full md:w-2/3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="shad-input" />
                </FormControl>
                <FormDescription className="text-slate-400">
                  This is your public display name.
                </FormDescription>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            disabled={isCreatingAccount || isSigningIn || isUserLoading}
          >
            {isCreatingAccount || isSigningIn ? (
              <>
                <div className="flex items-center justify-center">
                  <Loader height={24} width={24}/>
                </div>
                <div>Creating account...</div>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <p className="text-sm mt-5">
          Already have an account?
          <Link to="/sign-in" className="text-blue-400">
            {" "}
            Log in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignupForm;
