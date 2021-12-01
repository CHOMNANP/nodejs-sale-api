FROM node:14.16.1

COPY . "/app/$PROJECT"

WORKDIR "/app/$PROJECT"
ADD package.json yarn.lock /app/

RUN yarn install
# ARG DIR="/app/database/migrations/"
# RUN if [ -d "$DIR" ]; then yarn migrate;fi

RUN apt-get update -y
RUN apt-get install -y tzdata

# timezone env with default
ENV TZ Asia/Phnom_Penh

EXPOSE $NODE_PORT
CMD [ "node", "index.js" ]