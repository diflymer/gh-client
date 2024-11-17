import type { FC } from 'react';
import s from './Paginator.module.scss'
import ArrowRightIcon from '../../../../../components/icons/ArrowRightIcon';
import cn from 'classnames'
import rootStore from 'store/RootStore';

type PaginatorProps = {
    currentPage: number,
    lastPage: number
}

const Paginator: FC<PaginatorProps> = ({ currentPage, lastPage }) => {

    let pages = [];

    for (let i = -2; i <= 2; i++) {
        if (currentPage + i > 0 && currentPage + i <= lastPage) {
            pages.push(currentPage + i);
        }
    }

    const changePage = (page: number): void => {
        rootStore.query.setParam('page', page.toString())
    }

    return (
        <div className={s.paginator}>
            <ArrowRightIcon onClick={currentPage === 1 ? () => { } : () => { changePage(currentPage - 1) }} color={currentPage === 1 ? 'secondary' : 'primary'} />
            <div className={s.pages}>
                {pages[0] !== 1 &&
                    <>
                        <div className={s.page} onClick={() => changePage(1)}>1</div>
                        {pages[0] !== 2 && <div className={s.page}>...</div>}
                    </>
                }
                {pages.map(page => (
                    <div key={page} className={cn(s.page, page === currentPage && s['page-active'])} onClick={() => changePage(page)}>{page}</div>
                ))}
                {pages.at(-1) !== lastPage &&
                    <>
                        {pages.at(-1) !== lastPage - 1 && <div className={s.page}>...</div>}
                        <div className={s.page} onClick={() => changePage(lastPage)}>{lastPage}</div>
                    </>
                }
            </div>
            <ArrowRightIcon onClick={currentPage === lastPage ? () => { } : () => { changePage(currentPage + 1) }} style={{ rotate: '180deg' }} color={currentPage === lastPage ? 'secondary' : 'primary'} />
        </div>
    )
}

export default Paginator;
