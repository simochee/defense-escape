import { confirmClose } from "~/utils/confirm";

export default defineContentScript({
	matches: [
		"https://docs.google.com/spreadsheets/d/*",
		"https://app.box.com/integrations/googledss/openGoogleEditor",
	],
	runAt: "document_end",
	async main() {
		const cellInput = await waitForElement("#waffle-rich-text-editor");

		let isEditing = false;
		let initialValue = "";

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "aria-label"
				) {
					const newValue = cellInput.getAttribute("aria-label");

					isEditing = newValue !== null;
					initialValue = isEditing ? (cellInput.textContent ?? "") : "";
				}
			}
		});

		observer.observe(cellInput, {
			attributes: true,
			attributeFilter: ["aria-label"],
		});

		confirmClose(
			() =>
				isEditing &&
				document.activeElement === cellInput &&
				initialValue !== cellInput.textContent,
			() => requestAnimationFrame(() => cellInput.focus()),
		);
	},
});
