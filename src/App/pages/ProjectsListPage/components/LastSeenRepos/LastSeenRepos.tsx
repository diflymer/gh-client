import Text from 'components/Text';
import s from './LastSeenRepos.module.scss';
import LastSeenReposStore from 'store/LastSeenReposStore';
import { useLocalStore } from 'utils/useLocalStore';
import Projects from '../Projects';
import { observer } from 'mobx-react-lite';

const LastSeenRepos = () => {

    const lastSeenReposStore = useLocalStore(() => new LastSeenReposStore());

    return (
        lastSeenReposStore.lastSeenProjects.length !== 0 &&
        <div className={s.main}>
            <Text color='primary' tag='h3' view='title' weight='bold'>Seen recently</Text>
            <Projects projects={lastSeenReposStore.lastSeenProjects} className={s.projects} />
        </div>
    )
}

export default observer(LastSeenRepos);
