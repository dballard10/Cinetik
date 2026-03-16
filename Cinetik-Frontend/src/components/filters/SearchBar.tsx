import { FiSearch, FiX } from "react-icons/fi";
import useMediaStore from "@/hooks/use-media-store";

const SearchBar = () => {
  const { setSearchQuery, clearSearchQuery, searchQuery } = useMediaStore();

  return (
    <div className="search-container">
      {searchQuery ? (
        <button onClick={() => clearSearchQuery()}>
          <FiX className="search-icon" />
        </button>
      ) : (
        <FiSearch className="search-icon" />
      )}
      <input
        type="text"
        placeholder="Search movies or series..."
        className="search-input"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery || ""}
      />
      <style>
        {`
        .search-container {
          position: relative;
          width: 100%;
          max-width: 700px;
          color: #ffffff;
          margin: 0 auto;
          display: flex;
          align-items: center;
        }

        @media (max-width: 850px) {
          .search-container {
            margin-left: 58px;
            width: 88%;
          }
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #ffffff;
          width: 20px;
          height: 20px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid #4b5563;
          border-radius: 9999px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s ease;
          background-color: #1f2937;
          color: #ffffff;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .search-input:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
        }
        `}
      </style>
    </div>
  );
};

export default SearchBar;
