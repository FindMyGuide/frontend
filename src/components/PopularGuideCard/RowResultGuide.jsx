import React from 'react';
import styles from './RowResultGuide.module.css';
import { useNavigate } from 'react-router-dom';

import profileImg from 'asset/images/emptyprofile.png';

const RowResultGuideCard = ({ guideId, name, tour, imageLink }) => {
  const movePage = useNavigate();

  const id = guideId;
  function goToDetailPage() {
    movePage(`/guide/detail/${id}`);
  }
  return (
    <>
      <div className={styles.guideBox} onClick={goToDetailPage}>
        <div style={{ display: 'flex' }}>
          <h4 style={{ marginTop: '10px', marginLeft: '10px' }}>{name}</h4>
          <img
            style={{
              width: '120px',
              position: 'absolute',
              right: '0',
              top: '-60px'
            }}
            src={imageLink !== '' ? imageLink : profileImg}
            alt=""
          />
        </div>
        <p style={{ marginBottom: '0', marginTop: '10px', marginLeft: '10px' }}>가능언어</p>
        <p style={{ marginLeft: '10px' }}>{tour}</p>
      </div>
    </>
  );
};

export default RowResultGuideCard;