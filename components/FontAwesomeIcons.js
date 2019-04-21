import React from 'react';
import { Icon } from 'expo';

export default class FA_Icon extends React.Component {
  render() {
    return (
        <Icon.FontAwesome
            name={this.props.name} 
            size={32} 
        />
    )
  }
}