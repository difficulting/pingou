import { createEvent } from "seyfert";
import { CONFIG } from "../config/config";
import { Embeds } from "../utils/embeds";
import { voiceRestrictService } from "../services/voiceRestrictService";

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

export default createEvent({
	data: { once: false, name: "guildMemberAdd" },
	async run(member, client) {
		const roleId = CONFIG.RESTRICTIONS.VOZ;
		if (!roleId) return;

		await client.members
			.addRole(member.guildId, member.id, roleId)
			.catch(() => {});

		const expiresAt = new Date(Date.now() + SIX_HOURS_MS);
		await voiceRestrictService.saveRestriction(
			member.id,
			member.guildId,
			expiresAt,
		);

		const guild = await client.guilds.fetch(member.guildId).catch(() => null);
		const guildName = guild?.name ?? "el servidor";

		await client.users
			.createDM(member.id)
			.then((dm) =>
				dm.messages.write({ embeds: [Embeds.voiceRestrictDMEmbed(guildName)] }),
			)
			.catch(() => {});

		await voiceRestrictService.scheduleRemoval(
			client,
			member.id,
			member.guildId,
			expiresAt,
		);
	},
});
