
if [ "${NODE_API_PORT}" = "" ]; then

  echo "${0} error: NODE_API_PORT is not defined"

  exit 1;
fi

if [ "${FLAG}" = "" ]; then

  echo "${0} error: FLAG is not defined"

  exit 1;
fi