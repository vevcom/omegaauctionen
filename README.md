# Omegaauctionen-2025
Auctionen til Sct. Omega Broderskab for aar 2025

Omega auksjonen er en årlig akusjon der medlemmer av Sct. Omega Broderskab auksjonerer vekk forkjellige ting og tjenester. På slutten går alle inntektene til et veldedig formål. 


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install all packages
```
npm install
```

Generate a client for the database
```
npx prisma generate
```

Push schema to database
```
npx prisma db push
```


## Development without docker
### Picture server
Install pyton and requirements detailed in services/picture_server/requirements.txt

To run the picture server run the main.py file

### Next
Run 
``` bash
npm run dev 
```

Open the project in your browser on the link provided by npm after running "npm run dev" to see the result.


### Env variables
Duplicate the "default.env" file and rename it ".env"
For development DATABASE_URL, FEIDE_CLIENT_ID and FEIDE_CLIENT_SECRET needs to be filled out


## Setup
- Change the "const pictureServerSource" in pictureServerIp.ts reflects your picture server ip
- Change default values for "finalSaleTime" and "currentSaleTime" in your "schema.prisma" file and "auctionStart", "auctionNormalEnd" and "auctionFinalEnd" in "timeCheck.ts" to reflect the auction start and end date. There have been problems with timezones and server set up. **Test to make sure the time is how you expect**
- Update your "app.config['MAX_CONTENT_LENGTH']" in "main.py" and "bodySizeLimit" in "next.config.mjs" to set max picture upload size
- After running the picture server, add your default picture in to "uploads/" as "default.jpeg"

## Useful commands
Check for build errors locally 
``` bash
docker compose --env-file default.env -f docker-compose.prod.yml build
``` 

## Production
Duplicate the "default.env" file and rename it ".env"
Fill in all environment variables
Open ports 5432, 80, 443 and 42069.

Build with:
``` bash
docker compose -f docker-compose.prod.yml build
```

Up the project with:
``` bash
docker compose -f docker-compose.prod.yml up
```

Build and up the project with:
``` bash
docker compose -f docker-compose.prod.yml up --build
```

Add "-d" to detach

Down the project with:
``` bash
docker compose -f docker-compose.prod.yml down
```
The database is perserved between docker volumes. To reset the database
```bash
rm -rf postgres-data
```

To make a default picture. Upload an image through the put item for auction page. Go in to the uploads folder and use command
```bash
sudo mv [your picture] default.jpeg
```