import Text from "../../../components/Text";
import s from "./ProjectsListPage.module.scss"
import MultiDropdown, { Option } from "../../../components/MultiDropdown";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import SearchIcon from "./components/SearchIcon";
import Projects from "./components/Projects";
import { useEffect, useState } from "react";
import axios from "axios";
import Paginator from "./components/Paginator";

const ProjectsListPage = () => {

    const perPage = 9;

    let [page, setPage] = useState<number>(1);
    let [lastPage, setLastPage] = useState<number>(page);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: `https://api.github.com/orgs/ktsstudio/repos?per_page=${perPage}&page=${page}`
            });


            //Обработка страниц для пагинации
            const linkHeader = result.headers['link'];
            if (linkHeader) {
                // Разбиваем Link заголовок на части
                const links = linkHeader.split(', ');
                // Находим ссылку с rel="last"
                const lastPageLink = links.find((link: any) => link.includes('rel="last"'));
                if (lastPageLink) {
                    // Извлекаем номер последней страницы из URL
                    const match = lastPageLink.match(/&page=(\d+)/);
                    if (match) {
                        setLastPage(parseInt(match[1], 10));  // Возвращаем номер последней страницы как число
                    }
                }
            }

            setProjects(result.data.map((raw: any) => ({
                id: raw.id,
                title: raw.name,
                desc: raw.description,
                imgURL: raw.owner.avatar_url,
                stars: raw.stargazers_count,
                updated_at: raw.updated_at,
                url: raw.url,
                full_name: raw.full_name
            })))
        }

        fetch();

    }, [page])

    let [projects, setProjects] = useState([]);

    return (
        <div className={s['page']}>
            <div className={s['title']}>
                <Text view="title" weight="bold">List of organization repositories</Text>
            </div>
            <div className={s['section']}>

                <div className={s['content']}>

                    <div className={s['content-header']}>
                        <MultiDropdown className={s['content-header-mdd']} options={[]} value={[]} onChange={() => { }} getTitle={() => ""} />
                        <div className={s['search-field']}>
                            <Input value={""} onChange={() => { }} placeholder="Enter organization name" />
                            <Button><SearchIcon /></Button>
                        </div>
                    </div>

                    <Projects projects={projects} />

                </div>
                <Paginator currentPage={page} setPage={setPage} lastPage={lastPage} />
            </div>
        </div>
    )
}

export default ProjectsListPage;
