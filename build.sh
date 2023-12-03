
_SHELL="$(ps "${$}" | grep "${$} " | grep -v grep | sed -rn "s/.*[-\/]+(bash|z?sh) .*/\1/p")"; # bash || sh || zsh
case ${_SHELL} in
  zsh)
    _DIR="$( cd "$( dirname "${(%):-%N}" )" && pwd -P )"
    ;;
  sh)
    _DIR="$( cd "$( dirname "${0}" )" && pwd -P )"
    ;;
  *)
    _DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
    ;;
esac

ROOT="${_DIR}"

# let's not enable it here
# because some scripts here will use node some only in CI
# and by fixing this export here additional logs will appear in CI mode
#           Debugger listening on ws://127.0.0.1:35133/beec5c79-0b8f-43c1-b83a-f9ebc185d9a9
#           For help, see: https://nodejs.org/en/docs/inspector
# let's individual sh files called from here decide if they need this export or not
# export NODE_OPTIONS="" 

set -e

if [ ! -f ".env" ]; then
  
  echo "${0} error: file .env doesn't exist"

  exit 1
fi

source ".env"

if [ ! -f ".env.sh" ]; then
  
  echo "${0} error: file .env doesn't exist"

  exit 1
fi

source ".env.sh"

if [ "${PROJECT_NAME}" = "" ]; then

    echo "env var PROJECT_NAME is not defined";

    exit 1
fi

if [ "${EXPOSE_EXTRA_ENV_VARIABLES}" = "" ]; then

    echo "env var EXPOSE_EXTRA_ENV_VARIABLES is not defined";

    exit 1
fi

node libs/preprocessor.js

node node_modules/.bin/webpack
