import {userValidator} from "@/utils/user-validation";
import {userService} from "@/utils/user-service";

export function routerMiddleware(to, from, next) {
    const publicPages = ['/login'];
    const adminPages = ['/admin', '/categories', '/resources', '/departments'];

    // not logged in -> login page
    const authRequired = !publicPages.includes(to.path);
    const isLoggedIn = userValidator.isUserLoggedIn();
    if (authRequired && !isLoggedIn) {
        return next('/login');
    }

    // logged in -> check is user able to visit page
    if (isLoggedIn) {
        if (!userValidator.validateTokenTimestamp()) {
            userService.logout();
            return next('/login');
        }

        const adminRoleRequired = adminPages.includes(to.path);
        if (adminRoleRequired && !userValidator.isUserInRole('admin')) {
            return next('/dashboard');
        }
    }

    document.title = to.meta.title;
    next();
}