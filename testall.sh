
#
# this test executing in order:
#   * unit tests
# 
# If any of above actions will faile this script will exit with non zero exit code
#
# General purpose of this script is to have single script that once executed locally will
# prepare prod server and run all tests against it.
#   For example to make sure that git commit that you are about to push have not introduced regression
#

_SHELL="$(ps "${$}" | grep "${$} " | grep -v grep | sed -rn "s/.*[-\/]+(bash|z?sh) .*/\1/p")"; # bash || sh || zsh
case ${_SHELL} in
  zsh)
    _DIR="$( cd "$( dirname "${(%):-%N}" )" && pwd -P )"
    _0="$( basename "${(%):-%N}" )"
    _SCRIPT="${(%):-%N}"
    _BINARY="/bin/zsh"
    _PWD="$(pwd)"
    ;;
  sh)
    _DIR="$( cd "$( dirname "${0}" )" && pwd -P )"
    _0="$( basename "${0}" )"
    _SCRIPT="${0}"
    _BINARY="/bin/sh"
    _PWD="$(pwd)"
    ;;
  *)
    _DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
    _0="$( basename "${BASH_SOURCE[0]}" )"
    _SCRIPT="${BASH_SOURCE[0]}"
    _BINARY="/bin/bash"
    _PWD="$(pwd)"
    ;;
esac

cd "${_DIR}"

ROOT="${_DIR}"

export NODE_OPTIONS="" 

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

set -e
set -x

/bin/bash build.sh

cat <<EE

    INTEGRATION TESTS:

EE

/bin/bash test.sh



