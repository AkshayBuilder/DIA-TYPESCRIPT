
import { Suspense } from 'react';
import { BooksGrid } from '@/components/grid';
import axios from 'axios';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Movie from '@/lib/movie';
import { LoadMore } from '@/components/loadMore';
import { fetchMovies } from '@/actions/fetch-movies';
import Loading from './loading';

//import {
 // estimateTotalBooks,
 // fetchBooksWithPagination,
 // ITEMS_PER_PAGE,
//} from '@/lib/db/queries';
//import { parseSearchParams } from '@/lib/url-state';

export default async function Page()
 {
     const data = await fetchMovies("page1");

  return (
    <div className="flex flex-col h-full">
    {/* LoadMore now contains the SearchComponent */}
    <div className="flex-grow overflow-auto min-h-[200px]">
      <div className="group-has-[[data-pending]]:animate-pulse p-2">
        <Suspense fallback={<Loading/>}>
        <LoadMore initialMovies={data} />
        </Suspense>
      </div>
    </div>
  </div>
    
  );
}
