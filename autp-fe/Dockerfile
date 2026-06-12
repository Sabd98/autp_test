FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm i; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

EXPOSE 3000

CMD \
  if [ -f yarn.lock ]; then yarn dev -H 0.0.0.0; \
  elif [ -f package-lock.json ]; then npm run dev -- -H 0.0.0.0; \
  elif [ -f pnpm-lock.yaml ]; then pnpm dev -H 0.0.0.0; \
  else yarn dev -H 0.0.0.0; \
  fi
