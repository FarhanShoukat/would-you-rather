import React from 'react'
import PropTypes from 'prop-types'

const ResultRow = ({ text, isSelected, totalVoters, optionVoters }) => {
    const color = isSelected ? 'blue' : 'black'
    return (
        <div className='tweet' style={{flexDirection: 'column'}}>
            <h4 style={{fontWeight: isSelected ? '1000' : 'bold', color}}>{text}</h4>
            <p style={{color}}>
                {optionVoters} out of {totalVoters} voters{isSelected
                ? ' including you'
                : ''}
            </p>
        </div>
    )
}

ResultRow.propType = {
    text: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    totalVoters: PropTypes.number.isRequired,
    optionVoters: PropTypes.number.isRequired,
}

export default ResultRow