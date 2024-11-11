import type { FC } from 'react';
import s from './Topics.module.scss';

type TopicsProps = {
    topics: string[];
}

const Topics: FC<TopicsProps> = ({ topics }) => {
    return (
        <div className={s.topics}>
            {topics.map((topic) => (
                <div key={topic} className={s.topic}>{topic}</div>
            ))}
        </div>
    )
}

export default Topics;
