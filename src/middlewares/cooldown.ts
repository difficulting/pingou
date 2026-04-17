import { createMiddleware } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import { CooldownService } from "../services/Cooldown";
import { Embeds } from "../utils/embeds";

export const CooldownMiddleware = createMiddleware<void>(async (middle) => {
	const { context, next, stop } = middle;
	const cooldownAmount = context.command.props.cooldown;

	if (!cooldownAmount) return next();

	const userId = context.author.id;
	const key =
		context.command.props.cooldownKey ||
		("name" in context.command ? context.command.name : "global") ||
		"global";

	const currentCooldown = await CooldownService.getCooldown(userId, key);

	if (currentCooldown) {
		const remaining = Math.ceil(
			(currentCooldown.expiresAt.getTime() - Date.now()) / 1000,
		);

		await context.write({
			embeds: [
				Embeds.errorEmbed(
					"Cooldown",
					`Debes esperar **${remaining} segundos** antes de volver a usar este comando.`,
				),
			],
			flags: MessageFlags.Ephemeral,
		});

		return stop(`Cooldown active: ${remaining}s`);
	}

	await CooldownService.setCooldown(userId, key, cooldownAmount);
	return next();
});
