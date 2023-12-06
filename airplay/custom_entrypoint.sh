#!/bin/sh

rm -f /var/run/avahi-daemon/pid
set -e

dbus-uuidgen --ensure
dbus-daemon --system
avahi-daemon --daemonize --no-chroot

exec shairport-sync -c /etc/shairport-sync.conf -m avahi -a "$AIRPLAY_NAME"  "$@"