#!/bin/bash

# Last inn enviroment variablene
source .env

# Sted å lagre backup
BACKUP_DIR=./backups

# Get current date and time
datestamp=$(date +'%Y-%m-%d')
timestamp=$(date +'%H:%M')

echo $datestamp
echo $timestamp

# Execute pg_dump command to dump the database
pg_dump --dbname $DATABASE_URL > "$BACKUP_DIR"/"$datestamp"_"$timestamp".sql