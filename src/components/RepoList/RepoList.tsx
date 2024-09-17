import styles from "./RepoList.module.css";
import RepoItem from "../RepoItem/RepoItem";
import Button from "../ui/Button/Button";
import { Repo, repoStore } from "../../store/RepoStore";
import { observer } from "mobx-react-lite";

const RepoList = observer(() => {
  const handleRepo = (repo: Repo) => {
    if (repoStore.favoriteRepos.includes(repo))
      repoStore.removeFromFavorites(repo);
    else repoStore.addToFavorites(repo);
  };

  return (
    <div className={styles.repoLists}>
      <div className={styles.list}>
        <h2>Repositories</h2>
        {repoStore.repos.map((repo) => (
          <RepoItem repo={repo} key={repo.id}>
            <Button
              onClick={() => handleRepo(repo)}
              label={
                repoStore.favoriteRepos.includes(repo)
                  ? "Remove from Favorites"
                  : "Add to Favorites"
              }
            />
          </RepoItem>
        ))}
      </div>

      <div className={styles.list}>
        <h2>Favorite Repositories</h2>
        {repoStore.favoriteRepos.length > 0 ? (
          repoStore.favoriteRepos.map((repo) => (
            <RepoItem repo={repo} key={repo.id}>
              <Button
                onClick={() => handleRepo(repo)}
                label={
                  repoStore.favoriteRepos.includes(repo)
                    ? "Remove from Favorites"
                    : "Add to Favorites"
                }
              />
            </RepoItem>
          ))
        ) : (
          <p>No favorite repositories yet</p>
        )}
      </div>
    </div>
  );
});

export default RepoList;
