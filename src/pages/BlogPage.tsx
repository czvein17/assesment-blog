import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const BlogPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col space-y-2">
      <Header />

      <section className="flex-1 flex flex-col h-full place-items-center  p-5 w-full">
        <Outlet />
      </section>
    </div>
  );
};
