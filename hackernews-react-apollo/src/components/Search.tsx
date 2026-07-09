import { useLazyQuery } from '@apollo/client/react';
import Link from './Link';
import { useState } from 'react';
import { FEED_SEARCH_QUERY, type LinkItem } from '../queries';

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);

  const handleSearch = () => {
    if (searchFilter.trim()) {
      executeSearch({
        variables: { filter: searchFilter }
      });
    }
  };

  return (
    <>
      <div>
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)}/>
        <button onClick={handleSearch}>OK</button>
      </div>
      {data &&
        data.feed.links.map((link: LinkItem, index: number) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;