import { Link } from "react-router-dom";
import useSignUpForm from "@hooks/useSignUpForm";
import { Button, FormField } from "@components/common";

const SignUp = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useSignUpForm();
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Name"
              name="name"
              type="text"
              register={register}
              error={errors.name}
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="text"
              register={register}
              error={errors.phone}
            />
          </div>
          <FormField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password}
            />
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword}
            />
          </div>
          <div className="form-control mt-12 pt-6 ">
            <Button
              type="submit"
              className="btn-primary w-full"
              loading={loading}
            >
              Sign Up
            </Button>
          </div>
        </form>
        <div className="text-center mt-6">
          <Link to="/login" className="link link-hover">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
