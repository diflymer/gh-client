export type ProjectOwnerApi = {
    login: string
    id: 14364638,
    avatar_url: string,
    url: string,
}

export type ProjectOwnerMeta = {
    login: string
    id: 14364638,
    avatarUrl: string,
    url: string,
}

export const normalizeProjectOwner = (from: ProjectOwnerApi): ProjectOwnerMeta => ({
    login: from.login,
    id: from.id,
    avatarUrl: from.avatar_url,
    url: from.url,
})