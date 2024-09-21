//export { default } from "next-auth/middleware";
export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/session"],
  pages: {
    signIn: "/api/auth/signin",
  },
};
