// https://stopsopa.github.io/viewer.html?file=%2Fpages%2Fbash%2Fxx%2Fxx-template.cjs
// edit: https://github.com/stopsopa/stopsopa.github.io/blob/master/pages/bash/xx/xx-template.cjs

// https://stopsopa.github.io/viewer.html?file=xx.cjs
// edit: https://github.com/stopsopa/stopsopa.github.io/blob/master/xx.cjs
// 🚀 -
// ✅ -
// ⚙️  -
// 🗑️  -
// 🛑 -

module.exports = (setup) => {
  return {
    help: {
      command: `
set -e  
# git config core.excludesFile .git/.gitignore_local
# read -p "       Press enter to continue\\n\\n"
source .env
source .env.sh
        
cat <<EEE

  🐙 GitHub: $(git ls-remote --get-url origin | awk '{\$1=\$1};1' | tr -d '\\n' | sed -E 's/git@github\\.com:([^/]+)\\/(.+)\\.git/https:\\/\\/github.com\\/\\1\\/\\2/g')

  server:
    http://0.0.0.0:\${NODE_API_PORT}/src/game.html

EEE

      `,
      description: "Status of all things and help page",
      confirm: false,
    },
    [`build`]: {
      command: `
set -e        
export NODE_OPTIONS=""
/bin/bash build.sh        
`,
      description: `build is build`,
      confirm: false,
    },
    [`start`]: {
      command: `
set -e        
export NODE_OPTIONS=""        
/bin/bash dev.sh         
`,
      description: `launch webpack and esbuild - will NOT launch browser nor IDE`,
      confirm: false,
    },
    [`test`]: {
      command: `
set -e   
export NODE_OPTIONS=""  
cat <<EEE

/bin/bash test.sh --help

EEE
`,
      description: `helper script running all unit jest tests`,
      confirm: false,
    },
    [`testall`]: {
      command: `
set -e        
export NODE_OPTIONS=""
/bin/bash testall.sh	        
`,
      description: `it's doing few things: it tries to stop server (if it's running already), then builds, launches server, runs jest and the playwright`,
      confirm: false,
    },
    [`preprocessor`]: {
      command: `
set -e    
export NODE_OPTIONS=""     
node libs/preprocessor.js   
`,
      description: ``,
      confirm: false,
    },
    ...setup,
  };
};
