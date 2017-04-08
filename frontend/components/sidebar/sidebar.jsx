import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import CategoriesToCalc from './categories_to_calc';
import CategoriesToChoose from './categories_to_choose';
import Box from './box';

export default class SideBar extends Component {
  constructor(props){
    super(props);
    this.state =({
      chooseBin: ['Crime', 'Transit', 'Restaurant'],
      calcBin: [],
      open: true
    });
  }

  render() {
    const sidebarStyle = () => {
      if (this.state.open) {
        return { width: 300 + 'px' };
      } else {
        return { width: 0 };
      }
    };

    return (
      <div className="sidebar-container">
        <Button
          className="sidebar-button"
          onClick={ () => this.setState({ open: !this.state.open }) }>
          <Glyphicon glyph={`chevron-${this.state.open ? 'right' : 'left'}`} />
        </Button>
        <div className="sidebar" style={ sidebarStyle() }>
          <div className="drag-area-container">
            <CategoriesToCalc
              allowedDropEffect="move"
              updateRank={this.props.updateRank} />
            <CategoriesToChoose
              allowedDropEffect="move"/>
          </div>
        </div>
      </div>
    );
  }
}
