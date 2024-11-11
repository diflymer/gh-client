import type { FC } from 'react';
import s from './Stats.module.scss';
import StarIcon from './components/StarIcon';
import WatcherIcon from './components/WatcherIcon';
import ForkIcon from './components/ForkIcon';
import Text from '../../../../../components/Text';

type StatsProps = {
    stats: {
        stars: number | null;
        forks: number | null;
        watchers: number | null;
    }
}

const Stats: FC<StatsProps> = ({ stats }) => {
    return (
        <div className={s.stats}>
            <div className={s.stars}>
                <StarIcon />
                <Text view='p-14' color="secondary">{stats.stars} stars</Text>
            </div>
            <div className={s.watchers}>
                <WatcherIcon />
                <Text view='p-14' color="secondary">{stats.watchers} watching</Text>
            </div>
            <div className={s.forks}>
                <ForkIcon />
                <Text view='p-14' color="secondary">{stats.forks} forks</Text>
            </div>
        </div>
    )
}

export default Stats;
