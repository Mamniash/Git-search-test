import React from "react";
import { Repo } from "../../store/RepoStore";
import { Link } from "react-router-dom";
import styles from "./RepoItem.module.css";

interface RepoItemProps {
  repo: Repo;
  children?: React.ReactNode;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, children }) => {
  return (
    <div key={repo.id} className={styles.repo}>
      <Link to={`/repo/${repo.id}`}>
        <div className={styles.main}>
          <img
            className={styles.img}
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login} avatar`}
            width="50"
          />
          <h3 className={styles.link}>{repo.full_name}</h3>
        </div>
      </Link>
      <p>
        ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
      </p>
      {children}
    </div>
  );
};

export default RepoItem;
