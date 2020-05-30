import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { attemptAddCategory } from '_thunks/categories';
import Input from '_atoms/Input';
import Button from '_atoms/Button';
import ColorDropdown from '../ColorDropdown';

function AddCategory({ boardId }) {
  const dispatch = useDispatch();

  const initialCategory = { title: '', color: '#FF6900' };

  const [newCategory, setNewCategory] = useState(initialCategory);

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (newCategory.title) {
      setNewCategory(initialCategory);

      dispatch(
        attemptAddCategory({
          ...newCategory,
          board: boardId,
        }),
      );
    }
  };

  const updateColor = (color) => {
    setNewCategory({ ...newCategory, color });
  };

  const handleOnBlur = (modelAttribute, value) => {
    setNewCategory({ ...newCategory, [modelAttribute]: value });
  };

  return (
    <Form onSubmit={handleAddCategory}>
      <NewCategoryWrapper>
        <Input
          label="New Category"
          handleOnBlur={(value) => handleOnBlur('title', value)}
          defaultValue={newCategory.title}
        />

        <ColorDropdown onChange={updateColor} currentColor={newCategory.color} />
      </NewCategoryWrapper>

      <Button onClick={handleAddCategory}>
        <span>Create Category</span>
      </Button>
    </Form>
  );
}

const Form = styled.form`
  margin: ${({ theme }) => theme.sizes.spacingLarge} 0;
`;

const NewCategoryWrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: ${({ theme }) => theme.sizes.spacing};
`;

AddCategory.propTypes = {
  boardId: PropTypes.string.isRequired,
};

export default AddCategory;
