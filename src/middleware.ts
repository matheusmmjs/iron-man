// import { jwtVerify } from "jose";
import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";

const publicRoutes = [
    {
        path: "/sign-in",
        whenAuthenticated: "redirect"
    },
    // {
    //     path: "/clients",
    //     whenAuthenticated: "redirect"
    // },
    // {
    //     path: "/schedule",
    //     whenAuthenticated: "redirect"
    // },
    // {
    //     path: "/payments",
    //     whenAuthenticated: "redirect"
    // },
    // {
    //     path: "/settings",
    //     whenAuthenticated: "redirect"
    // },
    {
        path: "/pricing",
        whenAuthenticated: "next"
    },
] as const
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in"
// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET) ?? "secret"

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get("auth_token")

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
        return NextResponse.next();
        // try {
        //     // Verificar se o JWT é válido
        //     const { payload } = await jwtVerify(authToken.value, JWT_SECRET);

        //     // Verificar se o token está expirado
        //     const expirationTime = payload.exp ? payload.exp * 1000 : null; // `exp` está em segundos
        //     const currentTime = Date.now();

        //     if (expirationTime && expirationTime < currentTime) {
        //         console.log("JWT expirado.");
        //         // Remover o cookie e redirecionar para o login
        //         const redirectUrl = request.nextUrl.clone()
        //         redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
        //         const response = NextResponse.redirect(redirectUrl);
                
        //         response.cookies.delete("auth_token");
                
        //         return response;
        //     }

        //     return NextResponse.next();
        // } catch (error) {
        //     console.error("Erro ao verificar o JWT:", error);
        //     // Remover o cookie e redirecionar para o login
        //     const redirectUrl = request.nextUrl.clone()
        //     redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
        //     const response = NextResponse.redirect(redirectUrl);
            
        //     response.cookies.delete("auth_token");
            
        //     return response;
        // }
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    
    ],
};