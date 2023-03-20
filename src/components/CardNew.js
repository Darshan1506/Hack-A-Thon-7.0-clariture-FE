import React from 'react'
import "./CardNew.css"
const CardNew = (props) => {
  console.log(props.name)
  return (
    <div class="cardNew text-center">
    <h2>{props.name}</h2>
</div>
  )
}

export default CardNew