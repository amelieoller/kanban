import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

import useOnClickOutside from '_hooks/useOnClickOutside';

const CategorySelect = ({ onChange, currentCategoryId }) => {
  const colorRef = useRef();

  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');

  useOnClickOutside(colorRef, () => setIsCategoryPickerOpen(false));

  const { categories } = useSelector(R.pick(['categories']));

  useEffect(() => {
    if (categories) {
      const cat = categories.find((c) => c.id === currentCategoryId);

      setCurrentCategory(cat);
    }
  }, [categories, currentCategoryId]);

  const handleChangeComplete = (newCategoryId) => {
    setIsCategoryPickerOpen(false);

    if (currentCategoryId !== newCategoryId) {
      onChange(newCategoryId);
    }
  };

  return (
    <CategorySelectWrapper>
      <CategoryOption
        color={currentCategory && currentCategory.color}
        onClick={() => setIsCategoryPickerOpen((prevState) => !prevState)}
        isInPicker={false}
      >
        {currentCategory && currentCategory.title[0]}
      </CategoryOption>

      {isCategoryPickerOpen && (
        <CategoryOptions ref={colorRef}>
          <>
            <CategoryOption
              value=""
              onClick={() => handleChangeComplete('')}
              isEmpty
              isInPicker
            ></CategoryOption>

            {categories.map((c) => (
              <CategoryOption
                color={c.color}
                key={c.id}
                value={c.id}
                onClick={() => handleChangeComplete(c.id)}
                isInPicker
              >
                {c.title[0]}
              </CategoryOption>
            ))}
          </>
        </CategoryOptions>
      )}
    </CategorySelectWrapper>
  );
};

const CategorySelectWrapper = styled.div`
  position: relative;
`;

const CategoryOptions = styled.div`
  position: absolute;
  top: 45px;
  padding: 15px 9px 9px 15px;
  width: auto;
  background: rgb(255, 255, 255);
  border: 0px solid rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px;
  border-radius: 4px;
  display: flex;
  right: 0;

  & > * {
    margin: 0px 6px 6px 0px;
  }
`;

const CategoryOption = styled.div`
  cursor: pointer;
  background: ${({ color }) => (color ? color : 'white')};
  height: ${({ isInPicker }) => (isInPicker ? '30px' : '28px')};
  width: ${({ isInPicker }) => (isInPicker ? '30px' : '28px')};
  cursor: pointer;
  position: relative;
  outline: none;
  float: left;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  border: ${({ isEmpty }) => isEmpty && '#6100ee 2px solid'};
`;

CategorySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentCategoryId: PropTypes.string,
};

CategorySelect.defaultProps = {
  currentCategoryId: '',
};

export default CategorySelect;
