import React from 'react';
import ReactDOM from 'react-dom';
import {MainNav} from './MainNav.js';
import {AsideNav} from './AsideNav.js';
import {Main} from './Main.js';
import {Footer} from './Footer.js';
import {Content} from './Content.js';

export class App extends React.Component {
	render () {
		return (
      <div>
				<Content/>
      </div>
		)
	}

}
