FROM issogr/airplay-audio

# Metadata Socket

COPY scripts /scripts
COPY shairport-sync.conf /etc/shairport-sync.conf

COPY custom_entrypoint.sh /custom_entrypoint.sh
RUN chmod +x /custom_entrypoint.sh

ENTRYPOINT ["/custom_entrypoint.sh"]