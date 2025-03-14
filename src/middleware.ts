import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";
import { verifyAuth } from "@/lib/auth"

const publicRoutes = [
    {
        path: "/sign-in",
        whenAuthenticated: "redirect"
    },
] as const
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in"

export async function middleware(request: NextRequest) {    
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get("token")

    if(!authToken && publicRoute) {
        return NextResponse.next();
    }

    if(!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

        return NextResponse.redirect(redirectUrl)
    }

    if(authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = "/"

        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && !publicRoute) {
        try {
            await verifyAuth(authToken.value)

            return NextResponse.next();
        } catch {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

            return NextResponse.redirect(redirectUrl)
        }
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};