#!/bin/bash

usage() {
  echo "Usage:"
  echo -e "\tbuild.sh [-t <target environment>]"
  echo -e "\nDescription:"
  echo -e "\tBuild current branch for target environment."
  echo -e "\t-t <target environment>\t\tSpecify which environment to build.\n"
  exit -1
}

CURRENT_BRANCH=`git symbolic-ref --short -q HEAD`

DATETIME=`date "+%Y-%m-%d %H:%M:%S"`

if [ "$CURRENT_BRANCH" == "$TARGET_BRANCH" ]; then
  echo -e "\n\033[33mOops, you are now on the branch '$CURRENT_BRANCH'.\033[0m"
  exit -1
fi

git checkout $SOURCE_BRANCH
git branch -D $TARGET_BRANCH
git checkout -b $TARGET_BRANCH

if [ $? -eq 0 ]; then
  npm run build:$PACKAGE_NAME-$TARGET_BRANCH

  if [ $? -eq 0 ]; then
    cd ./dist/build
    zip -r ../../$PACKAGE_NAME.zip $PACKAGE_NAME
    cd ../../

    if [ $? -eq 0 ]; then

      git add $PACKAGE_NAME.zip
      git commit -m "build: $DATETIME"
      git push --set-upstream origin $TARGET_BRANCH -f

      if [ $? -eq 0 ]; then
        git checkout $CURRENT_BRANCH
        echo -e "\n\033[32mBuild succeed.\033[0m"
      fi

    fi
  fi
fi
