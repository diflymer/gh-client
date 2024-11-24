
export type ContributorApi = {
    sha: string
    message: string,
    author: commit.commit.author.name,
}
export type ContributorModel = {
    id: number;
    login: string;
    avatarUrl: string;
}

export const normalizeContributors = (from: ContributorApi): ContributorModel => ({
    id: from.id,
    login: from.login,
    avatarUrl: from.avatar_url
})