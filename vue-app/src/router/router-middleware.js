import {userValidator} from "@/utils/user-validation";

export function routerMiddleware(to, from, next) {
    const authRequired = to.meta.requireAuth;
    const isLoggedIn = userValidator.isUserLoggedIn();

    if (authRequired && !isLoggedIn) {
        return next('/login');
    }

    document.title = to.meta.title;
    next();
}