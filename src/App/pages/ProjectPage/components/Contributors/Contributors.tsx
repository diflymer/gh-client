import { useEffect, useState, type FC } from 'react';
import s from './Contributors.module.scss';
import Text from '../../../../../components/Text';
import axios from 'axios';


interface ContributorsProps {
    contributorsURL: string;
}

type Contributor = {
    id: number;
    login: string;
    avatar_url: string;
}

const Contributors: FC<ContributorsProps> = ({ contributorsURL }) => {

    useEffect(() => {

        const fetch = async () => {
            const response = await axios({
                method: 'get',
                url: contributorsURL,
            });

            setContributors(response.data.map((raw: any) => ({
                id: raw.id,
                login: raw.login,
                avatar_url: raw.avatar_url
            })))

        }
        fetch();

    }, [contributorsURL]);

    let [contributors, setContributors] = useState<Contributor[]>([]);

    return (
        <div className={s.contributors}>
            <div className={s['contributors-header']}>
                <Text view='p-18' weight='bold'>Contributors</Text>
                <span className={s.count}>{contributors.length}</span>
            </div>
            <div className={s['contributors-body']}>
                {contributors.map((contributor) => (
                    <div key={contributor.id} className={s['contributor']}>
                        <div className={s['contributor-img']}>
                            <img src={contributor.avatar_url} alt='avatar' />
                        </div>
                        <Text view='p-16' weight='bold'>{contributor.login}</Text>
                        <Text view='p-16' color='secondary'>{''}</Text>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contributors;
