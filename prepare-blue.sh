#!/bin/bash

rfkill unblock bluetooth
hciconfig hci0 reset
hciconfig hci0 up
hciconfig hci0 leadv
service bluetooth stop