// src/pages/entry/Options.jsx
import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOption from './ScoopOption'
import Row from 'react-bootstrap/Row'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${optionType}`)
      .then((response) => {
        console.log('Data fetched:', response.data)
        setItems(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [optionType])

  const itemComponent = optionType === 'scoops' ? ScoopOption : null

  console.log('LOOK HERE:', itemComponent)

  const optionItems = items.map(
    (item) =>
      itemComponent && (
        <itemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      )
  )

  return <Row>{optionItems}</Row>
}
