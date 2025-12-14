#!/bin/bash

# ==========================================
# UPDATE SCRIPT FOR SPORTIF 18
# ==========================================

APP_NAME="sportif18" # Nama service PM2 (sesuaikan jika berbeda)

# Colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Update Process...${NC}"

# 1. Navigate to the directory where this script is located (Project Folder)
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
echo "Working directory: $DIR"

# 2. Pull Latest Changes
echo -e "${GREEN}Pulling changes from GitHub...${NC}"
git pull

# 3. Re-install Dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# 4. Prisma Sync
echo -e "${GREEN}Updating Database Schema...${NC}"
npx prisma generate
npx prisma db push

# 5. Rebuild Next.js
echo -e "${GREEN}Building Application...${NC}"
npm run build

# 6. Restart PM2
echo -e "${GREEN}Restarting Server...${NC}"
pm2 restart $APP_NAME

echo -e "${GREEN}=======================================${NC}"
echo -e "${GREEN}UPDATE COMPLETE!${NC}"
echo -e "${GREEN}=======================================${NC}"
