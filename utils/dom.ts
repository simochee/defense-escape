/** セレクタの要素が出現するまで待機 */
export const waitForElement = async (selector: string) => {
	if (document.readyState === "loading") {
		await new Promise((resolve) =>
			document.addEventListener("DOMContentLoaded", resolve),
		);
	}

	return new Promise<HTMLElement>((resolve, reject) => {
		const observer = new MutationObserver(() => {
			const element = document.querySelector(selector);

			if (element instanceof HTMLElement) {
				observer.disconnect();
				resolve(element);
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
};
