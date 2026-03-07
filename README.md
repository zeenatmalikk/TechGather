This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

tsconfig: type config file
postcss.config.mjs: config file for postcss, tool to process css with diff plugins
next.config.ts: allows to cinfg next js features (build settingss)
public: static assets
app: 

client components:
client components are rendered on the client side whihc simplymeans the browser
to use them add 'use client'

## SERVER SIDE PRE RENDERING::
## client component are rendered on the server side and hydrated on the clients side
## any thing in client component that diesnt require interactivity or isnt dependent on the brwser is renderd on the server 
## the code that rely on browser is left as placehokder in the server side pre rendering and when the reach the client the 
## browser than fills in the placeholder with client component 
*****************


server components:
logs appears in browsers as well for server components as well
server components are rendered on server, html is sent to client
sinceits rendered on server it can access server side resources directly
like db, file systems
this reduces ampount of js sent to the client improving performance
1. direct access to server side resources 
2. keep sensitive info safe

leave everythign as server side components until u need a browser interactivity


next 16 automatically momizes component to reducee unnecessary rerenders
no more use meno use callback
compile analyzes code at build time and optim renderingbehaviour

## Routing
1. folder name becomes the route name and page.tsx renders the ui for that route
## Nested routes
1. make a folder called [id] in the route u want to next and a page.tsx
## to get the param
1. to get the param in PAGE : use the params by destructuring it from props
    it is a promise so make type of promise and get it by awaiting it from params but make the whole apge as async
2. if params are required in components: use it using hook useparams 

to mae a layout for specific routes createa layout.tsx file in the folder where u wnat the layout
eg: if the layout is needed for dahsboard only then create layout.tsx inn dasboard folder and tiwill apper on all pgs with /dasboard route

now if you want a seprate layot for other pgs than dashboardnd sep layotu for dashboard
use 
### route groups ###
they allow u to organize ur route segments and project structure without impacting the url path.
this means u can create folder but unlike nested routes, these wont show up in the url
syntax: simpy rap the filder name in ()
eg: (marketing)

route groups allows to add layout but it should only have one page.tsx in the root 

## Error handling##
anything in error.tsx file will show if tehre any error in any file in that route group
it has to be a client component as errors should show to the client
if you want only one global error then u should only have one at the root of app folder
unlike layout.tsx that display it from its parent route error handling works differently
only the closest from the route takes priotiy
erros will bubble up to the nearest eror file
eg: if dashobard folder has error.tsx and global app folder has it too and if settings folder from dashboard throws it

## Loading UIS ##
similar to error handling in next js

## data fetching
server side:
clare fnc
fetch request
##HMR Cache
allows to cache fetch responses ins erver compo accroos hot module replacement refreshes in local dev
faster responses and reduce cost for build api calls

ssr & csr
 ssr: improved init load time as a ssr data fetching allos the pg to be rendered with the data already included. it reduces the time to fcp 
 ssr: better seo
 csr: the user sees anempty pg until the pg is rendered 
 csr: fetched and then displayed negative impact seo
 ssr: data fetchig logic on the server. this ismplify ur component  logicand reduce the need for useeffect and suestate hook
 ssr: automativ request deduplication

 ## Automatic req deduplication
 when fetching data in the server which can reduce unnecessary api calls
 it makes sure that when the same data is requested multiple times at once only one req is sent it stops duplicate reequest from being made

improved security
server side fetcing aprallezie the request where as CSR increases the client side fetching waterfall

## API ROUTES
1. lesser code for backedn with next js
2. file based api routing
3. no need to monitor backend explicitly
4. create a route.ts to create any api
5. folder names servees as api route name

##CAching
storing data temp  it can be reused instead of refetched or rebuilt
browser cache: saves static file locally
server cache stores pre rendered pages, api repsonse
data cache: reme,bers fetched data to avoid repeat req

"use cache"
siply definems what gets cached in next js
thsi tells to caceh teh output if input havent changed
top of the layout use 'use cache'
it will
1. prerender it at build time
2. store it in memory
3. revalidates it automatically
cacheLife()
controls hwo long data stays
cachelife: comtrols when to clear
cachetag: what to clear
revalidate(): clear
partial pre rendering: cache comp 


## mongo db
cluster: DB

## data modelling
main entityin app
dev events: event
what defines an event?
title
desc
date/time
image
location
how is it happening?online/offline
who is it for
whats gonnahappen
whos organizing it
tags
seo friendly: slug

hwo the suers interact with this event
second entity 
booking
which event? event id
who booked? email
when the booking? automatc timestamps
relations
one to many (1 event to many booking)

what should the data do
backend arch

//use cache will cache results at build time or runtime
//cacheComponents 
