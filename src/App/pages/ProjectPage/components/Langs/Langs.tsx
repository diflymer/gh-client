import { useEffect, useState, type FC } from 'react';
import s from './Langs.module.scss';
import Text from '../../../../../components/Text';
import axios from 'axios';
import cn from 'classnames';

interface LangsProps {
    langsURL: string;
}

type Lang = {
    name: string;
    value: number;
    percentage: number;
}

const Langs: FC<LangsProps> = ({ langsURL }) => {

    useEffect(() => {

        const fetch = async () => {
            const response = await axios({
                method: 'get',
                url: langsURL,
            });

            let sum = 0;
            for (let key in response.data) {
                sum += response.data[key];
            }

            let langs = [];
            for (let key in response.data) {
                langs.push({
                    name: key,
                    value: response.data[key],
                    percentage: +(response.data[key] / sum * 100).toFixed(1),
                });
            }

            setLangs(langs);

        }
        fetch();

    }, [langsURL]);

    const [langs, setLangs] = useState<Lang[]>([]);

    return (
        <div className={s.langs}>
            <Text view='p-18' weight='bold'>Languages</Text>
            <div className={s['langs-line']}>
                {langs.map((lang, i) => (
                    <div className={s[`langs-line-colors-${i + 1}`]} style={{ width: `${lang.percentage}%` }}></div>
                ))}
            </div>
            <div className={s['langs-list']}>
                {langs.map((lang, i) => (
                    <div className={s['langs-list__item']}>
                        <div className={cn(s['langs-list__item-circle'], s[`langs-line-colors-${i + 1}`])}></div>
                        <Text view='p-14' weight='medium'>{lang.name}</Text>
                        <Text view='p-14' color='secondary'>{lang.percentage}%</Text>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Langs;
