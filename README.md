SaaS AI application using NextJS, Prisma, Tailwind CSS, Stripe.


```
.env file structure: 

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=XXXXXX
CLERK_SECRET_KEY=XXXXXX
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
OPENAI_API_KEY=XXXXXX
REPLICATE_API_TOKEN=XXXXXX
STRIPE_API_KEY=XXXXXX
DATABASE_URL=XXXXX
//this URL would be given by PlanetScale replace it with yours.
NEXT_PUBLIC_APP_URL = http://localhost:3000
STRIPE_WEBHOOK_SECRET =  XXXXXX

Setting up the project: 
Step 1 - Clone this repo
Step 2 - Generate your OpenAI and Replicate AI api tokens and add   it to .env file 
Step 3 - npm install
Step 4 - Create an account in PlanetScale and generate the db url for prisma and paste it in .env file
Step 5 - npx prisma init
Step 6 - npm i @prisma/client
Step 7 - npx prisma generate 
//after above command perform this command to add prisma to your node modules
Step 8 - npx prisma db push 
//after every update in prisma schema update the db
//npx prisma migrate reset - this command is used to delete all data from your db
Step 9 - npx prisma studio 
//to view all your data inside prisma
Step 10 - Download and set up Stripe cli for development purposes.
After successful setup
    1. stripe login
    2. stripe listen --forward-to localhost:3000/api/webhook
    //above command would generate you a webhook token paste it in .env file 
Step 10 - npm run dev

PS:
    //After successful deployment of the project to Vercel, grab the URL provided by Vercel, and change the stripe webhook end point by generating it from the stripe developer website.
    //Also don't forget to change the "NEXT_PUBLIC_APP_URL" from localhost to the URL you are running your app.
```