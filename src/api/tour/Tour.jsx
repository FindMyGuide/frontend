import { baseAxios } from '../Axios';

//투어 전체 목록 조회
export default async function TourAll() {
  try {
    const res = await baseAxios.get('tourProducts');
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//인기 투어 조회
export async function TourPopular() {
  try {
    const res = await baseAxios.get('tourProduct/top-10', {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//투어 상세 조회
export async function TourDetail(props) {
  try {
    const res = await baseAxios.get(`tourProduct/${props}`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//테마별 투어 목록 조회
export async function TourTheme(props) {
  try {
    const res = await baseAxios.get(`tour/${props}`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//투어 예약 확정
export async function TourReservation(props) {
  try {
    const res = await baseAxios.get(
      `tour/reservation`,
      {
        tour_id: props.tour_id,
        tour_date: props.tour_date,
        member_id: props.member_id
      },
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//투어 예약 취소
export async function TourCancel(props) {
  try {
    const res = await baseAxios.post(
      `mypage/tour/cancel/${props}`,
      {
        content: props.content
      },
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

// 투어 좋아요
export async function TourLike(id) {
  try {
    const res = await baseAxios.post(
      'tourProduct/like',
      { tourProductId: id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('accessToken')
        }
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

// 투어 좋아요 취소
export async function TourLikeCancel(id) {
  try {
    const res = await baseAxios.delete('tourProduct/delete-like', {
      data: { tourProductId: id },
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
