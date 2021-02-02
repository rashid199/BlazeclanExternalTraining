import React from 'react';
import PropTypes from 'prop-types';
function ListOptionsComponent(props){
    const {value} = props;
    return (
        <li className={value}>{value}</li>
    );
}

// define props with its data types
ListOptionsComponent.propTypes = {
    value: PropTypes.string
};

export default ListOptionsComponent;