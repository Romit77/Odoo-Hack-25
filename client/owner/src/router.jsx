import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/Home.jsx";
import Login from "@pages/Login";
import SignUp from "@pages/SignUp";
import { AdminLayout, OwnerLayout, GuestLayout } from "@layouts";
import {
  AddTurf,
  OwnerDashboard,
  TurfManagement,
  OwnerReviews,
  OwnerBookings,
} from "@components/owner";

import {
  UserManagement,
  NewOwnerRequests,
  RejectedOwnerRequests,
  AdminDashboard,
  OwnerViewer,
  TurfList,
  AllTurf,
  TransactionSection,
} from "@components/admin";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";
import RoleBasedRedirect from "@components/common/RoleBasedRedirect";

import { NotFound } from "@components/common";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <RoleBasedRedirect />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      {
        path: "owner-requests",
        children: [
          { path: "new", element: <NewOwnerRequests /> },
          { path: "rejected", element: <RejectedOwnerRequests /> },
        ],
      },
      { path: "users", element: <UserManagement /> },
      {
        path: "owners",
        children: [
          { path: "", element: <OwnerViewer /> },
          { path: ":ownerId/turf", element: <TurfList /> },
        ],
      },

      { path: "turfs", element: <AllTurf /> },
      { path: "transactions", element: <TransactionSection /> },
    ],
  },
  {
    path: "/owner",
    element: (
      <ProtectedRoute requiredRole="owner">
        <OwnerLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <OwnerDashboard /> },
      { path: "dashboard", element: <OwnerDashboard /> },
      { path: "bookings", element: <OwnerBookings /> },
      { path: "turf-management", element: <TurfManagement /> },
      { path: "review", element: <OwnerReviews /> },
      { path: "add-turf", element: <AddTurf /> },
    ],
  },
]);

export default router;
