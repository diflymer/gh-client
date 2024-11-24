
export type ContributorApi = {
    id: number;
    login: string;
    avatar_url: string;
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