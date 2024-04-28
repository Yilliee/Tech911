import PropTypes from 'prop-types';

function DashboardCardEntry({TitleSize, EntryContent}) {
    const headerClass = "flex flex-col truncate justify-center px-4 h-full text-center font-bold text-normal border-black";

    console.log(TitleSize);

    const elements = EntryContent.map((content, idx) => {
        return (
            <h3 key={idx} className={`${idx === 1 ? TitleSize : 'w-1/6'} ${headerClass} ${(idx + 1 < EntryContent.length) && 'border-r-2'}`}>{content}</h3>
        );
    });

    return (
        <div className="flex flex-row justify-center h-12 items-center border-b-2 border-black">
           {elements}
        </div>
    )
}
DashboardCardEntry.propTypes = {
    TitleSize: PropTypes.string.isRequired,
    EntryContent: PropTypes.array.isRequired,
};


export default DashboardCardEntry;