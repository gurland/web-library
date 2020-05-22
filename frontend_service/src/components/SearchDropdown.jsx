import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import PropTypes from 'prop-types';

function SearchDropdown({ placeholder, options, value, multiple, onChange, additionalProps }) {
  return (
    <Dropdown
      placeholder={placeholder}
      fluid
      search
      selection
      multiple={multiple}
      options={options}
      onChange={onChange}
      value={value}
      noResultsMessage="Немає результатів..."
      {...additionalProps}
    />
  );
}

SearchDropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  additionalProps: PropTypes.shape({}).isRequired,
}

SearchDropdown.defaultProps = {
  multiple: false,
}

export default SearchDropdown;