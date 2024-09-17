import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GIT_URL } from "../../helpers/constants";
import { Repo } from "../../store/RepoStore";
import Loading from "../../components/ui/Loading/Loading";
import styles from "./RepoDitails.module.css";

export const RepoDetails = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState<Repo | null>(null);

  useEffect(() => {
    const fetchRepo = async () => {
      const response = await fetch(`${GIT_URL}/repositories/${id}`);
      const data = await response.json();
      setRepo(data);
    };

    fetchRepo();
  }, [id]);

  if (!repo) {
    return <Loading />;
  }

  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <h1>{repo.full_name}</h1>
        <div className={styles.main}>
          <img
            className={styles.img}
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login} avatar`}
          />

          <div>
            <p>{repo.description}</p>
            <p>⭐ Stars: {repo.stargazers_count}</p>
            <p>🍴 Forks: {repo.forks_count}</p>
            <p>🐛 Open issues: {repo.open_issues_count}</p>
            <a href={repo.html_url} target="_blank">
              Go to Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
