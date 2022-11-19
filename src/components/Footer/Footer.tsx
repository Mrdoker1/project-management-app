import React from 'react';
import { memo } from 'react';
import cl from './Footer.module.css';
import rsLogo from '../../assets/rs-logo.svg';

const AppRouter = memo(() => {
  return (
    <footer className={cl.footer}>
      <div className="container">
        <div className={cl.footerTop}>
          <a href="https://rs.school/">
            <img src={rsLogo} className={cl.logo} alt="RSschool" />
          </a>
          <ul className={cl.list}>
            <li>
              <a href="https://github.com/GeoBo/">GeoBo</a>
            </li>
            <li>
              <a href="https://github.com/Mrdoker1/">Mrdoker1</a>
            </li>
            <li>
              <a href="https://github.com/makrakvladislav/">makrakvladislav</a>
            </li>
          </ul>
        </div>
        <div className={cl.footerCopyright}>
          © 2022. <a href="https://rs.school/react/">React 2022Q1</a>
        </div>
      </div>
    </footer>
  );
});

export default AppRouter;
