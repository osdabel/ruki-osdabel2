#!/bin/bash

# ==========================================
# AUTOMATED DEPLOYMENT SCRIPT FOR SPORTIF 18
# ==========================================

# Configuration
APP_NAME="sportif18"
NODE_VERSION="20"
DB_NAME="sportif_db"
DB_USER="sportif_user"

# Colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Deployment Setup for $APP_NAME...${NC}"

# 1. Ask for Domain and Git Repo
read -p "Enter your Domain Name (e.g., sportif18.com or ip address): " DOMAIN_NAME
read -p "Enter your Git Repository URL (HTTPS recommended): " REPO_URL
read -sp "Enter a specific password for the Database User: " DB_PASSWORD
echo ""

# 2. Update System
echo -e "${GREEN}Updating System...${NC}"
sudo apt update && sudo apt upgrade -y

# 3. Install Dependencies (Node, Nginx, Git, Postgres, Certbot)
echo -e "${GREEN}Installing Dependencies...${NC}"
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt install -y nodejs nginx git postgresql postgresql-contrib certbot python3-certbot-nginx

# 4. Configure PostgreSQL
echo -e "${GREEN}Configuring Database...${NC}"
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" || true
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" || true
sudo -u postgres psql -c "ALTER USER $DB_USER CREATEDB;" || true

# 5. Clone/Pull Project
echo -e "${GREEN}Setting up Project...${NC}"
cd ~
if [ -d "$APP_NAME" ]; then
    echo "Directory exists. Pulling latest changes..."
    cd $APP_NAME
    git pull
else
    git clone $REPO_URL $APP_NAME
    cd $APP_NAME
fi

# 6. Setup Environment Variables
echo -e "${GREEN}Creating .env file...${NC}"
cat > .env << EOL
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME?schema=public"
NODE_ENV="production"
EOL

# 7. Install & Build
echo -e "${GREEN}Building Application...${NC}"
npm install
npx prisma generate
npx prisma db push
npm run build

# 8. Setup PM2 (Process Manager)
echo -e "${GREEN}Setting up PM2...${NC}"
sudo npm install -g pm2
pm2 stop $APP_NAME || true
pm2 delete $APP_NAME || true
pm2 start npm --name "$APP_NAME" -- start
pm2 save
pm2 startup | tail -n 1 | bash || true

# 9. Configure Nginx
echo -e "${GREEN}Configuring Nginx...${NC}"
sudo cat > /etc/nginx/sites-available/$APP_NAME << EOL
server {
    server_name $DOMAIN_NAME;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

sudo ln -s /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/ 2>/dev/null || true
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null || true
sudo nginx -t
sudo systemctl restart nginx

# 10. SSL Setup (if domain is provided and not just IP)
if [[ "$DOMAIN_NAME" =~ .*\..* && ! "$DOMAIN_NAME" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo -e "${GREEN}Setting up SSL with Let's Encrypt...${NC}"
    sudo certbot --nginx -d $DOMAIN_NAME --non-interactive --agree-tos -m admin@$DOMAIN_NAME
else
    echo "Skipping SSL setup (Domain looks like an IP or invalid)."
fi

echo -e "${GREEN}=======================================${NC}"
echo -e "${GREEN}DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}Your app should be live at http://$DOMAIN_NAME${NC}"
echo -e "${GREEN}=======================================${NC}"
