import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as R from 'ramda';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Logout from '_assets/icons/log-out.svg';
import Logo from '_assets/icons/logo.svg';
import Moon from '_assets/icons/Moon.svg';
import Sun from '_assets/icons/Sun.svg';
import { attemptLogout } from '_thunks/auth';
import { attemptUpdateBoard } from '_thunks/boards';
import UpdateTextButton from '_molecules/UpdateTextButton';
import Settings from '_organisms/Settings';
import CategorySelect from '_molecules/CategorySelect';

function Navigation({ pathname }) {
  const dispatch = useDispatch();
  const [currentBoard, setCurrentBoard] = useState(null);

  const { boards } = useSelector(R.pick(['boards']));

  const boardId = pathname.split('/')[2];

  useEffect(() => {
    if (boards.length !== 0 && boardId) {
      const board = boards.find((b) => b.id === boardId);

      setCurrentBoard(board);
    }
  }, [boardId, boards]);

  const logout = () => {
    dispatch(attemptLogout()).catch(R.identity);
  };

  const isHome = pathname === '/';

  const handleUpdateBoard = (attribute) => {
    dispatch(attemptUpdateBoard({ id: boardId, ...attribute }));
  };

  return (
    <StyledNavigation role="navigation" isHome={isHome}>
      <Left to="/">
        <Logo />
        Kanban 2.0
      </Left>

      <Right>
        {currentBoard && !isHome && (
          <>
            <UpdateTextButton
              text={currentBoard.title}
              handleUpdate={(newText) => handleUpdateBoard({ title: newText })}
            />

            <CategorySelect
              currentCategoryId={currentBoard.category}
              onChange={(newCategoryId) => handleUpdateBoard({ category: newCategoryId })}
            />

            <Settings board={currentBoard} />

            {currentBoard.theme === 'light' ? (
              <Moon onClick={() => handleUpdateBoard({ theme: 'dark' })} />
            ) : (
              <Sun onClick={() => handleUpdateBoard({ theme: 'light' })} />
            )}
          </>
        )}
        <Logout onClick={logout} />
      </Right>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  height: ${({ theme }) => theme.sizes.navbarHeight};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.sizes.spacing};

  /* "hack" for getting drag and drop scroll to work horizontally AND vertically */
  position: ${({ isHome }) => (isHome ? 'relative' : 'fixed')};
  width: 100%;
  top: 0;
`;

const Left = styled(Link)`
  font-family: 'Pacifico', cursive;
  font-size: 22px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.onPrimary};
  white-space: nowrap;

  svg {
    margin-right: 5px;

    #triangle {
      fill: ${({ theme }) => theme.colors.onPrimary};
    }

    #cards {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;

  & > *:not(:last-child):not(.cheeseburger-menu) {
    margin-right: 10px;
  }

  svg {
    cursor: pointer;
  }
`;

Navigation.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Navigation;
