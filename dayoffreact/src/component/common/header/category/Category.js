import React, { Component } from 'react'
import './category.css';
export default class Category extends Component {
  render() {
    return (
      <div className='dropmenu'>
        <ul>
            <li className='category__item' src=''><a href>BEST</a>
            <ul>
            <li><a href>안녕1</a></li>
            <li><a href>안녕2</a></li>
            <li><a href>안녕3</a></li>
            </ul>
            </li>

            <li className='category__item' src=''><a href>OUTER</a>
            <ul>
            <li><a href>안녕1</a></li>
            <li><a href>안녕2</a></li>
            <li><a href>안녕3</a></li>
            </ul>
            </li>

            <li className='category__item' src=''><a href>TOP</a>
            <ul>
            <li><a href>안녕1</a></li>
            <li><a href>안녕2</a></li>
            <li><a href>안녕3</a></li>
            </ul>
            </li>

            <li className='category__item' src=''><a href>BOTTOM</a>
            <ul>
            <li><a href>안녕1</a></li>
            <li><a href>안녕2</a></li>
            <li><a href>안녕3</a></li>
            </ul>
            </li>

            <li className='category__item' src=''><a href>ACC</a>
            <ul>
            <li><a href>안녕1</a></li>
            <li><a href>안녕2</a></li>
            <li><a href>안녕3</a></li>
            </ul>
            </li>
            </ul>
      </div>
    )
  }
}
