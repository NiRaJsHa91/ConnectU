import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  
  const isAuthenticated = false
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        
          <div className="flex overflow-hidden w-full">
            
            <section className="flex flex-1 justify-center items-center flex-col max-h-screen md:px-20 px-10 py-20 ">
              <Outlet />
            </section>

            <img
              src="/assets/images/Form-Side-Image.png"
              alt="form side image"
              className="hidden rotate-[-5deg] xl:block h-screen object-contain w-1/2"
            />
          </div>
        
      )}
    </>
  );
}

export default AuthLayout
