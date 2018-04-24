/* eslint-disable max-len */
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { autobind } from 'core-decorators'
import styles from './styles.scss'

@autobind
export default class Home extends Component {
  render() {
    const { close, sideNavWidth } = this.props

    return (
      <div className={styles['wrapper']} style={{ width: sideNavWidth }} >
        <a href="#" className={styles['close-btn']} onClick={close} >&times;</a>
        <NavLink
          exact
          to="/About"
          className={styles['nav-item']}
          activeClassName={styles['active']}
        >
          <span>About</span>
        </NavLink>
        <NavLink
          exact
          to="/Services"
          className={styles['nav-item']}
          activeClassName={styles['active']}
        >
          <span>Services</span>
        </NavLink>
        <NavLink
          exact
          to="/Clients"
          className={styles['nav-item']}
          activeClassName={styles['active']}
        >
          <span>Clients</span>
        </NavLink>
        <NavLink
          exact
          to="/Contact"
          className={styles['nav-item']}
          activeClassName={styles['active']}
        >
          <span>Contact</span>
        </NavLink>
      </div>
    )
  }
}
