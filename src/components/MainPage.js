import React from 'react'

import { Table } from './Table'

import './MainPage.css'

const DEFAULT_PER_PAGE = 25 // [5, 10, 15, 25, 50, 100]

export class MainPage extends React.Component {

  state = {
    currentPageIndex: null,
    restaurants: [],
    numRowsPerPage: DEFAULT_PER_PAGE,
    city: '',
    pageHeight: 0,
    searchCityInputVal: ''
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', () => this.updateWindowDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateWindowDimensions());
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  async componentDidUpdate(){
    let { city, numRowsPerPage, currentPageIndex, actionType, numPages, searchCityInputVal, numRowsInputVal, totalEnties } = this.state
    switch (actionType) {
      case 'NEXT_PAGE': {
        if (currentPageIndex && numPages && currentPageIndex < numPages)
          currentPageIndex++
        break
      }
      case 'PREVIOUS_PAGE': { 
        if (currentPageIndex && numPages && currentPageIndex > 1)
          currentPageIndex--
        break
      }
      case 'SEARCH_CITY': {
        if (searchCityInputVal) {
          city = searchCityInputVal
          currentPageIndex = 1
        }
        break
      }
      case 'UPDATE_NUM_ROWS': {
        if (numRowsInputVal){
          numRowsPerPage = numRowsInputVal
          if (currentPageIndex*numRowsPerPage > totalEnties){
            let newNumPages = Math.floor(totalEnties / numRowsPerPage)
            if (totalEnties % numRowsPerPage){
              newNumPages++
            }
            currentPageIndex = newNumPages
          }
        }
        break
      }
      default: {
        break
      }
    }
    if (actionType) {
      const fetchRes = await fetch(`https://opentable.herokuapp.com/api/restaurants?per_page=${numRowsPerPage}&city=${city}&page=${currentPageIndex}`)
      const searchResult = await fetchRes.json()
      let newNumPages = Math.floor(searchResult['total_entries'] / numRowsPerPage)
      if (searchResult['total_entries'] % numRowsPerPage){
        newNumPages++
      }
      this.setState({ 
        totalEnties: searchResult['total_entries'], 
        restaurants: searchResult.restaurants, 
        numPages: newNumPages,
        currentPageIndex: searchResult['current_page'], 
        city, 
        numRowsPerPage, 
        actionType: null 
      })
    }

  }

  render(){
    const { restaurants, currentPageIndex, numPages, numRowsPerPage, searchCityInputVal } = this.state

    return (
      <div className='main-container' style={{ height: this.state.height}}>
        <div className='navbar'>
          Restaurant Finder
        </div>
        <div className='search-section'>
          <div className='search-text'>
            Search By City:
          </div>
          <input 
            className='city-text-input'
            placeholder='city name' 
            onChange={(e) => this.setState({ searchCityInputVal: e.target.value })}
            onKeyPress={(event) => event.key === 'Enter' ? this.setState({ actionType: 'SEARCH_CITY' }) : null} 
          />
          <button 
            disabled={!searchCityInputVal.length}
            className='search-button'
            onClick={() => this.setState({ actionType: 'SEARCH_CITY' })}
          >
            Search
          </button>
        </div>
        
        <Table restaurants={restaurants} currentPage={currentPageIndex} numRowsPerPage={numRowsPerPage} />
        <div className='bottom-section'>
          <div className='choose-num-rows-section'>
            <select className='choose-row-input' value={numRowsPerPage} onChange={(e) => this.setState({ numRowsInputVal: e.target.value, actionType: 'UPDATE_NUM_ROWS' })}>
              <option className='each-row-value five' value='5'>5</option>
              <option className='each-row-value ten' value='10'>10</option>
              <option className='each-row-value fifteen' value='15'>15</option>
              <option className='each-row-value twentyfive' value='25'>25</option>
              <option className='each-row-value fifty' value='50'>50</option>
              <option className='each-row-value hundred' value='100'>100</option>
            </select>
            <div className='num-rows-explainer-text'>
              entries per page
            </div>
          </div>
          <div className='page-control-section'>
            <button 
              disabled={currentPageIndex <= 1} 
              className='page-control-button prev'
              onClick={() => this.setState({ actionType: 'PREVIOUS_PAGE' })}
            >
              Prev
            </button>
            <button 
              disabled={numPages ? currentPageIndex >= numPages : true} 
              className='page-control-button next'
              onClick={() => this.setState({ actionType: 'NEXT_PAGE' })}
            >
              Next
            </button>
          </div>
          <div className='page-num-info'>
            Page {currentPageIndex || 0} of {numPages || 0}
          </div>
        </div>
      </div>
    )
  }
}
