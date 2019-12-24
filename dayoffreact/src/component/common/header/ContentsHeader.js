/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './header.css';
export default class ContentsHeader extends Component {
  render() {
    const { title, contents } = this.props;
    return (
      <div className="ContentsHeader_box">
        <a className="ContentsHeader_aa">{title}</a> <span>{contents}</span>
      </div>
    )
  }
}
