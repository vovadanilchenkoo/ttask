import React, { useState, useEffect } from 'react'
import './PropertiesList.sass'

import PropertyItem from '../PropertyItem/PropertyItem'

const PropertiesList = props => {
  const [propertiesList, setPropertiesList] = useState([])
  const [availableSelectItems, setAvailableSelectItems] = useState([])

  useEffect(() => {
    const newList = []
    props.data.map(prop => {
      const newObj = {
        ...prop,
        disabled: false
      }
      newList.push(newObj)
    })
    setAvailableSelectItems(newList)
  }, [])

  const modifyPriority = priority => {
    // set "priority" to specific object of "propertiesList"
    const properties = propertiesList
    properties[priority - 1].priority = priority
    setPropertiesList(properties)
  }

  const modifyPrtopertiesList = (title, priority) => {
    // set "title" to specific object of "propertiesList"
    const properties = propertiesList
    properties[priority - 1].property = title
    setPropertiesList(properties)
  }

  const modifyAvailableList = title => {
    // toggle "disabled" property to specific object "propertiesList"
    const list = availableSelectItems
    const newList = list.map(prop => prop.name === title ? {...prop, disabled: true} : prop)
    setAvailableSelectItems(newList)
  }

  const addProperty = () => {
    const property = {
      id: new Date().getTime(),
      priority: null, 
      property: null,
      order: 'ASC'
    }
    setPropertiesList(state => [...state, property])
  }

  const togglePropertyOrder = elementIndex => {
    const list = [...propertiesList]
    const currentObj = list[elementIndex - 1]
    currentObj.order === 'ASC' ? 
      currentObj.order = 'DESC' : 
      currentObj.order = 'ASC'
    setPropertiesList(list)
  }

  const removeProperty = order => {
    const index = order - 1
    const list = [...propertiesList]
    list.splice(index, 1)
    setPropertiesList(list)
  }

  const sendData = () => {
    fetch('http://test.com/properties', {
      method: 'POST',
      body: JSON.stringify(propertiesList)
    })
  }

  return (
    <>
      <header className='list-header'>
        <span className='list-header__col-name'>Properties</span>
        <span className='list-header__col-name'>Order</span>
      </header>
      <div className='properties-list'>
        {
          propertiesList.map((prop, i) => (
            <PropertyItem 
              key={prop.id} 
              priority={i + 1} 
              modifyPriority={modifyPriority}
              list={availableSelectItems}
              removeProperty={removeProperty}
              toggleOrder={togglePropertyOrder}
              modifyAvailableList={modifyAvailableList}
              modifyPrtopertiesList={modifyPrtopertiesList}
            />
          ))
        }
        <button 
          type='button'
          onClick={addProperty}
          className='properties-list__add-property waves-effect blue darken-1 btn'
        >
          <i className="material-icons">add</i>
          Add proplerty
        </button>
      </div>
      <button 
        type='button'
        onClick={sendData} 
        className='waves-effect waves-light btn'
      >
        Sort
      </button>
    </>
  )
}

export default PropertiesList