FROM node:14-alpine
WORKDIR /opt/app
#копируем его внутрь контейнера
ADD package.json package.json
RUN npm install
ADD . .
# указываем, что это продакшен
ENV NODE_ENV production
RUN npm run build
# dev-зависимости нам не нужны в проде
RUN npm prune --production
# запускаем программу
CMD ["npm", "start"]
# открыли порт
EXPOSE 3000
