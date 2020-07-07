const SelectStyles = {            
    control: (styles, state) => ({ 
        ...styles, 
        backgroundColor: 'white',                
        fontSize: '.8125rem',
        lineHeight: '1.5',
        height: '35px',
        borderRadius: '.25rem',
        border: state.isFocused ? '1px solid var(--primary)!important' : '1px solid #ced4da',        
        boxShadow: state.isFocused ? '0 0.313rem 0.719rem rgba(0,123,255,.1), 0 0.156rem 0.125rem rgba(0,0,0,.06)' : 'none',
    }),          
    option: (styles, { isDisabled, isSelected, isFocused }) => ({                                        
        ...styles,
        backgroundColor: 
        isDisabled ? null
            : isSelected ? 'var(--primary)'
                : isFocused ? 'var(--primary)'
                    : 'white',                                        
        color: 
        isDisabled ? null
            : isSelected ? 'white'
                : isFocused ? 'white'
                    : 'black',
    }),
    multiValue: (styles) => ({
        ...styles,
        backgroundColor: 'var(--primary)',
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: 'white',        
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        color: 'white',
    }),
    menu: (styles) => ({
        ...styles,
        fontSize: '15px',
        lineHeight: '1.5',
        borderRadius: '2px',
        margin: '4px 0px 0px',
        zIndex: 999
    }),  
    menuList  : (styles) => ({
        ...styles,
        maxHeight: '150px'
    }),  
}

export default SelectStyles;