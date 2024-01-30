# install nfs service
sudo apt update
sudo apt install nfs-kernel-server

# start and enable service
sudo systemctl start nfs-kernel-server
sudo systemctl enable nfs-kernel-server

# /etc/exports
/srv/nfs *(rw,sync,no_subtree_check,insecure)
# /etc/fstab (optional)
192.168.178.140:/srv/nfs /nfs nfs defaults 0 0

# after editing /etc/fstab (permanent mount)
sudo mount -a # also can be added to bashrc
# or just a onetime mount (has to be repeated after every restart)
sudo mount -t nfs 192.168.178.140:/srv/nfs /nfs -o vers=3

# generate cert for https
openssl genrsa -out file-sharing-pwa.key 2048 # private key
openssl req -new -key file-sharing-pwa.key -out file-sharing-pwa.csr # Certificate signing request
openssl x509 -req -days 365 -in file-sharing-pwa.csr -signkey file-sharing-pwa.key -out file-sharing-pwa.crt

# set environemnt variables
export HTTPS=true 
export SSL_CRT_FILE=/home/toporek3112/lan_file_sharing/my-nfs-app/src/certs/file-sharing-pwa.crt
export SSL_KEY_FILE=/home/toporek3112/lan_file_sharing/my-nfs-app/src/certs/file-sharing-pwa.key
npm start
