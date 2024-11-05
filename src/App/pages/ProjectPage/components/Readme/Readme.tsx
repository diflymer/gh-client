import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from './Readme.module.scss'

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

            console.log(result)

            setReadmeContent(result.data)
        }

        fetch();

    }, [])

    let [readmeContent, setReadmeContent] = useState();

    return (
        <div className={s.readme}>
            <div className={s['readme-header']}>README.md</div>
            <div className={s['readme-body']} dangerouslySetInnerHTML={{ __html: readmeContent }}></div>
        </div>
    )
}

export default Readme;
