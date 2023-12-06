FROM issogr/airplay-audio

COPY custom_entrypoint.sh /custom_entrypoint.sh
RUN chmod +x /custom_entrypoint.sh

ENTRYPOINT ["/custom_entrypoint.sh"]