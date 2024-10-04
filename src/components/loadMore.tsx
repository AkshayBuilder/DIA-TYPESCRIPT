"use client";
import { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import Movie from "@/lib/movie";
import { Spinner } from "./ui/spinner";
import { fetchMovies } from "@/actions/fetch-movies";
import Link from "next/link";
import { Photo } from "./photo";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { SearchComponent } from "@/components/search";
import { memo } from "react";

// Memoized MovieLink component
const MovieLink = memo(function MovieLink({
  priority,
  movie,
  ref,
}: {
  priority: boolean;
  movie: Movie;
  ref?: any;
}) {
  return (
    <div className="relative" ref={ref}>
      <Link
        href={`/`}
        key={Math.random()} //  key should be unique and index won't be used.
        className="block transition ease-in-out md:hover:scale-105"
        prefetch={false}
      >
        <Photo
          src={movie.posterimage!}
          title={movie.name}
          priority={priority}
        />
        <span className="absolute bottom-0 left-0 p-2 text-sm font-semibold"></span>
      </Link>
      <div className="mt-2">
        {movie.name.length > 12 ? `${movie.name.slice(0, 12)}...` : movie.name}
      </div>
    </div>
  );
});

export function LoadMore({ initialMovies }: { initialMovies: Movie[] | null }) {
  const [movies, setMovies] = useState<Movie[] | null>(initialMovies || []);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const searchTerm = useSelector(
    (state: RootState) => state.search.searchTerm
  ); // Get search term from Redux store

  const { ref, inView } = useInView();

  // Function to load more movies when scrolled into view
  async function loadMoreMovies() {
    const next = pagesLoaded < 4 ? pagesLoaded + 1 : pagesLoaded;

    const newMovies = await fetchMovies(`page${next}`);

    if (newMovies?.length) {
      setPagesLoaded(next);
      setMovies((prev: Movie[] | null) => [
        ...(prev?.length ? prev : []),
        ...newMovies,
      ]);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  // Memoized filtering to avoid recomputation unless movies or searchTerm changes
  const filteredMovies = useMemo(
    () =>
      movies?.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [movies, searchTerm]
  );

  return (
    
      <div className="w-full flex flex-col h-full">
        {/* SearchComponent for searching movies */}
        

        {/* Movies grid */}
        <div className="container mx-auto grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-3">
          {!filteredMovies?.length ? (
            <p className="text-center text-muted-foreground col-span-full">
              No movies found.
            </p>
          ) : (
            filteredMovies.map((film, index) => {
              const isLastElement = index === filteredMovies.length - 1;

              return (
                <MovieLink
                  key={Math.random()} // use unique key
                  priority={index < 10}
                  movie={film}
                  ref={isLastElement && pagesLoaded < 4 ? ref : null} // ref
                />
              );
            })
          )}
        </div>

        {/* Spinner for pagination */}
        <div ref={ref}>
          {pagesLoaded < 3 ? <Spinner />:<div></div>}
        </div>
      </div>
    
  );
}
