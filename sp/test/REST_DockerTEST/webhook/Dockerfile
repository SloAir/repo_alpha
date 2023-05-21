FROM almir/webhook

USER root

COPY --from=library/docker:latest /usr/local/bin/docker /usr/bin/docker
COPY --from=docker/compose:latest /usr/local/bin/docker-compose /usr/bin/docker-compose

COPY hooks.json /etc/webhook/hooks.json

CMD [ "-verbose","-hooks=/etc/webhook/hooks.json", "-hotreload" ]