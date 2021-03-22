import React, { useState } from 'react';
import {Box, GridList, GridListTile, Container, Button} from '@material-ui/core';
import './App.sass';

const Main = () => {
  const [names, setNames] = useState(null);

  const fetchData = async () => {
    const url = `https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json`;
    const settings = { method: "Get" };

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
          setNames(json.galleryImages);
        });
  };

  if (!names) { fetchData(); }

  return(
      <div className="gallery">
          <div className="gallery__header">
              <input></input>
              <button variant="contained" color="primary" component="span">
                  Upload
              </button>
          </div>
          <ul>
              {names &&
              names.map((tile) => (
                  <li>
                      <button onClick={e => e.target.parentNode.remove()}>X</button>
                      <img src={tile.url} alt={tile.width} />
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default Main;
