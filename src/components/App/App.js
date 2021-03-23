import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import './App.sass';

const Main = () => {
  const [names, setNames] = useState(null);
  const [url, setUrl] = useState(null);

  if (!names) {
      const url = `https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json`;
      const settings = { method: "Get" };

      fetch(url, settings)
          .then(res => res.json())
          .then((json) => {
              setNames(json.galleryImages);
          });
  }

  const LoadList = ({ data }) => {
      console.log(data);
      return(
          <ul className="gallery-list">
              {data &&
              data.map((item) => (
                  <li className="gallery-list__item"
                      key={item.url.substring(63)}>
                      <button className="gallery-list__close"
                              onClick={e => e.target.parentNode.remove()}>X</button>
                      <img className="gallery-list__image"
                           src={item.url}
                           alt="Image"/>
                  </li>
              ))}
          </ul>
      );
  };

  const addItem = (source) => {
      const elem = [{
          'url': source,
          'height': 300,
          'width': 600
      }];
      setNames(elem.concat(names));
  };

  return(
      <div className="gallery">
          <div className="gallery-header">
              <TextField className="gallery-header__input"
                     id="standard-basic"
                     label="введите url-адрес изображения или json-файла"
                     onChange={e => setUrl(e.target.value)}/>
              <Button className="gallery-header__upload"
                      variant="contained"
                      color="primary"
                      component="span"
                      onClick={e => {
                          e.preventDefault();
                          addItem(url);
                      }}>Загрузить</Button>
          </div>
          <LoadList data={names}/>
      </div>
  );
};

export default Main;
