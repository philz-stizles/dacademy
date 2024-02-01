import { createNextPageApiHandler } from 'uploadthing/next-legacy';

import { ourFileRouter } from './core';

// Export routes for Next App Router
const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;