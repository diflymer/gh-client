import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Gitgraph, Orientation } from "@gitgraph/react";
import { templateExtend, TemplateName } from "@gitgraph/react";
import GitGraphStore from "store/GitGraphStore";
import styles from "./GitGraph.module.scss";
import { useLocalStore } from "utils/useLocalStore";
import MultiDropdown from "components/MultiDropdown";
import { Params } from "react-router-dom";
import Loader from "components/Loader";


type GitGraphProps = {
    params: Readonly<Params<string>>
};

const GitGraphComponent: React.FC<GitGraphProps> = ({ params }) => {

    const gitGraphStore = useLocalStore(() => new GitGraphStore(params));

    useEffect(() => {
        gitGraphStore.getBranches();
    }, []);

    // Зелёный стиль
    const greenTemplate = templateExtend(TemplateName.Metro, {
        colors: ["#2ECC71", "#27AE60", "#145A32", "#ABEBC6", "#58D68D"],
        branch: {
            lineWidth: 4,
            spacing: 50,
            label: {
                bgColor: "#145A32",
                color: "#FFFFFF",
                font: "bold 14px Arial",
                borderRadius: 5,
            },
        },
        commit: {
            spacing: 50,
            dot: {
                size: 8,
                color: "#FFFFFF",
                strokeWidth: 4,
                strokeColor: "#27AE60",
            },
            message: {
                displayAuthor: true,
                displayHash: false,
                font: "italic 12px Arial",
                color: "#145A32",
            },
        },
    });

    let optionsMdd = gitGraphStore.branches.map((branch) => (
        { value: branch.name, key: branch.name }
    ))

    return (
        <div className={styles.gitGraphContainer}>
            {gitGraphStore.metaBranches !== 'success' ?
                gitGraphStore.metaBranches === 'error' ?
                    <p className={styles.gitGraphError}>Ошибка загрузки ветвей</p>
                    :
                    <Loader />
                : <MultiDropdown options={optionsMdd} value={{ value: gitGraphStore.currentBranch, key: gitGraphStore.currentBranch }} getTitle={(value) => value.value}
                    onChange={(value) => gitGraphStore.chooseBranch(value.value)} />
            }

            {gitGraphStore.metaCommits !== 'success' ?
                gitGraphStore.metaCommits === 'error' ?
                    <p className={styles.gitGraphError}>Ошибка загрузки коммитов</p>
                    :
                    <Loader />
                : (
                    <div className={styles.gitGraphWrapper}>
                        <Gitgraph
                            options={{
                                template: greenTemplate,
                                orientation: Orientation.VerticalReverse, // Отображение снизу вверх
                            }}
                        >
                            {(gitgraph) => {
                                const mainBranch = gitgraph.branch(gitGraphStore.currentBranch);

                                gitGraphStore.commits.forEach((commit) => {
                                    mainBranch.commit({
                                        subject: commit.commit.message,
                                        author: commit.commit.author.name,
                                        hash: commit.sha.substring(0, 7),
                                    });
                                });

                                return null;
                            }}
                        </Gitgraph>
                    </div>
                )}
        </div>
    );
};
export default observer(GitGraphComponent);;