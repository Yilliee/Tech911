import { useState } from 'react';
import PropTypes from 'prop-types';
import DashboardCardHeading from './DashboardCardHeading';
import DashboardCardEntry from './DashboardCardEntry';

function DashboardCard({TitleSize, Table, MaxEntriesPerPage}) {
    const [currentPage, setCurrentPage] = useState(0);
    const PageCount = Math.ceil(Table.length / MaxEntriesPerPage);
    
    function handlePageChange(pageNo) {
        setCurrentPage(pageNo);
    }
    
    const pageChangeButtons = Array.from({length: PageCount}, (_, idx) => {
        return (
            <button 
                key={idx} onClick={() => handlePageChange(idx)}
                className={`m-2 p-2 w-12 font-semibold rounded-2xl ${idx === currentPage ? 'bg-black text-white' : 'bg-white text-black' }`}
            >
                {idx + 1}
            </button>
        );
    });
    return (
        <div className="flex-inline  overflow-hidden flex-col justify-start mt-4 bg-sky-100 text-black border-black border-2 rounded-3xl w-full">
            <DashboardCardHeading TitleSize={TitleSize} Headings={Object.keys(Table[0])} />
            {Table.slice(currentPage*MaxEntriesPerPage, (currentPage + 1)*MaxEntriesPerPage).map(
                    (entry, idx) => {
                        return <DashboardCardEntry TitleSize={TitleSize} key={idx} EntryContent={Object.values(entry)} bottomBorder={idx != Table.length - 1}/>;
                    }
            )}
            {PageCount > 1 &&
                <div className="flex flex-row justify-center">
                    {pageChangeButtons}
                </div>
            }
        </div>
    );
}
DashboardCard.propTypes = {
    Table: PropTypes.array.isRequired,
    TitleSize: PropTypes.string,
    MaxEntriesPerPage: PropTypes.number.isRequired,
};
DashboardCard.defaultProps = {
    TitleSize: 'w-4/6',
};

export default DashboardCard;