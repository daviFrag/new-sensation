/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",

	env: {
		DEPLOY_URL: process.env.AUTH0_BASE_URL,
		AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
		AUTH0_SECRET: process.env.AUTH0_SECRET,
		AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
		AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
		AUTH0_SCOPE: process.env.AUTH0_SCOPE
	}

	// Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
	// trailingSlash: true,

	// Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
	// skipTrailingSlashRedirect: true,

	// Optional: Change the output directory `out` -> `dist`
	//distDir: 'dist',
};

module.exports = nextConfig



