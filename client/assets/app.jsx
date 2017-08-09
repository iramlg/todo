import React from 'react';
import { render } from 'react-dom';
import { SinglePageApp } from './components/singlePageApp.jsx';

render(
    <SinglePageApp name='crossWork' />
	, document.getElementById('reactDiv')
)
