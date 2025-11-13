#!/usr/bin/env bash
# run pjsua with local credentials (edit as needed)
PJSUA_BIN="$HOME/pjproject/bin/pjsua"
if [ ! -x "$PJSUA_BIN" ]; then
  echo "pjsua not found at $PJSUA_BIN"
  exit 1
fi
$PJSUA_BIN --id sip:looped1@$(hostname -s).local --username looped1 --password supersecretpw --registrar sip:$(hostname -s).local
