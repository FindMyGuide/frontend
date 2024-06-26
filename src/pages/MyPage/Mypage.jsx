import { React, useState } from "react";
import styled from "styled-components";
import Left from "./MyPageLeft";
import MemberMenu from "./MemberMenu";
import GuideMenu from "./GuideMenu";

// 전체
const MyPage = styled.div`
  display: flex;
  height: 60rem;
  width: 100%;
  padding-top: 50px;
`;

// 오른쪽
const MypageRight = styled.div`
  flex: 7.5;
`;

const ModeButton = styled.button`
  width: 8rem;
  height: 3rem;
  border-width: ${(props) =>
    props.selected ? "0px 0px 4px 0px;" : "0px 0px 1px 0px;"};
  border-style: solid;
  border-radius: 10px;
  /* 배경색이 props에 따라 변경되도록 설정 */
  background-color: ${(props) => (props.selected ? "white" : "#e7e7e7")};
  border-color: ${(props) => (props.selected ? "#31b6f4" : "#e7e7e7")};
  color: ${(props) => (props.selected ? "#31b6f4" : "black")};
  font-weight: ${(props) => (props.selected ? "bold" : "none")};
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18rem;
  height: 3.5rem;
  background-color: #e7e7e7;
  gap: 10px;
  border-radius: 10px;
  margin-left: 60px;
  box-shadow: 0px 0px 5px #a2a2a2;
`;

const PageRightBody = styled.div``;

// 오른쪽
function Right() {
  const [mode, setMode] = useState("member");

  return (
    <MypageRight>
      <ButtonBox>
        <ModeButton
          selected={mode === "member"}
          onClick={() => setMode("member")}
        >
          회원
        </ModeButton>
        <ModeButton
          selected={mode === "guide"}
          onClick={() => setMode("guide")}
        >
          가이드
        </ModeButton>
      </ButtonBox>
      <PageRightBody>
        {mode === "member" ? <MemberMenu /> : <GuideMenu />}
      </PageRightBody>
    </MypageRight>
  );
}

function Mypage() {
  return (
    <MyPage>
      <Left />
      <Right />
    </MyPage>
  );
}

export default Mypage;
