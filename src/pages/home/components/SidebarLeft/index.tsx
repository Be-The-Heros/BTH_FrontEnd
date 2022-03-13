import { Button } from 'antd';
import React from 'react';
import { AiFillFlag, AiOutlineBook, AiOutlineExclamationCircle, AiOutlineFileProtect, AiTwotoneHome } from 'react-icons/ai';

import Style from './style'
export const SidebarLeft = () => {
  return (
    <Style>
      <div>
      <a href='#' className='home'>
        <AiTwotoneHome style={{ fontSize: '180%'}}></AiTwotoneHome>
        Home
      </a>
      <a href='#'>
        <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width="25" height="20" fill="url(#pattern0)"/>
          <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_3_163" transform="translate(0.0671642) scale(0.00961857 0.0111111)"/>
          </pattern>
          <image id="image0_3_163" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAABsUlEQVR4nO3czUrDQBiF4dciQgUvwDuuW3+g696b1ZW6EJfqwi60EIOdmZOJfR/4dmHSHMa0OUhAkiRJkvSrM+AK2AIfleYeWO3W1s6KegHvzyp4Hd2ruZP35yF4HZM6B+6AF9qFeeg8A7fAstnVB62ZPtCxWTe7+p2TxusvgFf63zFvwAXw3uoEi1YL66fWQb8Dm8bnqGFDw92csgRu+PrimfpevD9PwDX939okSZJCeu4xak0XfcgceoxaU9SHlHQdc+kxainqQ+w6QkqCnkuPUcukfUjPPUatqdKH1OyjPyqu1ZMqGXmPDjHokNPAOYb+9IZuNb0dX4U7OsSgQww6xKBDDDrEB5ZxPrDMiUGHGHSIQYcYdIhdx/jxVbijQww6xKBDDDrEoEPsOsbZdcyJQYcYdIhBhxh0iF3H+PFVuKNDDDrEoEMMOsSgQ0qD/v52ryFD/0k/l+O7eNtYy7d79TZFbxsrbaa2wGXhGnPxSMG1lgb9X6vRIQfn5ZdhiEGHzKnr+Cu7jmNk0CEGHWLQIQYdkvjV0dtDzSSfxx0dYtAhBh1i0CEGLUmSJEnH7hPWtODWFjNuKwAAAABJRU5ErkJggg=="/>
          </defs>
        </svg>
        Orgnization
      </a>
      <a href='#'>
      <AiOutlineExclamationCircle style={{ fontSize: '180%'}}/>

      About
      </a>
      </div>
      <div>
        <h4>Orther</h4>
        <a>
        <AiOutlineFileProtect style={{fontSize: '180%'}}/> Privacy policy
        </a>
        <a href="#">
          <AiOutlineBook style={{fontSize: '180%'}}/> Term of use
        </a>
      </div>
    </Style>
  );
};
