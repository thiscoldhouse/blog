#!/bin/bash
# Run on local machine

set -e

sshuser=$1
reponame="https://github.com/thiscoldhouse/blog.git"

prodpath="/var/www/thiscold.house"

localdeploy=thiscoldhousedeploy
server="172.104.24.137"

cd /tmp
git clone $reponame $localdeploy

echo "Beaming code to the servers"

echo "First, removing old code"
ssh -t aleruiz@$server "sudo rm -rf /var/www/thiscold.house/* "
echo "Sending new code"
scp -r /tmp/$localdeploy/* aleruiz@$server:/var/www/thiscold.house
echo "Cleaning up"
rm -rf $localdeploy
cd -
echo "Done"
