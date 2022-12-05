import { Button, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cl from './AboutPage.module.css';
import gitIco from '../../assets/git.svg';
import mantine from '../../assets/mantine-ico.svg';
import react from '../../assets/react-ico.svg';
import ts from '../../assets/ts-ico.svg';
import redux from '../../assets/redux-ico.svg';
import i18 from '../../assets/i18-ico.svg';

const AboutPage = memo(() => {
  const { t } = useTranslation();

  return (
    <main className="main page-about animated-background animated-background--topLeft">
      <div className="container page-wrapper">
        <Title order={1} className={cl.pageTitle}>
          {t('About project')}
        </Title>
        <div className={cl.aboutList}>
          <div className={cl.aboutItem}>
            <div className={cl.aboutTitle}>
              Mrdoker1
              <a href="https://github.com/Mrdoker1/">
                <img src={gitIco} alt="GitHub Mrdoker1" />
              </a>
            </div>
            <div className={cl.respList}>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                uppercase
                radius={50}
              >
                Design
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                uppercase
                radius={50}
              >
                Api
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
                uppercase
                radius={50}
              >
                Features
              </Button>
            </div>
            <p className={cl.aboutDescr}>
              {t(
                'Made design, api requests, statistics, sprint game, made some typesetting and supervised the development'
              )}
            </p>
          </div>

          <div className={cl.aboutItem}>
            <div className={cl.aboutTitle}>
              GeoBo
              <a href="https://github.com/GeoBo/">
                <img src={gitIco} alt="GitHub GeoBo" />
              </a>
            </div>
            <div className={cl.respList}>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                uppercase
                radius={50}
              >
                Router
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                uppercase
                radius={50}
              >
                Api
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
                uppercase
                radius={50}
              >
                Features
              </Button>
            </div>
            <p className={cl.aboutDescr}>
              {t(
                'Authorization / registration module, Audio call game, statistics collection, routing, typing of studied words.'
              )}
            </p>
          </div>

          <div className={cl.aboutItem}>
            <div className={cl.aboutTitle}>
              Makrakvladislav
              <a href="https://github.com/makrakvladislav/">
                <img src={gitIco} alt="GitHub Makrakvladislav" />
              </a>
            </div>
            <div className={cl.respList}>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'grape', to: 'violet', deg: 105 }}
                uppercase
                radius={50}
              >
                Markup
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                uppercase
                radius={50}
              >
                Api
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
                uppercase
                radius={50}
              >
                Features
              </Button>
            </div>
            <p className={cl.aboutDescr}>
              {t(
                'Made the main page of the application, an electronic textbook, layout and adaptive.'
              )}
            </p>
          </div>
        </div>
        <div className={cl.techListWrapper}>
          <div className={cl.techTitle}>{t('Build with')}</div>
          <div className={cl.techList}>
            <img src={mantine} alt="Mantine" />
            <img src={react} alt="React" />
            <img src={ts} alt="TypeScript" />
            <img src={redux} alt="Redux" />
            <img src={i18} alt="I18n" />
          </div>
        </div>
      </div>
    </main>
  );
});

export default AboutPage;
