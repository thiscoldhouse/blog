#!/bin/bash
# Runs on new server
set -e

# ==============safety checks ==============
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi

# ============== needed variables ==============
hostname=thiscoldhouse
username=aleruiz
service_user_password=$1

# ==============begin installation ==============
hostnamectl set-hostname $hostname


# ============== update ubuntu ==============
apt install -y unattended-upgrades
apt update -y
apt upgrade -y
apt install -y nginx
apt install -y postgresql-client-common
apt install -y postgresql-client
apt install -y libpq-dev python3-dev
apt install -y gcc
apt install -y emacs

adduser $username --gecos "First Last,RoomNumber,WorkPhone,HomePhone" --disabled-password
echo "$username:$service_user_password" | chpasswd
usermod -aG sudo $username
mkdir -p /home/$username/.ssh


# ======= nginx ==========
rm /etc/nginx/sites-enabled/default
cat > /etc/nginx/sites-enabled/default << EOM
server {
	server_name thiscold.house;
	root /var/www/thiscold.house;
	index index.html;
	location / {
		try_files $uri $uri/ =404;
	}

    listen 80;
}
EOM

# ========== HTTPS via certbot =================
apt -y install software-properties-common
add-apt-repository universe
add-apt-repository ppa:certbot/certbot
apt -y update
apt install -y letsencrypt
apt -y install certbot python3-certbot-nginx

echo "Starting certbot ssl cert installation."
echo "You will be required to answer manual prompts."
certbot --nginx

# ======== disallow root user ssh ==============

echo "DenyUsers ubuntu" >> /etc/ssh/sshd_config
echo "DenyUsers root" >> /etc/ssh/sshd_config

echo "Install done, please do the first deploy"
# reboot
sudo shutdown -r now
