import { Button } from '@mantine/core';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { actionType, setModalState, setModalType } from 'store/boardsSlice';
import { useAppDispatch } from 'hooks/redux';
import cl from './HomePage.module.css';
import feature1 from '../../assets/feature1.svg';
import feature2 from '../../assets/feature2.svg';
import feature3 from '../../assets/feature3.svg';
import checkIco from '../../assets/check-ico.svg';
import img1 from '../../assets/main-page-img1.svg';
import img2 from '../../assets/main-page-img2.svg';
import img3 from '../../assets/main-page-img3.svg';

const HomePage = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createBoard = useCallback(() => {
    navigate('/projects');
    dispatch(setModalType(actionType.Create));
    dispatch(setModalState(true));
  }, []);

  return (
    <>
      <main className="main">
        <section className={cl.splash}>
          <div className="container">
            <h3 className={cl.subtitle}>{t('Project Management App')}</h3>
            <h2 className={cl.title}>{t('Colaborate and build faster, together.')}</h2>
            <p className={cl.description}>
              {t(
                'Create, share, and get feedback with collaborative boards for rapid development.'
              )}
            </p>

            <Button
              onClick={createBoard}
              className="button"
              color="cyan"
              radius={8}
              sx={{ height: 36 }}
              styles={(theme) => ({
                root: {
                  fontSize: '18px',
                  lineHeight: '155%',
                  position: 'relative',
                  zIndex: 10,
                },
              })}
            >
              {t('Create Kanban Board')}
            </Button>
          </div>
        </section>
        <div className="container">
          <section className={cl.features}>
            <div className={`${cl.feature} ${cl.gradientBorder}`}>
              <img src={feature1} />
              <h4 className={cl.featureTitle}>{t('Integrate')}</h4>
              <p className={cl.featureDescription}>
                {t('The ability to quickly set up and customize workflows for just about anything')}
              </p>
            </div>
            <div className={`${cl.feature} ${cl.gradientBorder}`}>
              <img src={feature2} />
              <h4 className={cl.featureTitle}>{t('Colaborate')}</h4>
              <p className={cl.featureDescription}>
                {t('Manage projects, organize tasks, and build team spirit—all in one place')}
              </p>
            </div>
            <div className={`${cl.feature} ${cl.gradientBorder}`}>
              <img src={feature3} />
              <h4 className={cl.featureTitle}>{t('Succeed')}</h4>
              <p className={cl.featureDescription}>
                {t(
                  'Every single part of your task can be managed, tracked, and shared with teammates'
                )}
              </p>
            </div>
          </section>
          <section className={cl.mainPageText}>
            <div className={cl.textWrapper}>
              <div className={cl.textSubTitle}>
                <img src={checkIco} />
                {t('Universal')}
              </div>
              <h3>{t('Build the workflow you want')}</h3>
              <p>
                {t('Manage your boards using Drag-n-Drop, create adittional boards and tasks.')}
              </p>
            </div>
            <img src={img1} className={cl.textImg} />
          </section>
          <section className={cl.mainPageText}>
            <img src={img2} className={cl.textImg} />
            <div className={cl.textWrapper}>
              <div className={cl.textSubTitle}>
                <img src={checkIco} />
                {t('Optimized')}
              </div>
              <h3>{t('Everything you need in one place')}</h3>
              <p>{t('You can specify additional info in task description and assign users')}</p>
            </div>
          </section>
          <section className={cl.mainPageText}>
            <div className={cl.textWrapper}>
              <div className={cl.textSubTitle}>
                <img src={checkIco} />
                {t('Unlimited')}
              </div>
              <h3>{t('No limits for all users')}</h3>
              <p>{t('Unlimited kanban boards, columns and tasks')}</p>
            </div>
            <img src={img3} className={cl.textImg} />
          </section>
        </div>
      </main>
    </>
  );
});

export default HomePage;
