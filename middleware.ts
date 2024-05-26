import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/api/webhooks(.*)"])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth();
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};