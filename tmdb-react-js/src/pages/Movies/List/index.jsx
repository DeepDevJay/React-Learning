// src/pages/Movies/List/index.jsx
import { useEffect, useMemo, useState } from "react";
import { Button, Empty, Typography, Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import MovieToolbar from "./MovieToolbar";
import MovieFilters from "./MovieFilters";

import useMovies from "../../../hooks/useMovies";
import LoadingCards from "../../../components/Common/LoadingCards";
import MovieCard from "../../../components/Movies/MovieCard";
import PageLoader from "../../../components/Common/PageLoader";

const { Title } = Typography;

export default function MovieList() {
  const navigate = useNavigate();

  // Local States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState({ field: "releaseDate", order: "DESC" });
  const [filters, setFilters] = useState({
    genreIds: [],
    languageIds: [],
    countryIds: [],
    voteAverageMin: null,
    voteAverageMax: null,
    popularityMin: null,
    popularityMax: null,
    runtimeMin: null,
    runtimeMax: null,
    releaseDateFrom: null,
    releaseDateTo: null,
    status: null,
  });
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // GraphQL Filter
  const filter = useMemo(() => {
    const f = {
      skip: pagination.skip,
      limit: pagination.limit,
    };

    if (debouncedSearch) f.searchTerm = debouncedSearch;
    if (filters.genreIds?.length) f.genreIds = filters.genreIds;
    if (filters.languageIds?.length) f.languageIds = filters.languageIds;
    if (filters.countryIds?.length) f.countryIds = filters.countryIds;
    if (filters.voteAverageMin != null) f.voteAverageMin = filters.voteAverageMin;
    if (filters.voteAverageMax != null) f.voteAverageMax = filters.voteAverageMax;
    if (filters.releaseDateFrom) f.releaseDateFrom = filters.releaseDateFrom;
    if (filters.releaseDateTo) f.releaseDateTo = filters.releaseDateTo;

    return f;
  }, [pagination, debouncedSearch, filters]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, skip: 0 }));
  }, [debouncedSearch, filters, sort]);

  // Movies Query
  const { loading, error, data, fetchMore } = useMovies(filter, sort);

  // Movie Data
  const movies = data?.listMovies?.data ?? [];
  const total = data?.listMovies?.count ?? 0;

  // Load More
  const loadMore = async () => {
    if (movies.length >= total) return;

    const nextSkip = movies.length;

    setPagination((prev) => ({ ...prev, skip: nextSkip }));

    await fetchMore({
      variables: {
        filter: {
          ...filter,
          skip: nextSkip,
        },
        sort,
      },
    });
  };

  // Initial Loader
  if (loading && movies.length === 0) {
    return (
      <>
        <Title level={2}>
          Movies
        </Title>

        <MovieToolbar
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          openFilters={() => setFilterOpen(true)}
          onAddMovie={() => navigate("/movies-card/create")}
        />

        <LoadingCards />
      </>
    );
  }

  if (error) {
    return (
      <Empty description={error.message} />
    );
  }

  return (
    <>
      <Title level={2}>
        Movies
      </Title>

      <MovieToolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        openFilters={() => setFilterOpen(true)}
        onAddMovie={() => navigate("/movies-card/create")}
      />

      <MovieFilters
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      {movies.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Movies Found"
        >
          <Button
            type="primary"
            onClick={() => {
              setSearch("");
              setFilters({
                genreIds: [],
                languageIds: [],
                countryIds: [],
                voteAverageMin: null,
                voteAverageMax: null,
                popularityMin: null,
                popularityMax: null,
                runtimeMin: null,
                runtimeMax: null,
                releaseDateFrom: null,
                releaseDateTo: null,
                status: null,
              });
            }}
          >
            Clear Filters
          </Button>
        </Empty>
      ) : (
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMore}
          hasMore={ movies.length < total }
          loader={<PageLoader />}
          scrollThreshold={0.9}
        >
          <Row gutter={[24, 24]}>
            {movies.map((movie) => (
              <Col
                key={movie.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={4}
              >
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      )}
    </>
  );
}
