import { useEffect, type FC } from 'react';
import s from './Langs.module.scss';
import Text from '../../../../../components/Text';
import cn from 'classnames';
import { useLocalStore } from 'utils/useLocalStore';
import LangsStore from 'store/LangsStore';
import { observer } from 'mobx-react-lite';

type LangsProps = {
    langsURL: string;
}

const Langs: FC<LangsProps> = ({ langsURL }) => {

    const langsStore = useLocalStore(() => new LangsStore())

    useEffect(() => {
        langsStore.getLangs(langsURL)
    }, []);

    return (
        langsStore.meta === 'initial' || langsStore.meta === 'loading' ?
            <div className="loading">Loading</div>
            :
            <div className={s.langs}>
                <Text view='p-18' weight='bold'>Languages</Text>
                <div className={s['langs-line']}>
                    {langsStore.langs.map((lang, i) => (
                        <div key={`line-${lang.name}`} className={s[`langs-line-colors-${i + 1}`]} style={{ width: `${lang.percentage}%` }}></div>
                    ))}
                </div>
                <div className={s['langs-list']}>
                    {langsStore.langs.map((lang, i) => (
                        <div className={s['langs-list__item']} key={lang.name}>
                            <div className={cn(s['langs-list__item-circle'], s[`langs-line-colors-${i + 1}`])}></div>
                            <Text view='p-14' weight='medium'>{lang.name}</Text>
                            <Text view='p-14' color='secondary'>{lang.percentage}%</Text>
                        </div>
                    ))}
                </div>

            </div>
    )
}

export default observer(Langs);
