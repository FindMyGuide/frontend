import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FestivalSearch } from 'api/recommend/Recommend';
import FestivalCard from 'components/Card/Recommend/FestivalCard';
import styles from './Recommend.module.css';
import SideBar from 'components/Recommend/SideBar';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';

function FestivalList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFestivalList() {
      const festivalList = await FestivalSearch();
      setList(festivalList);
      setLoading(false);
    }

    fetchFestivalList();
  }, []);

  const onDetailHandler = (id) => {
    navigate(`/recommend/festival/${id}`);
  };

  return (
    <div className={styles.background}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.title}>부산을 즐겨보세요</span>
          <SideBar />
        </header>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {list === undefined ? (
              <div className={styles.length} style={{ marginBottom: '35px' }}>
                # 총 <span className="color">0</span>개의 축제가 있습니다
              </div>
            ) : (
              <div className={styles.length} style={{ marginBottom: '35px' }}>
                # 총 <span className="color">{list.length}</span>개의 축제가 있습니다
              </div>
            )}
            <div className={styles.cardContainer}>
              {list?.map((festival, index) => (
                <div key={index} onClick={() => onDetailHandler(festival.id)} className={styles.cardItem}>
                  <FestivalCard festival={festival} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FestivalList;
