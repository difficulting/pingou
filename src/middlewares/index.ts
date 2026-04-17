import { AuthMiddleware } from "./allowedRoles";
import { CooldownMiddleware } from "./cooldown";

export const middlewares = {
	auth: AuthMiddleware,
	cooldown: CooldownMiddleware,
};
