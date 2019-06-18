import React from 'react'

import './Table.css'

export class Table extends React.Component {

  render(){
    const { restaurants, currentPage, numRowsPerPage } = this.props
    return (
      <div className='table-container'  >
        <table className='table' tabIndex={0}>
          <thead className='table-header'>
            <tr className='table-header-row'>
              <th className='each-table-header number'>#</th>
              <th className='each-table-header name'>name</th>
              <th className='each-table-header address'>address</th>
              <th className='each-table-header price'>price</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {
              restaurants && restaurants.map((restaurant, index) => (
                <tr key={restaurant.id} className={`table-body-row ${index%2 ? 'even' : 'odd'}`}>
                  <td className='each-table-element'>{((currentPage-1)*numRowsPerPage)+index+1}</td>
                  <td className='each-table-element'>{restaurant.name}</td>
                  <td className='each-table-element'>{restaurant.address} - {restaurant.city} - {restaurant.country}</td>
                  <td className='each-table-element'>{Array(restaurant.price).fill(null).map((item, index) => <span key={index}>$</span>)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
