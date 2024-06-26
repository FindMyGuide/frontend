import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LanguageIcon from "@mui/icons-material/Language";
import NoImage from "asset/images/NoImage2.png";
import { TourLike, TourLikeCancel } from "api/tour/Tour";

function Card({ tour }) {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("accessToken");
  const [likes, setLikes] = useState(parseInt(tour.likes));
  const [isLiked, setIsLiked] = useState(tour.likeExist);

  const onClickHandler = (id) => {
    navigate(`/tour/tourdetail/${id}`);
  };

  const onLikeHandler = (tourId) => {
    if (isLoggedIn) {
      if (isLiked) {
        TourLikeCancel(tourId);
        setLikes(likes - 1);
      } else {
        TourLike(tourId);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } else {
      if (window.confirm("로그인이 필요한 기능입니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    }
  };

  return (
    <div
      className={styles.card}
      onClick={() => onClickHandler(tour.tourProductId)}
    >
      <div style={{ padding: "10px" }}>
        <div className={styles.content}>
          <div>
            <img
              src={tour.bestImage ? tour.bestImage : NoImage}
              alt="img"
              className={styles.mainImg}
            />
          </div>
          <div>
            <FavoriteRoundedIcon
              className={styles.like}
              style={{ fill: isLiked ? "#FF6073" : "#FFFFFF" }}
              onClick={(e) => {
                e.stopPropagation();
                onLikeHandler(tour.tourProductId);
              }}
            />
          </div>
        </div>
        <div className={styles.title}>{tour.title}</div>
        <div style={{ fontSize: "15px" }}>
          {tour.themes ? (
            <div>
              {tour.themes.map((theme, index) => (
                <div key={index} className={styles.theme}>
                  #{theme}&nbsp;
                </div>
              ))}
            </div>
          ) : null}
          <div style={{ color: "#8D8D8D" }}>
            <LanguageIcon style={{ fill: "#8D8D8D", marginRight: "3px" }} />
            {tour.languages && tour.languages.length > 2 ? (
              <>
                {tour.languages.slice(0, 2).join(", ")} (+
                {tour.languages.length - 2})
              </>
            ) : tour.languages && tour.languages.length === 2 ? (
              tour.languages.join(", ")
            ) : null}
          </div>
          <div>
            <FavoriteRoundedIcon
              style={{ fill: "#FF6073", marginRight: "3px" }}
            />
            {likes}
          </div>
          <div style={{ textAlign: "end" }}>
            ￦&nbsp;{tour.price && tour.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
