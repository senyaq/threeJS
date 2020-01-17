import React, { Fragment } from 'react'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: 75,
    paddingBottom: 5,
    paddingRight: 10,
  },
  body: {
    width: '100%',
    maxWidth: 333,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 180,
  },
  hr: {
    background: '#E0E4EE',
  },
  h6: {
    display: 'contents',
  },
}))
function LoginAndRegistrationLayout(props) {
  const classes = useStyles()
  return (
    <Fragment>
      <Grid container direction="row" alignItems="flex-end" justify="flex-end" className={classes.root}>
        <h3 className={classes.h6}>TeYamoYo Administration</h3>
        <img src={require('../static/admin.png')} alt="logo" width="68" />
      </Grid>
      <Divider />
      <Grid className={classes.body}>{props.children}</Grid>
    </Fragment>
  )
}

export default LoginAndRegistrationLayout
