import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

import ChevronLeft from '_assets/icons/chevrons-left.svg';
import ChevronRight from '_assets/icons/chevrons-right.svg';
import { attemptUpdateBoard } from '_thunks/boards';
import Pomodoro from '_templates/Pomodoro';
import { sortItemsByOrder } from '_utils/sorting';

function Sidebar({ isSidebarOpen, currentBoard }) {
  const dispatch = useDispatch();

  const [currentTodos, setCurrentTodos] = useState(null);

  const { todos } = useSelector(R.pick(['todos']));

  useEffect(() => {
    if (currentBoard.defaultFocusList && todos.length !== 0) {
      // find default focus list, then the first todo in that list
      const focusListId = currentBoard.defaultFocusList;
      const filteredTodos = todos.filter((t) => t.list === focusListId);
      const sortedTodos = sortItemsByOrder(filteredTodos);

      setCurrentTodos(sortedTodos);
    }
  }, [currentBoard.defaultFocusList, todos]);

  const handleUpdateBoard = (attribute) => {
    dispatch(attemptUpdateBoard({ id: currentBoard.id, ...attribute }));
  };

  const handleToggleClick = () => {
    handleUpdateBoard({ sidebarOpen: !isSidebarOpen });
  };

  return (
    <SidebarWrapper
      isSidebarOpen={isSidebarOpen}
      onClick={() => !isSidebarOpen && handleToggleClick()}
    >
      <CollapseButton onClick={() => isSidebarOpen && handleToggleClick()}>
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </CollapseButton>
      <SidebarContent>
        {currentTodos && (
          <Pomodoro
            currentBoard={currentBoard}
            firstTodo={currentTodos[0]}
            workLength={25}
            breakLength={5}
          />
        )}
      </SidebarContent>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  background-color: #e0e0e0;
  padding: ${({ theme }) => theme.sizes.spacing};
  width: ${({ theme, isSidebarOpen }) =>
    isSidebarOpen ? theme.sizes.sidebarWidthLarge : theme.sizes.sidebarWidthSmall};
  position: relative;
  transition: 1s ease;
  height: 100%;

  /* "hack" for getting drag and drop scroll to work horizontally AND vertically */
  position: fixed;
  left: 0;
  z-index: 1;
`;

const SidebarContent = styled.div`
  /* display: grid;
  grid-auto-rows: max-content;
  overflow: hidden; */

  svg {
    color: ${({ theme }) => theme.colors.medium('onSecondary')};
  }
`;

const CollapseButton = styled.button`
  position: absolute;
  left: 100%;
  top: 2rem;
  transform: translateX(-50%);
  border-radius: 50%;
  height: 20px;
  width: 20px;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadows.one};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.two};
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  currentBoard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultFocusList: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
