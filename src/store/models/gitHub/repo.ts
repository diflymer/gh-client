import { ProjectOwnerApi } from './projectOwner'
import { ProjectModel } from './project'

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
    owner: ProjectOwnerApi,
    updated_at: string,
    full_name: string
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
    },
    updatedAt: string,
    fullName: string
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
    homepage: from.homepage,
    updatedAt: from.updated_at,
    fullName: from.full_name
})

export const changeRepoToProject = (from: RepoModel): ProjectModel => ({
    id: from.id,
    title: from.title,
    desc: from.desc,
    imgUrl: from.imgUrl,
    stars: from.stats.stars,
    updatedAt: new Date(from.updatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',    // День без ведущего нуля
        month: 'short'     // Короткое название месяца
    }),
    fullName: from.fullName,
})