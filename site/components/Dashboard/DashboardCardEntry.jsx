import React from 'react';
import PropTypes from 'prop-types';

function DashboardCardEntry({TitleSize, EntryContent, bottomBorder}) {
    const basicClass = "truncate justify-center px-4 h-full text-center items-center font-bold text-normal border-black";

    const elements = EntryContent.map((content, idx) => {
        const classProp = `${typeof content === 'object' ? content.props.className : 'flex flex-col'} ${idx === 1 ? TitleSize : 'w-1/6'} ${basicClass} ${(idx + 1 < EntryContent.length) && 'border-r-2'}`;

        return (
            (typeof content === 'object') ?
            React.cloneElement(content, { className : classProp })
            : <h3 key={idx} className={classProp}>{content}</h3>
        );
    });

    return (
        <div className={`flex flex-row justify-center h-12 items-center ${bottomBorder && 'border-b-2'} border-black`}>
           {elements}
        </div>
    )
}
DashboardCardEntry.propTypes = {
    TitleSize: PropTypes.string.isRequired,
    EntryContent: PropTypes.array.isRequired,
    bottomBorder: PropTypes.bool,
};

DashboardCardEntry.defaultProps = {
    bottomBorder: true,
};


export default DashboardCardEntry;