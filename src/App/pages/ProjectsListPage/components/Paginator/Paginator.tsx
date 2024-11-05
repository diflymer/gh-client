import type { FC } from 'react';
import s from './Paginator.module.scss'
import ArrowRightIcon from '../../../../../components/icons/ArrowRightIcon';
import cn from 'classnames'

interface PaginatorProps {
    currentPage: number,
    setPage: (page: number | ((prev: number) => number)) => void
    lastPage: number
}

const Paginator: FC<PaginatorProps> = ({ currentPage, setPage, lastPage }) => {

    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
    }

    return (
        <div className={s.paginator}>
            <ArrowRightIcon onClick={currentPage === 1 ? () => { } : () => setPage(prev => prev - 1)} color={currentPage === 1 ? 'secondary' : 'primary'} />
            <div className={s['pages']}>
                {pages.map(page => (
                    <div key={page} className={cn(s.page, page === currentPage && s['page-active'])} onClick={() => setPage(page)}>{page}</div>
                ))}
            </div>
            <ArrowRightIcon onClick={currentPage === lastPage ? () => { } : () => setPage(prev => prev + 1)} style={{ rotate: '180deg' }} color={currentPage === lastPage ? 'secondary' : 'primary'} />
        </div>
    )
}

export default Paginator;
