import { useEffect, type FC } from 'react';
import s from './Contributors.module.scss';
import Text from '../../../../../components/Text';
import { useLocalStore } from 'utils/useLocalStore';
import ContributorsStore from 'store/ContributorsStore';
import { observer } from 'mobx-react-lite';


type ContributorsProps = {
    contributorsURL: string;
}

const Contributors: FC<ContributorsProps> = ({ contributorsURL }) => {

    const contributorsStore = useLocalStore(() => new ContributorsStore());

    useEffect(() => {
        contributorsStore.getContributors(contributorsURL);

    }, []);

    return (
        contributorsStore.meta === 'initial' || contributorsStore.meta === 'loading' ?
            <div className="loading">Loading</div>
            :
            <div className={s.contributors}>
                <div className={s['contributors-header']}>
                    <Text view='p-18' weight='bold'>Contributors</Text>
                    <span className={s.count}>{contributorsStore.conts.length}</span>
                </div>
                <div className={s['contributors-body']}>
                    {contributorsStore.conts.slice(0, 4).map((contributor) => {
                        return (
                            <div key={contributor.id} className={s['contributor']}>
                                <div className={s['contributor-img']}>
                                    <img src={contributor.avatarUrl} alt='avatar' />
                                </div>
                                <Text view='p-16' weight='bold'>{contributor.login}</Text>
                                <Text view='p-16' color='secondary'>{''}</Text>
                            </div>
                        )

                    })}
                </div>
                {contributorsStore.conts.length > 4 &&
                    <div className={s['contributors-more']}>
                        <Text view='p-16' color='secondary'>...</Text>
                    </div>
                }
            </div >
    )
}

export default observer(Contributors);
