import { ProjectOwnerApi } from './projectOwner'

export type ProjectApi = {
    id: number,
    name: string,
    description: string,
    stargazers_count: number,
    updated_at: string,
    full_name: string,
    url: string,
    owner: ProjectOwnerApi
}


export type ProjectModel = {
    id: number,
    title: string,
    desc: string,
    imgUrl: string,
    stars: number,
    updatedAt: string,
    fullName: string
}

export const normalizeProject = (from: ProjectApi): ProjectModel => ({
    id: from.id,
    title: from.name,
    desc: from.description,
    imgUrl: from.owner.avatar_url,
    stars: from.stargazers_count,
    updatedAt: new Date(from.updated_at).toLocaleDateString('en-GB', {
        day: 'numeric',    // День без ведущего нуля
        month: 'short'     // Короткое название месяца
    }),
    fullName: from.full_name
})