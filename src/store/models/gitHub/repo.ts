import { ProjectOwnerApi } from './projectOwner'

export type RepoApi = {
    id: number,
    name: string,
    homepage: string,
    topics: string[],
    description: string,
    stargazers_count: number,
    watchers_count: number,
    forks_count: number,
    contributors_url: string,
    languages_url: string,
    owner: ProjectOwnerApi
}


export type RepoModel = {
    id: number,
    title: string,
    desc: string,
    imgUrl: string,
    contributorsUrl: string,
    languagesUrl: string,
    homepage: string,
    topics: string[],
    stats: {
        stars: number,
        forks: number,
        watchers: number
    }
}

export const normalizeRepo = (from: RepoApi): RepoModel => ({
    id: from.id,
    title: from.name,
    desc: from.description,
    imgUrl: from.owner.avatar_url,
    topics: from.topics,
    stats: {
        stars: from.stargazers_count,
        forks: from.forks_count,
        watchers: from.watchers_count
    },
    contributorsUrl: from.contributors_url,
    languagesUrl: from.languages_url,
    homepage: from.homepage
})