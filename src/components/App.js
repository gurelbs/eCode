import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import useLocalStorge from '../hooks/useLocalStorge'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import CodeIcon from '@material-ui/icons/Code'
import Link from '@material-ui/core/Link'

export default function App(props) {
	const [html, setHtml] = useLocalStorge('html', '')
	const [css, setCss] = useLocalStorge('css', '')
	const [js, setJs] = useLocalStorge('js', '')
	const [srcDoc, setSrcDoc] = useState('')

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(`
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Online Free Code Editor for HTML,CSS & JavaScript">
          <meta name="keywords" content="Online,Free,Code,Editor,HTML,Css,JavaScript">
          <meta name="author" content="Gurel Ben Shabat">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/atom-one-dark.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/atom-one-light.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/github.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs2015.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs2017.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs2019.min.css" />
        </head>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>`)
		}, 250)
		return () => clearTimeout(timeout)
	}, [html, css, js])

	const useStyles = makeStyles(theme => ({
		root: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
	}))

	function ScrollTop(props) {
		const { children, window } = props
		const classes = useStyles()
		const trigger = useScrollTrigger({
			target: window ? window() : undefined,
			disableHysteresis: true,
			threshold: 100,
		})

		const handleClick = event => {
			const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

			if (anchor) {
				anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		}

		return (
			<Zoom in={trigger}>
				<div onClick={handleClick} role='presentation' className={`${classes.root} back-to-top`}>
					{children}
				</div>
			</Zoom>
		)
	}

	ScrollTop.propTypes = {
		children: PropTypes.element.isRequired,
		window: PropTypes.func,
	}
	const preventDefault = event => event.preventDefault()
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar>
				<Toolbar>
					<CodeIcon />
					<Typography variant='h6' component='h3' className='logo'>
						<Link underline='none' href='/' onClick={preventDefault} color='inherit'>
							eCode
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar id='back-to-top-anchor' />
			<Container maxWidth='xl' className='container'>
				<div className='pane top-pane'>
					<Editor language='xml' displayName='HTML' value={html} onChange={setHtml} />
					<Editor language='css' displayName='CSS' value={css} onChange={setCss} />
					<Editor language='javascript' displayName='JS' value={js} onChange={setJs} />
				</div>
				<div className='pane'>
					<iframe
						srcDoc={srcDoc}
						title='output'
						sandbox='allow-scripts'
						frameBorder='0'
						width='100%'
						height='100%'
					/>
				</div>
			</Container>
			<ScrollTop {...props}>
				<Fab color='secondary' size='small' aria-label='scroll back to top'>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
			<div className='footer'>
				<p>
					Build with{' '}
					<span role='img' aria-label='heart'>
						❤️
					</span>{' '}
					by{' '}
					<a target='_blank' href='https://github.com/gurelbs'>
						Gurel Ben Shabat
					</a>
				</p>
			</div>
		</React.Fragment>
	)
}
