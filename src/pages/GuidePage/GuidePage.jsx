import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './GuidePage.module.css';

import { Autocomplete, FormControl, FormControlLabel, Radio, RadioGroup, Slider, TextField } from '@mui/material';
import { GuideFilter, GuidePopular } from '../../api/guide/Guide';
import GuideCard from '../../components/PopularGuideCard/GuideCard';
import { FormLabel, Stack } from 'react-bootstrap';

const GuidePage = () => {
  const languageList = [
    { title: '전체', value: '' },
    { title: '한국어', value: 'KOREAN' },
    { title: '영어', value: 'ENGLISH' },
    { title: '스페인어', value: 'SPANISH' },
    { title: '일본어', value: 'JAPANESE' },
    { title: '중국어', value: 'CHINESE' },
    { title: '포루투갈어', value: 'PORTUGUESE' },
    { title: '프랑스어', value: 'FRENCH' },
    { title: '러시아어', value: 'RUSSIAN' },
    { title: '이탈리아어', value: 'ITALIAN' },
    { title: '독일어', value: 'GERMAN' }
  ];
  //가이드 검색
  const [ageValue, setAgeValue] = useState([30, 37]);
  const [gender, setGender] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(['KOREAN']);
  //검색 결과
  const [searchResult, serSearchResult] = useState([]);
  //인기 가이드
  const [popularGuide, setPopularGuide] = useState([]);

  useEffect(() => {
    GuidePopular()
      .then((getPopularGuideList) => {
        const popularGuideList = getPopularGuideList;
        setPopularGuide(popularGuideList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAge = (event, newValue) => {
    setAgeValue(newValue);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className="appGuide"></div>
        </>
      ) : (
        <>
          <div className="webGuide">
            <p>인기가이드</p>
            <div className={styles.famousGuide}>
              {popularGuide ? (
                popularGuide
                  .slice(0, 4)
                  .map((guide) => (
                    <GuideCard
                      key={parseInt(guide.guideId)}
                      guideId={guide?.guideId}
                      name={guide?.guideName}
                      tour={guide?.tourProductTitles[0]?.title}
                    ></GuideCard>
                  ))
              ) : (
                <></>
              )}
            </div>

            <div className={styles.guideSearchBox}>
              <div className={styles.SearchConditionBox}>
                <p>가이드검색</p>

                <FormControl sx={{ width: '100%' }}>
                  <FormLabel>성별</FormLabel>
                  <RadioGroup
                    row
                    defaultValue="all"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={handleGender}
                    sx={{
                      margin: 0,
                      padding: 2,
                      my: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio sx={{ margin: 0, padding: 0 }} />}
                      sx={{ border: '1px solid black' }}
                      label="전체"
                    />
                    <FormControlLabel
                      value="MALE"
                      control={<Radio sx={{ margin: 0, padding: 0 }} />}
                      sx={{ border: '1px solid black' }}
                      label="남성"
                    />
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio sx={{ margin: 0, padding: 0 }} />}
                      sx={{ border: '1px solid black' }}
                      label="여성"
                    />
                  </RadioGroup>
                </FormControl>

                <div>
                  <p>나이</p>
                  <Slider
                    getAriaLabel={() => 'Age range'}
                    value={ageValue}
                    onChange={handleAge}
                    min={20}
                    max={60}
                    valueLabelDisplay="auto"
                    // getAriaValueText={valuetext}
                  />
                </div>
                <div>
                  <p>언어</p>

                  <div>
                    <Stack spacing={3} sx={{ width: 1000 }}>
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        size="small"
                        options={languageList}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[languageList[1]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              placeholder: selectedLanguage.length > 0 ? '' : '언어 검색'
                            }}
                            size="small"
                          />
                        )}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        onChange={(event, value) => {
                          const selectedLanguageTitles = value.map((language) => language.value);
                          setSelectedLanguage(selectedLanguageTitles);
                        }}
                      />
                    </Stack>
                  </div>
                </div>
                <button
                  className={styles.serachbutton}
                  type="button"
                  onClick={() => {
                    GuideFilter({ gender: gender, age: ageValue, language: selectedLanguage })
                      .then((getSearchList) => {
                        const searchGuideList = getSearchList;
                        serSearchResult(searchGuideList);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                >
                  검색
                </button>
              </div>
              <div className={styles.resultSearchBox}>
                {searchResult?.length !== 0 ? (
                  <>
                    <p>검색결과</p>
                    <div className={styles.searchguides}>
                      {searchResult?.slice(0, 3).map((guide) => (
                        <GuideCard
                          className={styles.guidecard}
                          key={parseInt(guide.guideId)}
                          guideId={guide?.guideId}
                          name={guide?.guideName}
                          tour={guide?.tourProductTitles[0]?.title}
                        ></GuideCard>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>검색을 이용해 주세요</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GuidePage;
