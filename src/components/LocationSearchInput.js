import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
//import './LocationSearchInput.css';

export default function LocationSearchInput(props) {
    const [address, setAddress] = useState('');

    const handleChange = address => {
        setAddress(address);
    };

    const handleSelect = address => {
        setAddress(address);
        // Pull in the setFormLocation function from the parent ReportForm

        geocodeByAddress(address)
            .then(function (results) {
                // Set the location in the parent ReportFrom
                props.setFormLocation(results[0].formatted_address)
            })
            .catch(error => console.error('Error', error))
    };

    const renderInput = ({getInputProps, getSuggestionItemProps, suggestions}) => (
        <div className="autocomplete-root">
            <input className="form-control" {...getInputProps()} />
            <div className="autocomplete-dropdown-container">
                {
                    suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? {backgroundColor: '#f1f1f1', cursor: 'pointer', padding: '0.25em 0.7em'}
                                : {backgroundColor: '#ffffff', cursor: 'pointer', padding: '0.25em 0.7em'};
                            return (
                                <div {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                })}>
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        }
                    )
                }
            </div>
        </div>
    );

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                // Pass the search options prop
            >
                {renderInput}
            </PlacesAutocomplete>
        </div>
    );

}