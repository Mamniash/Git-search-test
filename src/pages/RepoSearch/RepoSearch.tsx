import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { repoStore } from "../../store/RepoStore";
import { GIT_URL, THROTTLING_COUNT } from "../../helpers/constants";
import Input from "../../components/ui/Input/Input";
import styles from "./RepoSearch.module.css";
import RepoList from "../../components/RepoList/RepoList";
import Loading from "../../components/ui/Loading/Loading";

const RepoSearch = observer(() => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      if (searchValue.trim()) {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `${GIT_URL}/search/repositories?q=${searchValue}`
          );
          repoStore.setRepos(data.items);
        } catch (error) {
          console.error("Error fetching repositories:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchRepos();
    }, THROTTLING_COUNT);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <div className={styles.layout}>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search GitHub Repositories"
      />

      {loading ? <Loading /> : <RepoList />}
    </div>
  );
});

export default RepoSearch;
