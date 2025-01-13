import type { LoaderArgs } from './routes/+types.home';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { flattenToAppURL } from './utils';
import { useLoaderData, useLocation } from 'react-router';
import { usePloneClient } from '@plone/providers';
import App from '@plone/slots/components/App';
import type { MetaFunction } from 'react-router';
import config from '@plone/registry';
import PloneClient from '@plone/client';

export const meta: MetaFunction = () => {
  return [
    { title: 'Plone on React Router 7' },
    { name: 'description', content: 'Welcome to Plone!' },
  ];
};

const expand = ['navroot', 'breadcrumbs', 'navigation'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: LoaderArgs) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });

  const ploneClient = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method();

  const { getContentQuery } = ploneClient as PloneClient;

  const path = flattenToAppURL(request.url);
  console.log('request', request);
  console.log('pathname', new URL(request.url).pathname);

  if (
    !(
      /^https?:\/\//.test(path) ||
      /^favicon.ico\/\//.test(path) ||
      /expand/.test(path) ||
      /^\/@@images/.test(path) ||
      /^\/@@download/.test(path) ||
      /^\/assets/.test(path)
    )
  ) {
    console.log('prefetching', path);
    await queryClient.prefetchQuery(getContentQuery({ path, expand }));
  }
  console.log('ploneClient', ploneClient.config);
  console.log('path', path);
  console.log('dehydrate', dehydrate(queryClient));
  return { dehydratedState: dehydrate(queryClient) };
}

function Page() {
  const { getContentQuery } = usePloneClient();
  const pathname = useLocation().pathname;
  const { data } = useQuery(getContentQuery({ path: pathname, expand }));
  const theData = useQueryClient().getQueryData(
    getContentQuery({ path: pathname, expand }),
  );
  console.log('data in client', theData);

  if (!data) return 'Loading...';
  return <App content={data} location={{ pathname: '/' }} />;
}

export default function Content() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  const queryClient = useQueryClient();

  return (
    <HydrationBoundary state={dehydratedState} queryClient={queryClient}>
      <Page />
    </HydrationBoundary>
  );
}
