
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

cd "${_DIR}"

export NODE_OPTIONS=""

set -e

if [ ! -d "${_DIR}/node_modules" ]; then

  yarn
fi

source "${_DIR}/bash/colours.sh";

ENV=".env"

if [ ! -f "${ENV}" ]; then

    { red "${0} error: file >${ENV}< doesn't exist"; } 2>&3

    exit 1
fi

source "${ENV}"

source ".env.sh"

function _kill {

  echo "final cleanup: kill"

  ps aux | grep "_${FLAG}" | grep -v grep | awk '{print $2}' | xargs kill

  kill "${PID1}" 1> /dev/null 2> /dev/null || :

  kill "${PID2}" 1> /dev/null 2> /dev/null || :
}

_kill;

trap _kill EXIT;

node libs/preprocessor.js

LOGFILE="${_DIR}/var/log.log"

rm -rf "${LOGFILE}"

# /bin/bash "${_DIR}/bash/proc/run-with-flag-and-kill.sh" "1_${FLAG}" \
# node node_modules/.bin/webpack --watch 2>&1 >> "${LOGFILE}" &
node node_modules/.bin/webpack --watch --name "webpack_${FLAG}" 1> >(/bin/bash bash/dlogger.sh " " webpack >> "${LOGFILE}") 2> >(/bin/bash bash/dlogger.sh e webpack >> "${LOGFILE}") &
PID1="${!}"  

# WAITINGMESSAGE="hidden modules" # this text shows at the end of webpack build
WAITINGMESSAGE="compiled successfully in" # this text shows at the end of webpack build

cat <<EEE


  Now let's wait for webpack to spit '${WAITINGMESSAGE}' message
  if it takes too long go and inspect 
    ${LOGFILE}


EEE

while [ "$(cat "${LOGFILE}" | grep "${WAITINGMESSAGE}")" = "" ]
do
  sleep 1;

  # echo "================================ waiting for webpack to finish build ================================" >> "${LOGFILE}"
  echo "================================ waiting for webpack to finish build ================================" 1> >(/bin/bash bash/dlogger.sh " " "server " >> "${LOGFILE}") 
done

# /bin/bash "${_DIR}/bash/proc/run-with-flag-and-kill.sh" "2_${FLAG}" \
# node server.js --flag "3_${FLAG}" 2>&1 >> "${LOGFILE}" &
node server.js --flag "3_${FLAG}" 1> >(/bin/bash bash/dlogger.sh " " "server " >> "${LOGFILE}") 2> >(/bin/bash bash/dlogger.sh e "server " >> "${LOGFILE}") &
PID2="${!}"  

set -e

/bin/bash bash/proc/pid-is-running.sh ${PID1} "webpack process" 

/bin/bash bash/proc/pid-is-running.sh ${PID2} "server process" 

tail -n 10000 -f "${LOGFILE}"
