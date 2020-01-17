import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import withAuth from './../lib//withAuth'

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.link.color,
  },
}))

function About() {
  const classes = useStyles()
  return (
    <>
      <h1>Header menu</h1>
      <Link className={classes.link} to="/">
        home_
      </Link>
      <Link className={classes.link} to="/about">
        _about
      </Link>
      <Link className={classes.link} to="/sign_in">
        _sign_in
      </Link>
      <h1>About</h1>
    </>
  )
}

export default withAuth(About)
