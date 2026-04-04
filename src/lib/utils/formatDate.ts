export default function formatDate(date: Date) {
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	} as Intl.DateTimeFormatOptions;

	const formatter = new Intl.DateTimeFormat("id-ID", options);

	return formatter.format(date);
}
