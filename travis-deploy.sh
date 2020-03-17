#!/bin/bash

eval "$(ssh-agent -s)"
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo '-----BEGIN OPENSSH PRIVATE KEY-----' > ~/.ssh/deploy_pkey
echo $DEPLOY_PKEY >> ~/.ssh/deploy_pkey
echo '-----END OPENSSH PRIVATE KEY-----' >> ~/.ssh/deploy_pkey
chmod 400 ~/.ssh/deploy_pkey
echo 'host ekosystem.staging.slovensko.digital' > ~/.ssh/config
echo '  HostName ekosystem.staging.slovensko.digital' >> ~/.ssh/config
echo '  IdentityFile ~/.ssh/deploy_pkey' >> ~/.ssh/config
echo "ekosystem.staging.slovensko.digital $DEPLOY_HOST_KEY" > ~/.ssh/known_hosts

git remote add staging dokku@ekosystem.staging.slovensko.digital:priznanie

git push staging master --force
