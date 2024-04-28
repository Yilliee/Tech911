import PropTypes from 'prop-types'; 

function DashboardCardHeading({TitleSize, Headings}) {
    const headerClass = "flex flex-col truncate justify-center px-4 h-full text-center font-bold text-xl border-white";

    const elements = Headings.map((content, idx) => {
        return (
            <h3 key={idx} className={`${content === 'Title' ? TitleSize : 'w-1/6'} ${headerClass} ${idx + 1 < Headings.length && 'border-r-2'}`}>{content}</h3>
        );
    });

    return (
        <div className="flex flex-row justify-center h-12 items-center border-b-2 ">
            {elements}
        </div>
    )
}
DashboardCardHeading.propTypes = {
    TitleSize: PropTypes.string.isRequired,
    Headings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DashboardCardHeading;