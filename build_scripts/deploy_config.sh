# !/bin/bash
# deploy_config.sh
# This script updates Environment Variables at deployment
# Note that sed on OSX and sed in Linux operate different ways
# with OSX you have to pass a dummy blank file with -i like 'sed -i "" <s command> <file>'

cd src/environments
sed -i 's/\(OPEN_WEATHER_MAP_API_KEY\)/'$OPEN_WEATHER_MAP_API_KEY'/' environment.prod.ts
# console log the file to verify that the values were set
cat environment.prod.ts
sed -i 's/\(OPEN_WEATHER_MAP_API_KEY\)/'$OPEN_WEATHER_MAP_API_KEY'/' environment.ts
# console log the file to verify that the values were set
cat environment.prod.ts
