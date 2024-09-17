import { makeAutoObservable } from "mobx";

export interface Repo {
  description: string;
  open_issues_count: number;
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    avatar_url: string;
    login: string;
  };
}

class RepoStore {
  repos: Repo[] = [];
  favoriteRepos: Repo[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setRepos(repos: Repo[]) {
    this.repos = repos;
  }

  addToFavorites(repo: Repo) {
    if (!this.favoriteRepos.includes(repo)) {
      this.favoriteRepos.push(repo);
    }
  }

  removeFromFavorites(repo: Repo) {
    this.favoriteRepos = this.favoriteRepos.filter((r) => r.id !== repo.id);
  }
}

export const repoStore = new RepoStore();
