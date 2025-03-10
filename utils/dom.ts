/** セレクタの要素が出現するまで待機 */
export const waitForElement = (selector: string) => {
	return new Promise<HTMLElement>((resolve, reject) => {
		const observer = new MutationObserver(() => {
			const element = document.querySelector(selector);

			if (element instanceof HTMLElement) {
				resolve(element);
			} else {
				reject(new Error("Invalid element type"));
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
};
