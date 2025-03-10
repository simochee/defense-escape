/** 編集中のセルを閉じるか確認 */
export const confirmClose = (
	checkEditing: () => boolean,
	onCancel?: () => void,
) => {
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key !== "Escape") return;

		if (!checkEditing()) return;

		// 編集をキャンセルするか確認
		if (confirm(i18n.t("confirm.title"))) return;

		e.preventDefault();
		e.stopPropagation();

		onCancel?.();
	};

	document.addEventListener("keydown", handleKeyDown, true);

	return () => {
		document.removeEventListener("keydown", handleKeyDown, true);
	};
};
