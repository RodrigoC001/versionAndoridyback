#!/bin/bash

enviroment=${1:-'none'}
action=$2
api=${3:-'none'}
testName=${4:-'none'}
rm .env
touch .env
cat ./config/env/.env > .env
if [ $enviroment = 'dev' ]
  then
    if [ $api = 'api' ]
      then 
        echo 'starting DEVELOPMENT API only:'
        cat ./config/env/.envDev >> ./.env
        docker-compose -f docker-compose-api.yaml $action
    elif [ $api = 'test' ]
      then
        echo 'starting TESTING enviroment:'
        cat ./config/env/.envTest >> ./.env
        if [ $testName != 'none' ]
          then
            echo $testName
            echo CMD=npm run test ./tests/**/$testName.spec.js >>  ./.env
          else
            echo 'CMD=npm run test ./tests/**/*.spec.js' >>  ./.env
        fi
        docker-compose -f docker-compose-api.yaml $action pg redis api
    elif [ $api = 'cosmos' ]
      then
        echo 'starting COSMOS enviroment:'
        cat ./config/env/.envCosmos >> ./.env
        docker-compose -f docker-compose-cosmos.yaml $action app
    else
      echo 'starting DEVELOPMENT:'
      cat ./config/env/.envDev >> ./.env
      docker-compose -f docker-compose.yaml $action
    fi
elif [ $enviroment = 'production' ]
  then
    echo 'starting PRODUCTION:'
    cat ./config/env/.envProd >> ./.env
    docker-compose -f docker-compose-prod.yaml $action
else
    echo 'incorrect enviroment. Choose "production" or "dev"'
fi
