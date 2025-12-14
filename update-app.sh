#!/bin/bash

# ==========================================
# UPDATE SCRIPT FOR SPORTIF 18
# ==========================================

APP_DIR="sportif18"  # Nama folder yang dibuat oleh deploy-vps.sh
APP_NAME="sportif18" # Nama service PM2

# Colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Update Process...${NC}"

# 1. Navigate to Project Directory
cd ~/$APP_DIR || { echo "Directory $APP_DIR not found! Exiting."; exit 1; }

# 2. Pull Latest Changes
echo -e "${GREEN}Pulling changes from GitHub...${NC}"
git pull

# 3. Re-install Dependencies (in case package.json changed)
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# 4. Prisma Sync (Schema changes)
echo -e "${GREEN}Updating Database Schema...${NC}"
npx prisma generate
npx prisma db push
npx prisma db seed

# 5. Rebuild Next.js
echo -e "${GREEN}Building Application (this may take a while)...${NC}"
npm run build

# 6. Restart PM2
echo -e "${GREEN}Restarting Server...${NC}"
pm2 restart $APP_NAME

echo -e "${GREEN}=======================================${NC}"
echo -e "${GREEN}UPDATE COMPLETE!${NC}"
echo -e "${GREEN}=======================================${NC}"
