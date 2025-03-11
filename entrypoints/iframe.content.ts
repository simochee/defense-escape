export default defineContentScript({
	matches: [
		"https://app.box.com/integrations/officeonline/openOfficeOnline*",
		"https://www.dropbox.com/scl/fi/*/*.xlsx*",
		"https://www.dropbox.com/c/scl/fi/*/*.xlsx*",
	],
	runAt: "document_start",
	async main() {
		switch (location.hostname) {
			case "app.box.com": {
				const iframe = document.querySelector('iframe[name="office-editor"]');

				if (iframe instanceof HTMLIFrameElement) {
					iframe.sandbox.add("allow-modals");
				}

				break;
			}
			case "www.dropbox.com": {
				const iframe = await waitForElement("#cloud-doc-iframe");

				if (iframe instanceof HTMLIFrameElement) {
					iframe.sandbox.add("allow-modals");
				}

				break;
			}
		}
	},
});
