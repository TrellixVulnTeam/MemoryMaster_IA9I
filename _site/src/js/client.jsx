import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Memory from "./Memory/Memory";

import "../scss/main.scss";

const Hot = hot(Memory);

ReactDom.render(<Hot />, document.querySelector('#root'));
