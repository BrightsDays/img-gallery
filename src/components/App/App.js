import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import './App.sass';

const Main = () => {
  const [names, setNames] = useState(null);
  const [url, setUrl] = useState(null);

  const LoadList = ({ data }) => {
      return(
          <ul className="gallery-list">
              {data &&
              data.map((item, index) => (
                  <li className="gallery-list__item"
                      key={index}>
                      <button className="gallery-list__close"
                              onClick={() => setNames(names.filter(item => item !== names[index]))}>X</button>
                      <img className="gallery-list__image gallery-list__image--poly"
                           src={item.url}
                           alt="Image"/>
                  </li>
              ))}
          </ul>
      );
  };

  const addItems = source => {
      if (source && source.match(/\.(jpe?g|png|gif|bmp)$/i)) {
          const img = new Image();
          img.src = source;
          img.onload = () => {
              !names ?
              setNames([{'url': source}]) :
              setNames([{'url': source}].concat(names));
          };
      } else if (source && source.match(/\.(json)$/i)) {
          const settings = { method: "Get" };

          fetch(source, settings)
              .then(res => res.json())
              .then((json) => {
                  !names ?
                  setNames(json.galleryImages) :
                  setNames((json.galleryImages).concat(names));
              });
      }
  };

  const onDrop = e => {
      let files = e.target.files;
      let reader = new FileReader();

      reader.onload = r => {
          !names ?
          setNames([{'url': r.target.result}]) :
          setNames([{'url': r.target.result}].concat(names))
          r.target.value = '';
      };

      if (files[0]) {
          reader.readAsDataURL(files[0]);
      }
  }

  if (!names) addItems('https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json');

  return(
      <div className="gallery">
          <div className="gallery-header">
              <TextField className="gallery-header__input"
                     id="standard-basic"
                     label="?????????????? url-?????????? ??????????"
                     onChange={e => setUrl(e.target.value)}/>
              <Button className="gallery-header__upload"
                      variant="contained"
                      color="primary"
                      component="span"
                      onClick={e => {
                          e.preventDefault();
                          addItems(url);
                      }}>??????????????????</Button>
          </div>
          <div className="gallery-drop">
              <p className="gallery-drop__info">?????? ???????????????????? ???????? ????????</p>
              <input className="gallery-drop__input"
                     type="file"
                     onChange={e => onDrop(e)} />
          </div>
          <LoadList data={names}/>
      </div>
  );
};

export default Main;
