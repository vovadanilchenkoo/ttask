import React, { useEffect } from 'react'
import './PropertyItem.sass'

const PropertyItem = props => {
  const handleSelect = (e, priority) => {
    props.modifyPrtopertiesList(e.target.value, priority)
    props.modifyAvailableList(e.target.value, priority)
  }

  useEffect(() => {
    props.modifyPriority(props.priority)
  }, [props.priority])

  return (
    <div className='property-item'>
      <span className='property-item__order-num'>{props.priority}</span>
      <select
        defaultValue='Choose your option'
        onChange={(e) => handleSelect(e, props.priority)} 
        className='property-item__select browser-default'
      >
        <option value='Choose your option' disabled>Choose your option</option>
        {
          props.list.map((prop, i) => (
            <option 
              key={i}
              value={prop.name}
              disabled={prop.disabled ? true: false} 
            >
              {prop.title}
            </option>
          ))
        }
      </select>
      <i 
        onClick={() => props.toggleOrder(props.priority)}
        className='material-icons'
      >
        sort
      </i>
      <i 
        onClick={() => props.removeProperty(props.priority)} 
        className='property-item__delete-icon material-icons'
      >
        delete
      </i>
    </div>
  )
}

export default PropertyItem