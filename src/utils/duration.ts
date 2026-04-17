export function parseDurationToSeconds(duration: string): number | null {
	const regex = /^(\d+)(s|m|h|d|w|mo|y|month|year)$/i;
	const match = regex.exec(duration);

	if (!match?.[1] || !match[2]) return null;

	const value = Number.parseInt(match[1], 10);
	const unit = match[2].toLowerCase();
	const unitMultipliers: Record<string, number> = {
		s: 1,
		m: 60,
		h: 3600,
		d: 86400,
		w: 604800,
		mo: 2592000,
		month: 2592000,
		y: 31536000,
		year: 31536000,
	};

	const multiplier = unitMultipliers[unit];
	return multiplier ? value * multiplier : null;
}

export function formatDuration(seconds: number): string {
	if (seconds < 60) return `${seconds}s`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
	if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;
	return `${Math.floor(seconds / 2592000)}mo`;
}

export function formatDurationForModEmbed(seconds: number): string {
	const mins = Math.floor(seconds / 60);
	const hrs = Math.floor(mins / 60);
	const remainMins = mins % 60;
	return hrs > 0 ? `${hrs}h ${remainMins}m` : `${remainMins}m`;
}
