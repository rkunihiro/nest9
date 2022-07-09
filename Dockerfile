FROM node:16-bullseye-slim as builder
ENV NODE_ENV=development
COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build

FROM gcr.io/distroless/nodejs-debian11:16
ENV NODE_ENV=production
COPY --from=builder /app/out/main.js /app/main.js
CMD ["/app/main.js"]
