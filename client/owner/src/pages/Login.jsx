import useLoginForm from "@hooks/useLoginForm";
import { Link } from "react-router-dom";

import { Button, FormField } from "@components/common";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />
          <Button type="submit" loading={loading} className="w-full">
            Login
          </Button>
        </form>
        <div className="text-center mt-6">
          <Link to="/signup" className="text-blue-600 hover:underline">
            Don&apos;t have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
