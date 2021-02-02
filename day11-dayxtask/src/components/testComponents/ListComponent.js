import React from 'react';
import ListOptionsComponent from './ListComponentOptions';
import PropTypes from 'prop-types';

function ListComponent(props){

    const {options} = props;

    if(!options.length) {
        return (
            <span className="empty">
              No Data to Show
            </span>
        );
    }
    return (
        <ol className="options">
          {
              options.map((option,idx)=>(
                <ListOptionsComponent key={idx} value={option}></ListOptionsComponent>
              ))
          }
        </ol>
    );
}



// defining the prop type of the type aray

ListComponent.propTypes = {
    options: PropTypes.array
};

// setting default values for options
ListComponent.defaultProps = {
    options: []
};


export default ListComponent;