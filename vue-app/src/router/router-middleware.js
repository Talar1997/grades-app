import {userValidator} from "@/utils/user-validation";
import {userService} from "@/utils/user-service";

export function routerMiddleware(to, from, next) {
    const authRequired = to.meta.requireAuth
    const isLoggedIn = userValidator.isUserLoggedIn()

    const isTokenValid = userValidator.validateTokenTimestamp()

    if (isLoggedIn && !isTokenValid) {
        userService.logout();
        return next('/login')
    }

    if (authRequired && !isLoggedIn) {
        return next('/login');
    }

    document.title = to.meta.title;
    next();
}