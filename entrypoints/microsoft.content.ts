export default defineContentScript({
	allFrames: true,
	matches: ["https://excel.officeapps.live.com/*"],
	runAt: "document_end",
	async main() {
		const textElement = await waitForElement(
			"#gridKeyboardContentEditable_textElement",
		);

		let isEditing = false;
		let initialValue = "";

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "aria-activedescendant"
				) {
					const newValue = textElement.getAttribute("aria-activedescendant");

					isEditing = newValue === null;
					initialValue = isEditing ? (textElement.textContent ?? "") : "";
				}
			}
		});

		observer.observe(textElement, {
			attributes: true,
			attributeFilter: ["aria-activedescendant"],
		});

		let escapeCanceled = false;

		textElement.addEventListener(
			"focusout",
			(e) => {
				if (escapeCanceled) {
					e.preventDefault();
					e.stopPropagation();

					escapeCanceled = false;
				}
			},
			true,
		);

		confirmClose(
			() =>
				isEditing &&
				document.activeElement === textElement &&
				initialValue !== textElement.textContent,
			() => {
				escapeCanceled = true;
			},
		);
	},
});
