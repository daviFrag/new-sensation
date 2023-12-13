FROM node:18-alpine as base
# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app


EXPOSE 3000

COPY package.json package-lock.json*  ./

RUN \
	if [ -f package-lock.json ]; then npm ci; \
	else echo "Lockfile not found." && exit 1; \
	fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM nginxinc/nginx-unprivileged as prod-stage

COPY frontend.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/

COPY --from=builder /app/out /app

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
