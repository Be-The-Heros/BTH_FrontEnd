import React from 'react';
import Style from './style';
import {
  FcAbout,
  FcDocument,
  FcHome,
  FcOrganization,
  FcRules,
  FcViewDetails,
} from 'react-icons/fc';
import { Link } from 'react-router-dom';
export const SidebarLeft = () => {
  return (
    <Style>
      <div>
        <Link to='/' className='home'>
          <FcHome
            style={{ fontSize: '2rem', marginTop: '-5px', marginRight: '10px' }}
          ></FcHome>
          Home
        </Link>
        <Link to='/'>
          <FcOrganization
            style={{ fontSize: '2rem', marginTop: '-5px', marginRight: '10px' }}
          />
          Orgnization
        </Link>
        <Link to='/'>
          <FcAbout style={{ fontSize: '2rem', marginRight: '10px' }} /> About
        </Link>
      </div>
      <div>
        <h4>Orther</h4>
        <Link to=''>
          <FcRules style={{ fontSize: '2rem', marginRight: '10px' }} />{' '}
          Privacy policy
        </Link>
        <Link to='/'>
          <FcDocument style={{ fontSize: '2rem', marginRight: '10px' }} /> Term
          of use
        </Link>
      </div>
    </Style>
  );
};
