import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from './Readme.module.scss'
import 'github-markdown-css/github-markdown.css'
import cn from 'classnames'

const Readme = () => {

    const params = useParams();

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                headers: {
                    Accept: 'application/vnd.github.html+json'
                },
                method: 'get',
                url: `https://api.github.com/repos/${params.owner}/${params.repo}/readme`,
            });

            setReadmeContent(result.data)
        }

        fetch();

    }, [])

    let [readmeContent, setReadmeContent] = useState<TrustedHTML | undefined>();

    return (
        <div className={s.readme}>
            <div className={s['readme-header']}>README.md</div>
            {readmeContent &&
                <div className={cn(s['readme-body'], 'markdown-body')} dangerouslySetInnerHTML={{ __html: readmeContent }}></div>
            }
        </div>
    )
}

export default Readme;
