const WXT_ZIP_CMD = String.raw`
  pnpm wxt zip
  pnpm wxt zip -b firefox
`;

const WXT_SUBMIT_CMD = String.raw`
  pnpm wxt submit \
    --chrome-zip ./.output/*-chrome.zip \
    --firefox-zip ./.output/*-firefox.zip \
    --firefox-sources-zip ./.output/*-sources.zip
`;

/** @type {import('semantic-release').GlobalConfig} */
export default {
	branches: ["main"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		"@semantic-release/changelog",
		["@semantic-release/npm", { npmPublish: false }],
		["@semantic-release/exec", { prepareCmd: WXT_ZIP_CMD }],
		["@semantic-release/exec", { prepareCmd: WXT_SUBMIT_CMD }],
		[
			"@semantic-release/github",
			{
				assets: [
					{ path: "./.output/*-chrome.zip" },
					{ path: "./.output/*-firefox.zip" },
				],
				labels: ["release"],
			},
		],
		"@semantic-release/git",
	],
};
