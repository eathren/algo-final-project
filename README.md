This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Note: css classes are tailwindcss.

Grid is currently entirely composed of bidirectional edges, with weights of 150. We can likely randomize this to some extent to get more of a street-map looking view, or use a cytoscape layout for a more graph-looking view. 

Please note that the current design makes it look like there is only a single edge between nodes, when in fact there are two, but the default curve made this graph pretty confusing, so I kept them straight for now until we modify conditions. 


For teammates: Send me your email/github username and I will sned you an access invite to that email.

For people new to frontend. Install Node(if you haven't already), to get access to NPM, a package manager. 

Personally I prever Yarn. You can get it after you download node/npm by running ```npm install --global yarn```

Download the packages in this repo by running either ```yarn``` or ```npm install```. 


Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
